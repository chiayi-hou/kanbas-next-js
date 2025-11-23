"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Form, Row, Col } from "react-bootstrap";

interface QuizDetailsEditorProps {
  quiz: any;
  totalPoints: number;
  onChange: (updatedQuiz: any) => void;
}

export default function QuizDetailsEditor({
  quiz,
  totalPoints,
  onChange,
}: QuizDetailsEditorProps) {
  const updateField = (field: string, value: any) => {
    onChange({ ...quiz, [field]: value });
  };

  const handleDateChange = (
    field: "due" | "available" | "until",
    value: string
  ) => {
    updateField(field, value);
  };

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Quiz Title</Form.Label>
        <Form.Control
          type="text"
          value={quiz.title || ""}
          onChange={(e) => updateField("title", e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={quiz.description || ""}
          onChange={(e) => updateField("description", e.target.value)}
        />
      </Form.Group>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Label>Quiz Type</Form.Label>
          <Form.Select
            value={quiz.type || "Graded Quiz"}
            onChange={(e) => updateField("type", e.target.value)}
          >
            <option>Graded Quiz</option>
            <option>Practice Quiz</option>
            <option>Graded Survey</option>
            <option>Ungraded Survey</option>
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Label>Points</Form.Label>
          <Form.Control type="number" value={totalPoints} readOnly />
          <Form.Text>Sum of all question points (auto-calculated)</Form.Text>
        </Col>
        <Col md={4}>
          <Form.Label>Assignment Group</Form.Label>
          <Form.Select
            value={quiz.assign_group || "Quizzes"}
            onChange={(e) => updateField("assign_group", e.target.value)}
          >
            <option>Quizzes</option>
            <option>Exams</option>
            <option>Assignments</option>
            <option>Project</option>
          </Form.Select>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Label>Shuffle Answers</Form.Label>
          <Form.Select
            value={quiz.shuffle ? "Yes" : "No"}
            onChange={(e) => updateField("shuffle", e.target.value === "Yes")}
          >
            <option>Yes</option>
            <option>No</option>
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Label>Time Limit (minutes)</Form.Label>
          <Form.Control
            type="number"
            min={0}
            value={quiz.time_limit ?? ""}
            onChange={(e) =>
              updateField(
                "time_limit",
                e.target.value === "" ? null : Number(e.target.value)
              )
            }
          />
        </Col>
        <Col md={4}>
          <Form.Label>Multiple Attempts</Form.Label>
          <Form.Select
            value={quiz.multi_attempt ? "Yes" : "No"}
            onChange={(e) =>
              updateField("multi_attempt", e.target.value === "Yes")
            }
          >
            <option>No</option>
            <option>Yes</option>
          </Form.Select>
        </Col>
      </Row>

      {quiz.multi_attempt && (
        <Row className="mb-3">
          <Col md={4}>
            <Form.Label>How Many Attempts</Form.Label>
            <Form.Control
              type="number"
              min={1}
              value={quiz.num_attempt ?? 1}
              onChange={(e) =>
                updateField("num_attempt", Number(e.target.value) || 1)
              }
            />
          </Col>
        </Row>
      )}

      <Row className="mb-3">
        <Col md={4}>
          <Form.Label>Show Correct Answers</Form.Label>
          <Form.Select
            value={quiz.show_ans ? "Yes" : "No"}
            onChange={(e) =>
              updateField("show_ans", e.target.value === "Yes")
            }
          >
            <option>No</option>
            <option>Yes</option>
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Label>Access Code</Form.Label>
          <Form.Control
            type="text"
            value={quiz.access_code || ""}
            onChange={(e) => updateField("access_code", e.target.value)}
          />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Label>One Question at a Time</Form.Label>
          <Form.Select
            value={quiz.one_question_at_time ? "Yes" : "No"}
            onChange={(e) =>
              updateField("one_question_at_time", e.target.value === "Yes")
            }
          >
            <option>Yes</option>
            <option>No</option>
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Label>Webcam Required</Form.Label>
          <Form.Select
            value={quiz.webcam ? "Yes" : "No"}
            onChange={(e) => updateField("webcam", e.target.value === "Yes")}
          >
            <option>No</option>
            <option>Yes</option>
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Label>Lock Questions After Answering</Form.Label>
          <Form.Select
            value={quiz.lock_after_answer ? "Yes" : "No"}
            onChange={(e) =>
              updateField("lock_after_answer", e.target.value === "Yes")
            }
          >
            <option>No</option>
            <option>Yes</option>
          </Form.Select>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Label>Due Date</Form.Label>
          <Form.Control
            type="date"
            value={quiz.due || ""}
            onChange={(e) => handleDateChange("due", e.target.value)}
          />
        </Col>
        <Col md={4}>
          <Form.Label>Available From</Form.Label>
          <Form.Control
            type="date"
            value={quiz.available || ""}
            onChange={(e) => handleDateChange("available", e.target.value)}
          />
        </Col>
        <Col md={4}>
          <Form.Label>Available Until</Form.Label>
          <Form.Control
            type="date"
            value={quiz.until || ""}
            onChange={(e) => handleDateChange("until", e.target.value)}
          />
        </Col>
      </Row>
    </Form>
  );
}
