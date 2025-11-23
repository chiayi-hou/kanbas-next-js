"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Form, Row, Col, Button } from "react-bootstrap";

export default function QuestionEditorText({
  question,
  onChange,
}: {
  question: any;
  onChange: (q: any) => void;
}) {
  const answers: string[] = question.answers || [];

  const setAnswers = (newAnswers: string[]) => {
    onChange({ ...question, answers: newAnswers });
  };

  return (
    <div className="mt-3">
      <Form.Label>Accepted Answers</Form.Label>
      {answers.map((ans, idx) => (
        <Row key={idx} className="mb-1">
          <Col md={11}>
            <Form.Control
              type="text"
              value={ans}
              onChange={(e) => {
                const newAnswers = [...answers];
                newAnswers[idx] = e.target.value;
                setAnswers(newAnswers);
              }}
            />
          </Col>
          <Col md={1} className="d-flex align-items-center">
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => {
                const newAnswers = answers.filter(
                  (_: any, i: number) => i !== idx
                );
                setAnswers(newAnswers);
              }}
            >
              x
            </Button>
          </Col>
        </Row>
      ))}
      <Button
        variant="outline-secondary"
        size="sm"
        onClick={() => setAnswers([...answers, ""])}
      >
        + Add Answer
      </Button>
    </div>
  );
}
