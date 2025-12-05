"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { IoEllipsisVertical } from "react-icons/io5";
import { useParams, useRouter } from "next/navigation";
import * as client from "./client";
import { useDispatch } from "react-redux";
import { deleteQuiz, updateQuiz } from "./reducer";

export default function QuizContextMenu({ quiz }: { quiz: any }) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const {cid} = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  if (!currentUser){
    return <div>Loading...</div>
  }

  const isFaculty = currentUser.role === "FACULTY";

  const handleEdit = () => {
    setShowMenu(false);
    router.push(`/Courses/${cid}/Quizzes/${quiz._id}`);
  };

  const handleDelete = async () => {
    setShowMenu(false);
    const confirmDelete = window.confirm("Delete Quiz?");
    if (confirmDelete) {
      try {
        await client.deleteQuiz(quiz._id);
        dispatch(deleteQuiz(quiz._id));
      } catch (error) {
        console.error("Failed to delete quiz:", error);
      }
    }
  };

  const handlePublish = async () => {
    setShowMenu(false);
    try {
      const updatedQuiz = { ...quiz, published: !quiz.published };
      await client.updateQuiz(updatedQuiz);
      dispatch(updateQuiz(updatedQuiz));
    } catch (error) {
      console.error("Failed to update quiz:", error);
    }
  };

  if (!isFaculty) {
    return null;
  }

  return (
    <div className="position-relative" ref={menuRef}>
      <IoEllipsisVertical
        className="fs-4"
        onClick={() => setShowMenu(!showMenu)}
        style={{ cursor: "pointer" }}
      />
      {showMenu && (
        <div
          className="position-absolute end-0 bg-white border rounded shadow"
          style={{ zIndex: 1000, minWidth: "150px" }}
        >
          <div
            className="p-2 border-bottom"
            style={{ cursor: "pointer" }}
            onClick={handleEdit}
          >
            Edit
          </div>
          <div
            className="p-2 border-bottom"
            style={{ cursor: "pointer" }}
            onClick={handleDelete}
          >
            Delete
          </div>
          <div
            className="p-2 border-bottom"
            style={{ cursor: "pointer" }}
            onClick={handlePublish}
          >
            {quiz.published ? "Unpublish" : "Publish"}
          </div>
          <div className="p-2" style={{ cursor: "pointer", color: "#999" }}>
            Copy
          </div>
          <div className="p-2" style={{ cursor: "pointer", color: "#999" }}>
            Sort
          </div>
        </div>
      )}
    </div>
  );
}

