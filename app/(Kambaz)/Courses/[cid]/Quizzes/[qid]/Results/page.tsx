"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Button, Alert } from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import * as client from "../../client";

export default function QuizResults() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [quiz, setQuiz] = useState<any>(null);
  const [attempt, setAttempt] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const quizData = await client.findQuizWithID(qid as string);
        setQuiz(quizData);

        const attemptData = await client.findLatestAttemptForQuiz(qid as string);
        setAttempt(attemptData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };
    if (qid && currentUser) {
      fetchData();
    }
  }, [qid, currentUser]);

  if (loading || !currentUser) {
    return <div>Loading...</div>;
  }

  if (!quiz) {
    return <div>Quiz not found</div>;
  }

  if (currentUser.role === "FACULTY") {
    return <div>Faculty cannot view quiz results</div>;
  }

  if (!attempt) {
    return (
      <div className="ms-5 me-5">
        <Alert variant="info">You haven&apos;t taken this quiz yet.</Alert>
        <Button onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/Take`)}>
          Take Quiz
        </Button>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const isAnswerCorrect = (question: any, studentAnswer: any): boolean => {
    if (question.type === "Multiple Choice") {
      return question.answers?.includes(studentAnswer) || false;
    } else if (question.type === "True/False") {
      const correctAnswer = question.answers?.[0];
      return studentAnswer === correctAnswer ||
        (studentAnswer === true && correctAnswer === "True") ||
        (studentAnswer === false && correctAnswer === "False");
    } else if (question.type === "Fill in the Blank") {
      const studentAnswerLower = String(studentAnswer).toLowerCase().trim();
      const correctAnswers = question.answers?.map((a: string) => String(a).toLowerCase().trim()) || [];
      return correctAnswers.includes(studentAnswerLower);
    }
    return false;
  };

  const getStudentAnswer = (questionId: string) => {
    const answerObj = attempt.answers?.find((a: any) => a.questionId === questionId);
    return answerObj?.answer;
  };

  const totalPoints = quiz.questions?.reduce((sum: number, q: any) => sum + (q.points || 0), 0) || 0;

  return (
    <div id="wd-quiz-results" className="ms-5 me-5">
      <h2>{quiz.title}</h2>

      <div className="border rounded p-3 mb-4 bg-light">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <strong>Score: {attempt.score} / {totalPoints}</strong>
            <br />
            <small className="text-muted">
              Submitted: {formatDate(attempt.submittedAt)}
            </small>
            {attempt.startedAt && (
              <>
                <br />
                <small className="text-muted">
                  Started: {formatDate(attempt.startedAt)}
                </small>
              </>
            )}
            <br />
            <small className="text-muted">
              Attempt: {attempt.attemptNumber}
            </small>
          </div>
          <Button
            variant="outline-primary"
            onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}`)}
          >
            Back to Quiz Details
          </Button>
        </div>
      </div>

      {quiz.questions?.map((question: any, index: number) => {
        const studentAnswer = getStudentAnswer(question._id);
        const isCorrect = isAnswerCorrect(question, studentAnswer);

        return (
          <div
            key={question._id}
            className={`border rounded p-4 mb-4 ${
              isCorrect ? "bg-light border-success" : "bg-light border-danger"
            }`}
          >
            <div className="d-flex justify-content-between align-items-start mb-3">
              <h5>
                Question {index + 1}: {question.title} ({question.points} pts)
              </h5>
              <div>
                {isCorrect ? (
                  <FaCheckCircle className="text-success fs-4" />
                ) : (
                  <FaTimesCircle className="text-danger fs-4" />
                )}
              </div>
            </div>

            <div className="mb-3">
              <p>{question.question}</p>
            </div>

            <div className="mb-2">
              <strong>Your Answer: </strong>
              <span className={isCorrect ? "text-success" : "text-danger"}>
                {studentAnswer === null || studentAnswer === undefined || studentAnswer === ""
                  ? "No answer provided"
                  : studentAnswer === true ? "True" : studentAnswer === false ? "False" : String(studentAnswer)}
              </span>
            </div>

            {question.type === "Multiple Choice" && (
              <div>
                <strong>Correct Answer: </strong>
                <span className="text-success">
                  {question.answers?.join(", ")}
                </span>
              </div>
            )}

            {question.type === "True/False" && (
              <div>
                <strong>Correct Answer: </strong>
                <span className="text-success">
                  {question.answers?.[0] === true || question.answers?.[0] === "True" ? "True" : "False"}
                </span>
              </div>
            )}

            {question.type === "Fill in the Blank" && (
              <div>
                <strong>Correct Answers: </strong>
                <span className="text-success">
                  {question.answers?.join(", ")}
                </span>
              </div>
            )}

            <div className="mt-2">
              <small className="text-muted">
                Points: {isCorrect ? question.points : 0} / {question.points}
              </small>
            </div>
          </div>
        );
      })}

      <div className="mt-4">
        <Button
          variant="outline-primary"
          onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}`)}
        >
          Back to Quiz Details
        </Button>
      </div>
    </div>
  );
}

