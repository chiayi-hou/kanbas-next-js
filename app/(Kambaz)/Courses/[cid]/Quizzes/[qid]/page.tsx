"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Button, Table, Alert } from "react-bootstrap";
import { FaPencil } from "react-icons/fa6";
import * as client from "../client";

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [allAttempts, setAllAttempts] = useState<any[]>([]);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const quizData = await client.findQuizWithID(qid as string);
        setQuiz(quizData);

        // Fetch all attempts for students
        if (currentUser?.role === "STUDENT") {
          try {
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
      fetchQuiz();
    }
  }, [qid, currentUser]);

  if (loading || !currentUser) {
    return <div>Loading...</div>;
  }

  if (!quiz) {
    return <div>Quiz not found</div>;
  }

  const isFaculty = currentUser.role === "FACULTY";

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const formatDateForTable = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  // Calculate total points from questions
  const totalPoints = quiz.questions?.reduce((sum: number, q: any) => sum + (q.points || 0), 0) || quiz.points || 0;

  return (
    <div id="wd-quiz-details" className="ms-5 me-5">
      {/* Header with Preview, Edit, and Publish buttons (Faculty only) */}
      {isFaculty && (
        <div className="d-flex justify-content-center mb-3">
          <Button
            variant="outline-secondary"
            className="me-2"
            onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/Preview`)}
          >
            Preview
          </Button>
          <Button
            variant="outline-secondary"
            className="me-2"
            onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/Edit`)}
          >
            <FaPencil className="me-1" />
            Edit
          </Button>
          <Button
            variant={quiz.published ? "success" : "warning"}
            onClick={async () => {
              const updated = await client.updateQuiz({ ...quiz, published: !quiz.published });
              setQuiz(updated);
            }}
          >
            {quiz.published ? "Unpublish" : "Publish"}
          </Button>
        </div>
      )}

      {/* Quiz Title */}
      <h2 className="mb-4">{quiz.title || "Untitled Quiz"}</h2>

      {/* Student Quiz Actions */}
      {!isFaculty && (
        <div className="mb-4">
          {(() => {
            const attemptsUsed = allAttempts.length;
            const maxAttempts = quiz.multipleAttempts ? (quiz.maxAttempts || 1) : 1;
            const canRetake = quiz.multipleAttempts && attemptsUsed < maxAttempts;
            const hasAttempt = allAttempts.length > 0;

            // Check availability
            const now = new Date();
            const availableFrom = quiz.availableFrom ? new Date(quiz.availableFrom) : null;
            const availableUntil = quiz.availableUntil ? new Date(quiz.availableUntil) : null;
            const isAvailable = (!availableFrom || now >= availableFrom) && (!availableUntil || now <= availableUntil);

            if (!isAvailable) {
              if (availableUntil && now > availableUntil) {
                return (
                  <Alert variant="danger">
                    This quiz is no longer available. The availability period ended on {new Date(quiz.availableUntil).toLocaleString()}.
                    {hasAttempt && (
                      <Button variant="link" onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/Results`)}>
                        View Your Results
                      </Button>
                    )}
                  </Alert>
                );
              }
              if (availableFrom && now < availableFrom) {
                return (
                  <Alert variant="info">
                    This quiz is not yet available. It will be available starting {new Date(quiz.availableFrom).toLocaleString()}.
                  </Alert>
                );
              }
            }

            if (hasAttempt) {
              const attemptsLeft = maxAttempts - attemptsUsed;
              return (
                <>
                  <Button
                    variant="outline-primary"
                    size="lg"
                    className="me-2"
                    onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/Results`)}
                  >
                    View Results
                  </Button>
                  {canRetake && isAvailable && (
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/Take`)}
                    >
                      Retake Quiz {attemptsLeft > 0 && `(${attemptsLeft} attempt${attemptsLeft !== 1 ? 's' : ''} left)`}
                    </Button>
                  )}
                  {!canRetake && (
                    <span className="text-muted">Maximum attempts reached ({attemptsUsed}/{maxAttempts})</span>
                  )}
                </>
              );
            } else {
              return (
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/Take`)}
                  disabled={!isAvailable}
                >
                  {isAvailable ? "Start Quiz" : "Quiz Not Available"}
                </Button>
              );
            }
          })()}
        </div>
      )}

      {/* Quiz Properties Table */}
      <div className="border border-2 border-secondary rounded p-4">
        <Table borderless className="mb-0">
          <tbody>
            <tr>
              <td className="fw-bold" style={{ width: "250px" }}>Quiz Type</td>
              <td>{quiz.type || "Graded Quiz"}</td>
            </tr>
            <tr>
              <td className="fw-bold">Points</td>
              <td>{totalPoints}</td>
            </tr>
            <tr>
              <td className="fw-bold">Assignment Group</td>
              <td>{quiz.assignmentGroup || "Quizzes"}</td>
            </tr>
            <tr>
              <td className="fw-bold">Shuffle Answers</td>
              <td>{quiz.shuffleAnswers ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <td className="fw-bold">Time Limit</td>
              <td>{quiz.timeLimit > 0 ? `${quiz.timeLimit} Minutes` : "No Time Limit"}</td>
            </tr>
            <tr>
              <td className="fw-bold">Multiple Attempts</td>
              <td>{quiz.multipleAttempts ? "Yes" : "No"}</td>
            </tr>
            {quiz.multipleAttempts && (
              <tr>
                <td className="fw-bold">How Many Attempts</td>
                <td>{quiz.maxAttempts || 1}</td>
              </tr>
            )}
            <tr>
              <td className="fw-bold">Show Correct Answers</td>
              <td>
                {quiz.showCorrectAnswers === true
                  ? "Immediately"
                  : quiz.showCorrectAnswers === false
                  ? "Never"
                  : quiz.showCorrectAnswers || "Never"}
              </td>
            </tr>
            <tr>
              <td className="fw-bold">Access Code</td>
              <td>{quiz.accessCode || ""}</td>
            </tr>
            <tr>
              <td className="fw-bold">One Question at a Time</td>
              <td>{quiz.oneQuestionAtATime ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <td className="fw-bold">Webcam Required</td>
              <td>{quiz.webcamRequired ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <td className="fw-bold">Lock Questions After Answering</td>
              <td>{quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</td>
            </tr>
          </tbody>
        </Table>
      </div>

      {/* Scheduling Table */}
      <div className="mt-4">
        <Table bordered>
          <thead>
            <tr>
              <th>Due</th>
              <th>For</th>
              <th>Available from</th>
              <th>Until</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{quiz.due ? formatDateForTable(quiz.due) : ""}</td>
              <td>Everyone</td>
              <td>{quiz.availableFrom ? formatDateForTable(quiz.availableFrom) : ""}</td>
              <td>{quiz.availableUntil ? formatDateForTable(quiz.availableUntil) : ""}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
}

