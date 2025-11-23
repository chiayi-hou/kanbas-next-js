"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Form } from "react-bootstrap";

export default function QuestionEditorTrueFalse({
  question,
  onChange,
}: {
  question: any;
  onChange: (q: any) => void;
}) {
  const answers: any[] = question.answers || [];
  const correct = answers[0];

  const setAnswers = (newAnswers: any[]) => {
    onChange({ ...question, answers: newAnswers });
  };

  return (
    <div className="mt-3">
      <Form.Label>Correct Answer</Form.Label>
      <div>
        <Form.Check
          inline
          type="radio"
          id={`${question._id}-true`}
          label="True"
          checked={correct === true}
          onChange={() => setAnswers([true])}
        />
        <Form.Check
          inline
          type="radio"
          id={`${question._id}-false`}
          label="False"
          checked={correct === false}
          onChange={() => setAnswers([false])}
        />
      </div>
    </div>
  );
}
