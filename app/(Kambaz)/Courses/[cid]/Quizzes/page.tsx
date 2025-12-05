"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useParams } from "next/navigation";
import { useState } from "react";

import QuizControl from "./QuizControl";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { GoTriangleDown } from "react-icons/go";
import QuizCard from "./QuizCard";
import { useSelector } from "react-redux";

import { setQuizzes } from "./reducer";
import { useEffect } from "react";
import * as client from "./client";
import { useDispatch } from "react-redux";
import { useMemo } from "react";

export default function Quizzes() {
  const {cid} = useParams();
  const quizzes = useSelector((state: any) => state.quizzesReducer?.quizzes || []);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(true);

  // load quizzes and sent to reducer
  const fetchQuizzes = async () => {
    const quizzesData = await client.findQuizzesForCourse(cid as string);
    dispatch(setQuizzes(quizzesData));
  }
  useEffect(() => {
    fetchQuizzes();
  }, [cid]);

  if (!currentUser){
    return <div>Loading...</div>
  }

  // sort quizzes
  const sortedQuizzes = useMemo(
  () =>
    [...quizzes].sort(
      (a, b) =>
        new Date(a.availableFrom).getTime() -
        new Date(b.availableFrom).getTime()
    ),
  [quizzes]
);

  return (
    <div id="wd-quizzes">
      <QuizControl/><br/><br/>
      {quizzes.length === 0 ? (
        <div className="text-center p-5">
          <p>No quizzes available. Click the "Quiz" button to add a new quiz.</p>
        </div>
      ) : (
        <ListGroup className="rounded-0" id="wd-quiz-list">
          <ListGroupItem key="quizzes" id="wd-quizzes-title" className="wd-module p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center justify-content-between"
                 onClick={() => setExpanded(!expanded)} style={{ cursor: "pointer" }}>
              <div>
                <BsGripVertical className="me-2 fs-3"/>
                {expanded ? <GoTriangleDown className="me-1 fs-3"/> : <GoTriangleDown className="me-1 fs-3" style={{ transform: "rotate(-90deg)" }} />}
                Assignment Quizzes
              </div>
            </div>
            {expanded && (
              <ListGroup className="wd-quizzes rounded-0">
                {sortedQuizzes.map((quiz:any)=>(
                  <QuizCard key={quiz._id} quiz={quiz} />
                ))}
              </ListGroup>
            )}
          </ListGroupItem>
        </ListGroup>
      )}
    </div>
  );}

