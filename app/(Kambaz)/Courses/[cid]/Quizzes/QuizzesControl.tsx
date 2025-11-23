"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useSelector, useDispatch } from "react-redux";
import { Button, FormControl, Row, Col } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { useParams, useRouter } from "next/navigation";
import * as client from "./client";
import { addQuiz } from "./reducer";

export default function QuizzesControl() {
  const { cid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  const isFaculty = currentUser.role === "FACULTY";

  const onAddQuiz = async () => {
    if (!cid) return;

    // default quiz 內容，可依老師要求再微調
    const defaultQuiz = {
      title: "New Quiz",
      description: "",
      published: false,
      type: "Graded Quiz",
      points: 0,
      assign_group: "Quizzes",
      shuffle: false,
      time_limit: 20,
      multi_attempt: false,
      num_attempt: 1,
      show_ans: false,
      access_code: "",
      one_question_at_time: true,
      webcam: false,
      lock_after_answer: false,
      due: "",
      available: "",
      until: "",
      questions: [],
    };

    try {
      const created = await client.createQuizForCourse(
        cid as string,
        defaultQuiz
      );
      dispatch(addQuiz(created));
      // 💡 新增完直接進 Editor
      router.push(`/Courses/${cid}/Quizzes/${created._id}/Editor`);
    } catch (e) {
      console.error("Failed to create quiz", e);
      alert("Failed to create quiz.");
    }
  };

  return (
    <Row>
      <Col xs={12}>
        <div className="d-flex flex-wrap align-items-center">
          {/* 搜尋欄 */}
          <div
            className="d-flex align-items-center flex-shrink-0 border"
            style={{ width: 360 }}
          >
            <CiSearch className="fs-4 me-2 ms-2" />
            <FormControl
              className="border-0"
              size="lg"
              placeholder="Search..."
            />
          </div>

          <div className="ms-auto" />

          {/* 只有老師可以新增 Quiz */}
          {isFaculty && (
            <div className="d-flex flex-shrink-0">
              <Button
                className="me-1"
                variant="danger"
                size="lg"
                id="wd-add-quiz-btn"
                onClick={onAddQuiz}
              >
                <FaPlus
                  className="position-relative me-2"
                  style={{ bottom: "1px" }}
                />
                Quiz
              </Button>
            </div>
          )}
        </div>
      </Col>
    </Row>
  );
}
