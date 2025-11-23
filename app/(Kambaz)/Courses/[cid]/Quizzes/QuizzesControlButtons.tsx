"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useSelector, useDispatch } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FaRegCircle } from "react-icons/fa";
import {
  deleteQuiz as deleteQuizAction,
  updateQuiz as updateQuizAction,
} from "./reducer";
import * as client from "./client";

export default function QuizzesControlButtons({
  quizID,
}: {
  quizID: string;
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { cid } = useParams();

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);

  const [menuOpen, setMenuOpen] = useState(false);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  const isFaculty = currentUser.role === "FACULTY";

  const quiz = quizzes.find((q: any) => q._id === quizID);
  if (!quiz) {
    return null;
  }

  // 刪除 quiz
  const onRemoveQuiz = async (id: string) => {
    const confirmDelete = window.confirm("Delete Quiz?");
    if (!confirmDelete) return;

    try {
      await client.deleteQuiz(id);
      dispatch(deleteQuizAction(id));
    } catch (e) {
      console.error("Failed to delete quiz", e);
      alert("Failed to delete quiz.");
    }
  };

  // 切換 published 狀態
  const onTogglePublished = async () => {
    try {
      const updatedQuiz = { ...quiz, published: !quiz.published };
      const saved = await client.updateQuiz(updatedQuiz);
      dispatch(updateQuizAction(saved));
    } catch (e) {
      console.error("Failed to toggle published state", e);
      alert("Failed to update quiz published state.");
    }
  };

  // Edit：導向 Quiz Editor
  const onEdit = () => {
    if (!cid) return;
    router.push(`/Courses/${cid}/Quizzes/${quizID}/Editor`);
  };

  return (
    <div className="position-relative d-flex align-items-center">
      {/* 發布狀態 icon（不可點，只顯示） */}
      {quiz.published ? (
        <GreenCheckmark />
      ) : (
        <FaRegCircle className="text-secondary" />
      )}

      {/* 只有老師有 context menu（3 dots） */}
      {isFaculty && (
        <>
          <IoEllipsisVertical
            className="fs-4 ms-2"
            style={{ cursor: "pointer" }}
            onClick={() => setMenuOpen((open) => !open)}
          />

          {menuOpen && (
            <div
              className="bg-white border rounded shadow-sm p-2"
              style={{
                position: "absolute",
                right: 0,
                top: "100%",
                zIndex: 1000,
                minWidth: "140px",
              }}
            >
              <div
                className="dropdown-item py-1 px-2"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setMenuOpen(false);
                  onEdit();
                }}
              >
                Edit
              </div>
              <div
                className="dropdown-item py-1 px-2"
                style={{ cursor: "pointer" }}
                onClick={async () => {
                  setMenuOpen(false);
                  await onTogglePublished();
                }}
              >
                {quiz.published ? "Unpublish" : "Publish"}
              </div>
              <div
                className="dropdown-item py-1 px-2 text-danger"
                style={{ cursor: "pointer" }}
                onClick={async () => {
                  setMenuOpen(false);
                  await onRemoveQuiz(quizID);
                }}
              >
                Delete
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
