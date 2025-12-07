"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { IoEllipsisVertical } from "react-icons/io5";
import { useParams, useRouter } from "next/navigation";
import { Modal, Button, ListGroup } from "react-bootstrap";
import * as client from "./client";
import * as courseClient from "../../client";
import { useDispatch } from "react-redux";
import { deleteQuiz, updateQuiz } from "./reducer";

export default function QuizContextMenu({ quiz }: { quiz: any }) {
  const [showMenu, setShowMenu] = useState(false);
  const [showCopyModal, setShowCopyModal] = useState(false);
  const [courses, setCourses] = useState<any[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [copying, setCopying] = useState(false);
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

  const handleCopyClick = async () => {
    setShowMenu(false);
    setShowCopyModal(true);
    setLoadingCourses(true);
    try {
      const myCourses = await courseClient.findMyCourses();
      setCourses(myCourses);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
      alert("Failed to load courses. Please try again.");
      setShowCopyModal(false);
    } finally {
      setLoadingCourses(false);
    }
  };

  const handleCopyToCourse = async (targetCourseId: string) => {
    setCopying(true);
    try {
      // Create a copy of the quiz with a new title
      const quizCopy = {
        ...quiz,
        _id: undefined, // Remove ID so a new one is generated
        title: `${quiz.title}${targetCourseId === cid ? " (Copy)" : ""}`,
        published: false, // Unpublished by default
      };
      delete quizCopy._id;
      
      await client.createQuizForCourse(targetCourseId, quizCopy);
      setShowCopyModal(false);
      
      if (targetCourseId === cid) {
        // Refresh current page if copied to same course
        window.location.reload();
      } else {
        alert(`Quiz copied to the selected course successfully!`);
      }
    } catch (error) {
      console.error("Failed to copy quiz:", error);
      alert("Failed to copy quiz. Please try again.");
    } finally {
      setCopying(false);
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
          <div
            className="p-2"
            style={{ cursor: "pointer" }}
            onClick={handleCopyClick}
          >
            Copy
          </div>
        </div>
      )}

      {/* Copy to Course Modal */}
      <Modal show={showCopyModal} onHide={() => setShowCopyModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Copy Quiz to Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loadingCourses ? (
            <div className="text-center py-4">Loading courses...</div>
          ) : (
            <>
              <p className="text-muted mb-3">Select a course to copy &quot;{quiz.title}&quot; to:</p>
              <ListGroup>
                {courses.map((course: any) => (
                  <ListGroup.Item
                    key={course._id}
                    action
                    onClick={() => handleCopyToCourse(course._id)}
                    disabled={copying}
                    className={course._id === cid ? "bg-light" : ""}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <strong>{course.name}</strong>
                        <br />
                        <small className="text-muted">{course.number}</small>
                      </div>
                      {course._id === cid && (
                        <span className="badge bg-secondary">Current</span>
                      )}
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              {courses.length === 0 && (
                <div className="text-center text-muted py-3">
                  No courses available
                </div>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCopyModal(false)} disabled={copying}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

