"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { FaCheckCircle, FaCircle } from "react-icons/fa";
import { FaRocket } from "react-icons/fa";
import Link from "next/link";
import QuizContextMenu from "./QuizContextMenu";
import * as client from "./client";
import { useDispatch } from "react-redux";
import { updateQuiz } from "./reducer";
import { ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";

export default function QuizCard({ quiz }: { quiz: any }) {
  const {cid} = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    const fetchScore = async () => {
      if (currentUser?.role === "STUDENT") {
        try {
          const attempt = await client.findLatestAttemptForQuiz(quiz._id);
          if (attempt) {
            setScore(attempt.score);
          }
        } catch (error) {
          // No attempt found or error - score stays null
        }
      }
    };
    fetchScore();
  }, [quiz._id, currentUser]);

  if (!currentUser){
    return <div>Loading...</div>
  }

  const isFaculty = currentUser.role === "FACULTY";

  const calculateAvailability = (quiz: any) => {
    const now = new Date();
    const availableFrom = quiz.availableFrom ? new Date(quiz.availableFrom) : null;
    const availableUntil = quiz.availableUntil ? new Date(quiz.availableUntil) : null;

    if (availableUntil && now > availableUntil) {
      return "Closed";
    }
    if (availableFrom && now < availableFrom) {
      return `Not available until ${formatDate(quiz.availableFrom)}`;
    }
    if (availableFrom && availableUntil && now >= availableFrom && now <= availableUntil) {
      return "Available";
    }
    if (availableFrom && now >= availableFrom && !availableUntil) {
      return "Available";
    }
    return "Available";
  };

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

  const handlePublishToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const updatedQuiz = { ...quiz, published: !quiz.published };
      await client.updateQuiz(updatedQuiz);
      dispatch(updateQuiz(updatedQuiz));
    } catch (error) {
      console.error("Failed to update quiz:", error);
    }
  };

  const availability = calculateAvailability(quiz);
  const numQuestions = quiz.questions?.length || 0;

  return (
    <ListGroupItem action key={quiz._id} id="wd-quiz-list-item" className="wd-lesson p-3 ps-1">
      <div className="d-flex align-items-center justify-content-between">
        <Link href={`/Courses/${cid}/Quizzes/${quiz._id}`}
              className="d-flex align-items-center ms-1 text-decoration-none text-reset flex-grow-1">
          <div>
            <BsGripVertical className="me-2 fs-3"/>
            <FaRocket className="me-2 fs-3 text-success"/>
          </div>
          <div className="ms-2 flex-grow-1">
            <div className="quiz-title"><b>{quiz.title || "Untitled Quiz"}</b></div>
            <div className="quiz-descriptions text-muted small">
              <span>Status: <strong>{availability}</strong></span>
              {quiz.due && (
                <>
                  {" | "}
                  <span>Due: <strong>{formatDate(quiz.due)}</strong></span>
                </>
              )}
              {" | "}
              <span>Points: <strong>{quiz.points || 0} pts</strong></span>
              {" | "}
              <span>Questions: <strong>{numQuestions} Questions</strong></span>
              {currentUser.role === "STUDENT" && score !== null && (
                <>
                  {" | "}
                  <span>Score: <strong>{score} / {quiz.points || 0}</strong></span>
                </>
              )}
            </div>
          </div>
        </Link>
        <div className="d-flex align-items-center">
          {isFaculty && (
            <>
              {quiz.published ? (
                <span className="me-2 position-relative" onClick={handlePublishToggle} style={{ cursor: "pointer" }}>
                  <FaCheckCircle className="text-success fs-5 position-absolute" style={{ top: "2px" }} />
                  <FaCircle className="text-white fs-6" />
                </span>
              ) : (
                <span className="me-2" onClick={handlePublishToggle} style={{ cursor: "pointer" }}>
                  <FaCircle className="text-secondary fs-5" />
                </span>
              )}
              <QuizContextMenu quiz={quiz} />
            </>
          )}
          {!isFaculty && quiz.published && (
            <span className="me-2 position-relative">
              <FaCheckCircle className="text-success fs-5 position-absolute" style={{ top: "2px" }} />
              <FaCircle className="text-white fs-6" />
            </span>
          )}
        </div>
      </div>
    </ListGroupItem>
  );
}

