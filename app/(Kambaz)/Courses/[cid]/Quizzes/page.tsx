"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import QuizzesControl from "./QuizzesControl";
import QuizzesControlButtons from "./QuizzesControlButtons";

import { setQuizzes } from "./reducer";
import * as client from "./client";

import Link from "next/link";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { LuNotebookPen } from "react-icons/lu";
import { FaPlus } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";
import { GoTriangleDown } from "react-icons/go";

export default function Quizzes_Page() {
  const { cid } = useParams();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();

  // load quizzes and send to reducer
  const fetchQuizzes = async () => {
    if (!cid) return;
    const quizzes = await client.findQuizzesForCourse(cid as string);
    dispatch(setQuizzes(quizzes));
  };

  useEffect(() => {
    fetchQuizzes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cid]);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  const isFaculty = currentUser.role === "FACULTY";

  // 簡單處理日期字串（目前後端是 "2016-03-01" 這種）；
  // 如果你想跟 Assignment 一樣顯示 "May 6 at 12:00am"，之後可以再用 date-fns 處理。
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    return dateStr; // 先直接顯示原字串
  };

  return (
    <div id="wd-quizzes">
      <QuizzesControl />
      <br />
      <br />
      {quizzes.length > 0 && (
        <ListGroup className="rounded-0" id="wd-quizzes-list">
          <ListGroupItem
            key="quizzes"
            id="wd-quizzes-title"
            className="wd-module p-0 mb-5 fs-5 border-gray"
          >
            <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center justify-content-between">
              <div>
                <BsGripVertical className="me-2 fs-3" />
                <GoTriangleDown className="me-1 fs-3" />
                QUIZZES
              </div>
              <div>
                {/* 這個 40% of Total 是作業 description 裡常出現的，你如果有真實比例也可以之後改 */}
                <span className="me-2 py-2 px-3 rounded-pill border border-dark">
                  40% of Total
                </span>
                {isFaculty && <FaPlus className="fs-4 me-3" />}
                <IoEllipsisVertical className="fs-4" />
              </div>
            </div>

            <ListGroup className="wd-quizzes rounded-0">
              {quizzes.map((quiz: any) => (
                <ListGroupItem
                  action
                  key={quiz._id}
                  id="wd-quiz-list-item"
                  className="wd-lesson p-3 ps-1"
                >
                  <div className="d-flex align-items-center justify-content-between">
                    {/* 這裡改成連到 Quizzes 而不是 Assignments */}
                    <Link
                      href={`/Courses/${cid}/Quizzes/${quiz._id}`}
                      className="d-flex align-items-center ms-1 text-decoration-none text-reset"
                    >
                      <div>
                        <BsGripVertical className="me-2 fs-3" />
                        <LuNotebookPen className="me-2 fs-3 text-success" />
                      </div>
                      <div className="ms-2">
                        <div className="assignment-title">
                          <b>{quiz.title}</b>
                        </div>
                        <div className="assignment-describtions">
                          {/* 左邊用 published 狀態顯示 */}
                          <span className={quiz.published ? "text-success" : "text-danger"}>
                            {quiz.published ? "Published" : "Not Published"}
                          </span>
                          {" | "}
                          {/* available / due / points 改成用 quiz 的真實欄位 */}
                          {quiz.available && (
                            <>
                              <b>Not available until</b>{" "}
                              {formatDate(quiz.available)}{" "}
                              {" | "}
                            </>
                          )}
                          {quiz.due && (
                            <>
                              <b>Due</b> {formatDate(quiz.due)}{" "}
                              {" | "}
                            </>
                          )}
                          {quiz.points != null && (
                            <>{quiz.points} pts</>
                          )}
                        </div>
                      </div>
                    </Link>

                    {/* 右邊的三個點 / 編輯刪除控制 */}
                    <QuizzesControlButtons quizID={quiz._id} />
                  </div>
                </ListGroupItem>
              ))}
            </ListGroup>
          </ListGroupItem>
        </ListGroup>
      )}
    </div>
  );
}
