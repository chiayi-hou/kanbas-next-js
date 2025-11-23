"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Form, Row, Col, Button } from "react-bootstrap";

export default function QuestionEditorMultipleChoice({
  question,
  onChange,
}: {
  question: any;
  onChange: (q: any) => void;
}) {
  const choices: string[] = question.choices || [];
  const answers: any[] = question.answers || [];

  const setChoices = (newChoices: string[]) => {
    onChange({ ...question, choices: newChoices });
  };

  const setAnswers = (newAnswers: any[]) => {
    onChange({ ...question, answers: newAnswers });
  };

  const correctChoice = answers[0];

  return (
    <div className="mt-3">
      <Form.Label>Choices (select one correct answer)</Form.Label>
      {choices.map((choice, idx) => (
        <Row key={idx} className="mb-1">
          <Col md={1} className="d-flex align-items-center">
            <Form.Check
              type="radio"
              name={`correct-${question._id}`}
              checked={correctChoice === choice}
              onChange={() => setAnswers([choice])}
            />
          </Col>
          <Col md={11}>
            <Form.Control
              type="text"
              value={choice}
              onChange={(e) => {
                const newChoices = [...choices];
                newChoices[idx] = e.target.value;
                setChoices(newChoices);
                // 如果這一個是現在的正解，也要同步更新答案
                if (correctChoice === choice) {
                  setAnswers([e.target.value]);
                }
              }}
            />
          </Col>
        </Row>
      ))}
      <Button
        variant="outline-secondary"
        size="sm"
        className="mt-1"
        onClick={() => {
          const newChoices = [
            ...choices,
            `Choice ${choices.length + 1}`,
          ];
          setChoices(newChoices);
        }}
      >
        + Add Choice
      </Button>
    </div>
  );
}
