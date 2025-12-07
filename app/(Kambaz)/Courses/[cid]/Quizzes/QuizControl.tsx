"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useSelector } from "react-redux";
import { Button, FormControl, Dropdown } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { useParams, useRouter } from "next/navigation";
import * as client from "./client";
import { useDispatch } from "react-redux";
import { addQuiz } from "./reducer";

type SortOption = "name" | "dueDate" | "availableDate";

export default function QuizControl({ 
  sortBy, 
  setSortBy 
}: { 
  sortBy: SortOption; 
  setSortBy: (sort: SortOption) => void;
}) {
  const {cid} = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  if (!currentUser){
    return <div>Loading...</div>
  }

  const isFaculty = currentUser.role === "FACULTY";

  const handleAddQuiz = async () => {
    const defaultQuiz = {
      title: "New Quiz",
      instructions: "",
      published: false,
      type: "Graded Quiz",
      points: 0,
      assignmentGroup: "Quizzes",
      shuffleAnswers: true,
      timeLimit: 20,
      multipleAttempts: false,
      maxAttempts: 1,
      showCorrectAnswers: true,
      accessCode: "",
      oneQuestionAtATime: true,
      webcamRequired: false,
      lockQuestionsAfterAnswering: false,
      due: "",
      availableFrom: "",
      availableUntil: "",
      questions: [],
    };

    try {
      const newQuiz = await client.createQuizForCourse(cid as string, defaultQuiz);
      dispatch(addQuiz(newQuiz));
      router.push(`/Courses/${cid}/Quizzes/${newQuiz._id}`);
    } catch (error) {
      console.error("Failed to create quiz:", error);
    }
  };

  return (
    <div className="d-flex flex-wrap align-items-center mb-3">
      <div className="d-flex align-items-center flex-shrink-0 border" style={{ width: 360 }}>
        <CiSearch className="fs-4 me-2 ms-2" />
        <FormControl className="border-0" size="lg" placeholder="Search for Quiz" />
      </div>
      <div className="ms-auto"></div>
      {isFaculty && (
      <div className="d-flex flex-shrink-0 align-items-center">
        <Dropdown className="me-2">
          <Dropdown.Toggle variant="secondary" size="lg">
            Sort: {sortBy === "name" ? "Name" : sortBy === "dueDate" ? "Due Date" : "Available Date"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setSortBy("name")} active={sortBy === "name"}>
              Name
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSortBy("dueDate")} active={sortBy === "dueDate"}>
              Due Date
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSortBy("availableDate")} active={sortBy === "availableDate"}>
              Available Date
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Button className="me-2" variant="danger" size="lg" onClick={handleAddQuiz} id="wd-add-quiz-btn">
          <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
          Quiz
        </Button>
      </div>
    )}
    </div>
  );
}

