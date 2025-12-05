"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import { Button, Form, FormLabel, FormControl, FormCheck, Alert } from "react-bootstrap";
import * as client from "../../client";

// Helper function to shuffle array (Fisher-Yates algorithm)
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function TakeQuiz({ isPreview = false }: { isPreview?: boolean }) {
  const { cid, qid } = useParams();
  const router = useRouter();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<{ [key: string]: any }>({});
  const [latestAttempt, setLatestAttempt] = useState<any>(null);
  const [allAttempts, setAllAttempts] = useState<any[]>([]);
  const [startedAt] = useState(new Date().toISOString());
  const [previewScore, setPreviewScore] = useState<{ score: number; total: number; percentage: number } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const quizData = await client.findQuizWithID(qid as string);
        setQuiz(quizData);

        // Check for existing attempts (skip in preview mode)
        if (!isPreview) {
          try {
            const attempt = await client.findLatestAttemptForQuiz(qid as string);
            setLatestAttempt(attempt);

            const attempts = await client.findAllAttemptsForQuiz(qid as string);
            setAllAttempts(attempts || []);
          } catch (error) {
            // No attempt found, that's okay
            setAllAttempts([]);
          }
        }
      } catch (error) {
        console.error("Failed to fetch quiz:", error);
      } finally {
        setLoading(false);
      }
    };
    if (qid && currentUser) {
      fetchData();
    }
  }, [qid, cid, currentUser, router]);

  // Shuffle choices for Multiple Choice questions if shuffleAnswers is enabled
  const questionsToDisplay = useMemo(() => {
    if (!quiz?.questions) return [];
    return quiz.questions.map((q: any) => {
      if (q.type === "Multiple Choice" && quiz.shuffleAnswers && q.choices) {
        return { ...q, choices: shuffleArray(q.choices) };
      }
      return q;
    });
  }, [quiz?.questions, quiz?.shuffleAnswers]);

  if (loading || !currentUser) {
    return <div>Loading...</div>;
  }

  if (!quiz) {
    return <div>Quiz not found</div>;
  }

  if (!isPreview && currentUser.role === "FACULTY") {
    return <div>Faculty cannot take quizzes</div>;
  }

  if (isPreview && currentUser.role !== "FACULTY") {
    return <div>Access denied. Only faculty can preview quizzes.</div>;
  }

  // In preview mode, allow faculty to take the quiz but don't save attempts

  // Check quiz availability (skip in preview mode)
  if (!isPreview) {
    const now = new Date();
    const availableFrom = quiz.availableFrom ? new Date(quiz.availableFrom) : null;
    const availableUntil = quiz.availableUntil ? new Date(quiz.availableUntil) : null;

    if (availableUntil && now > availableUntil) {
      return (
        <div className="ms-5 me-5">
          <Alert variant="danger">
            This quiz is no longer available. The availability period ended on {new Date(quiz.availableUntil).toLocaleString()}.
            <Button variant="link" onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}`)}>
              Back to Quiz Details
            </Button>
          </Alert>
        </div>
      );
    }

    if (availableFrom && now < availableFrom) {
      return (
        <div className="ms-5 me-5">
          <Alert variant="info">
            This quiz is not yet available. It will be available starting {new Date(quiz.availableFrom).toLocaleString()}.
            <Button variant="link" onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}`)}>
              Back to Quiz Details
            </Button>
          </Alert>
        </div>
      );
    }
  }

  // Check attempt limits (skip in preview mode)
  const attemptsUsed = allAttempts.length;
  const maxAttempts = quiz.multipleAttempts ? (quiz.maxAttempts || 1) : 1;
  const attemptNumber = attemptsUsed + 1;

  if (!isPreview && attemptsUsed >= maxAttempts) {
    return (
      <div className="ms-5 me-5">
        <Alert variant="warning">
          You have reached the maximum number of attempts ({maxAttempts}).
          <Button variant="link" onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/Results`)}>
            View your results
          </Button>
        </Alert>
      </div>
    );
  }

  const calculateScore = (): number => {
    let totalScore = 0;
    // Use original quiz questions for scoring (to match correct answers)
    quiz.questions?.forEach((question: any) => {
      const studentAnswer = answers[question._id];
      if (studentAnswer === undefined || studentAnswer === null || studentAnswer === "") return;

      if (question.type === "Multiple Choice") {
        // For shuffled choices, we need to check against original answers
        // answers is an array, check if studentAnswer matches any correct answer
        const correctAnswers = question.answers || [];
        if (correctAnswers.some((correct: any) => String(correct) === String(studentAnswer))) {
          totalScore += question.points || 0;
        }
      } else if (question.type === "True/False") {
        const correctAnswer = question.answers?.[0];
        // Handle both boolean and string representations
        const studentAnswerStr = String(studentAnswer);
        const correctAnswerStr = String(correctAnswer);
        if (studentAnswer === correctAnswer ||
            studentAnswerStr === correctAnswerStr ||
            (studentAnswer === true && (correctAnswer === true || correctAnswer === "True")) ||
            (studentAnswer === false && (correctAnswer === false || correctAnswer === "False"))) {
          totalScore += question.points || 0;
        }
      } else if (question.type === "Fill in the Blank") {
        const studentAnswerLower = String(studentAnswer).toLowerCase().trim();
        const correctAnswers = question.answers?.map((a: string) => String(a).toLowerCase().trim()) || [];
        if (correctAnswers.includes(studentAnswerLower)) {
          totalScore += question.points || 0;
        }
      }
    });
    return totalScore;
  };

  const handleSubmit = async () => {
    // Debug: log answers for preview mode
    if (isPreview) {
      console.log("Preview - Answers:", answers);
      console.log("Preview - Quiz questions:", quiz.questions);
    }

    const score = calculateScore();
    const totalPoints = quiz.questions?.reduce((sum: number, q: any) => sum + (q.points || 0), 0) || quiz.points || 0;
    const percentage = totalPoints > 0 ? Math.round((score / totalPoints) * 100) : 0;

    // Debug: log score calculation for preview
    if (isPreview) {
      console.log("Preview - Calculated score:", score, "out of", totalPoints);
    }

    // In preview mode, show score on page without confirmation
    if (isPreview) {
      setPreviewScore({ score, total: totalPoints, percentage });
      return;
    }

    // For students, show confirmation
    if (!window.confirm("Submit quiz? You cannot change your answers after submitting.")) {
      return;
    }

    // Use original quiz questions for answer mapping
    const answerArray = quiz.questions?.map((q: any) => {
      const answer = answers[q._id];
      // Only set to null if truly undefined/null, preserve falsy values like false and ""
      return {
        questionId: q._id,
        answer: answer !== undefined && answer !== null ? answer : null,
      };
    }) || [];

    try {
      await client.createQuizAttempt(qid as string, {
        course: cid,
        answers: answerArray,
        score,
        attemptNumber,
        startedAt,
      });
      router.push(`/Courses/${cid}/Quizzes/${qid}/Results`);
    } catch (error) {
      console.error("Failed to submit quiz:", error);
      alert("Failed to submit quiz. Please try again.");
    }
  };

  const handleAnswerChange = (questionId: string, answer: any) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  return (
    <div id="wd-take-quiz" className="ms-5 me-5">
      {isPreview && (
        <Alert variant="info" className="mb-4">
          <strong>Preview Mode:</strong> This is how students will see this quiz.
        </Alert>
      )}
      {isPreview && previewScore && (
        <Alert variant="success" className="mb-4">
          <strong>Preview Score:</strong> {previewScore.score} / {previewScore.total} ({previewScore.percentage}%)
          <br />
          <small>Answers are not saved in preview mode.</small>
        </Alert>
      )}
      <h2>{quiz.title}</h2>
      <p className="text-muted mb-4">{quiz.instructions}</p>

      {questionsToDisplay.map((question: any, index: number) => (
        <div key={question._id} className="border rounded p-4 mb-4">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <h5>
              Question {index + 1}: {question.title} ({question.points} pts)
            </h5>
          </div>

          <div className="mb-3">
            <p>{question.question}</p>
          </div>

          {question.type === "Multiple Choice" && (
            <div>
              {question.choices?.map((choice: string, choiceIndex: number) => (
                <FormCheck
                  key={choiceIndex}
                  type="radio"
                  name={`question-${question._id}`}
                  id={`q${question._id}-c${choiceIndex}`}
                  label={choice}
                  checked={answers[question._id] === choice}
                  onChange={() => handleAnswerChange(question._id, choice)}
                />
              ))}
            </div>
          )}

          {question.type === "True/False" && (
            <div>
              <FormCheck
                type="radio"
                name={`question-${question._id}`}
                id={`q${question._id}-true`}
                label="True"
                checked={answers[question._id] === true}
                onChange={() => handleAnswerChange(question._id, true)}
              />
              <FormCheck
                type="radio"
                name={`question-${question._id}`}
                id={`q${question._id}-false`}
                label="False"
                checked={answers[question._id] === false}
                onChange={() => handleAnswerChange(question._id, false)}
              />
            </div>
          )}

          {question.type === "Fill in the Blank" && (
            <div>
              <FormControl
                type="text"
                value={answers[question._id] || ""}
                onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                placeholder="Enter your answer"
              />
            </div>
          )}
        </div>
      ))}

      <div className="mt-4">
        {isPreview ? (
          <>
            <Button variant="primary" size="lg" onClick={handleSubmit}>
              Submit Quiz (Preview)
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="ms-2"
              onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}`)}
            >
              Back to Quiz Details
            </Button>
          </>
        ) : (
          <>
            <Button variant="danger" size="lg" onClick={handleSubmit}>
              Submit Quiz
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="ms-2"
              onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}`)}
            >
              Cancel
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

