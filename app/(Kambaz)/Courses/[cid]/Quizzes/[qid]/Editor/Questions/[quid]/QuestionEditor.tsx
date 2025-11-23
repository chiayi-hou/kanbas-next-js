"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import * as client from "../../../../client";
import { updateQuiz as updateQuizAction } from "../../../../reducer";
import { Button, Form, Row, Col } from "react-bootstrap";
import QuestionEditorMultipleChoice from "./MultipleChoiceEditor";
import QuestionEditorTrueFalse from "./TrueFalseEditor";
import QuestionEditorText from "./TextEditor";

type QuestionType = "Multiple Choice" | "True/False" | "Fill in the Blank";

interface Question {
  _id: string;
  title: string;
  points: number;
  question: string;
  type: QuestionType;
  choices: string[];
  answers: any[];
}

export default function QuestionEditor({ isNew = false }: { isNew?: boolean }) {
  const { cid, qid, questionId } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);

  const [loading, setLoading] = useState(true);
  const [quiz, setQuiz] = useState<any | null>(null);
  const [question, setQuestion] = useState<Question | null>(null);
  const [originalQuestion, setOriginalQuestion] = useState<Question | null>(
    null
  );

  // 載入 quiz & question
  useEffect(() => {
    const load = async () => {
      if (!qid) return;
      let foundQuiz = quizzes.find((q: any) => q._id === qid);
      if (!foundQuiz) {
        foundQuiz = await client.findQuizWithID(qid as string);
      }

      let q: Question;
      if (isNew) {
        // 新題目 → default Multiple Choice
        q = {
          _id: String(Date.now()),
          title: "New Question",
          points: 1,
          question: "",
          type: "Multiple Choice",
          choices: ["Choice 1", "Choice 2"],
          answers: ["Choice 1"],
        };
      } else {
        const existing = foundQuiz.questions?.find(
          (qq: any) => qq._id === questionId
        );
        if (!existing) {
          alert("Question not found.");
          router.push(`/Courses/${cid}/Quizzes/${qid}/Editor`);
          return;
        }
        q = { ...existing };
      }

      setQuiz(foundQuiz);
      setQuestion(q);
      setOriginalQuestion(q);
      setLoading(false);
    };

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qid, questionId, isNew]);

  if (loading || !quiz || !question) {
    return <div>Loading question...</div>;
  }

  const updateQuestionField = (field: keyof Question, value: any) => {
    setQuestion({ ...question, [field]: value });
  };

  // 切換題型時，調整結構
  const handleTypeChange = (type: QuestionType) => {
    let choices = question.choices;
    let answers = question.answers;

    if (type === "Multiple Choice") {
      if (!choices || choices.length === 0) {
        choices = ["Choice 1", "Choice 2"];
      }
      if (!answers || answers.length === 0) {
        answers = [choices[0]];
      }
    } else if (type === "True/False") {
      choices = ["True", "False"];
      if (!answers || answers.length === 0) {
        answers = [true];
      }
    } else if (type === "Fill in the Blank") {
      choices = [];
      if (!answers || answers.length === 0) {
        answers = [""];
      }
    }

    setQuestion({ ...question, type, choices, answers });
  };

  const onCancel = () => {
    if (originalQuestion) {
      setQuestion(originalQuestion);
    }
    router.push(`/Courses/${cid}/Quizzes/${qid}/Editor`);
  };

  const onSave = async () => {
    if (!quiz || !question) return;

    let updatedQuestions;
    if (isNew) {
      updatedQuestions = [...(quiz.questions || []), question];
    } else {
      updatedQuestions = (quiz.questions || []).map((q: any) =>
        q._id === question._id ? question : q
      );
    }

    const updatedQuiz = { ...quiz, questions: updatedQuestions };
    try {
      const saved = await client.updateQuiz(updatedQuiz);
      dispatch(updateQuizAction(saved));
      router.push(`/Courses/${cid}/Quizzes/${qid}/Editor`);
    } catch (e) {
      console.error("Failed to save question", e);
      alert("Failed to save question.");
    }
  };

  // 選擇使用哪個子 editor
  const renderQuestionBody = () => {
    if (question.type === "True/False") {
      return (
        <QuestionEditorTrueFalse
          question={question}
          onChange={setQuestion}
        />
      );
    }
    if (question.type === "Fill in the Blank") {
      return (
        <QuestionEditorText
          question={question}
          onChange={setQuestion}
        />
      );
    }
    // default Multiple Choice
    return (
      <QuestionEditorMultipleChoice
        question={question}
        onChange={setQuestion}
      />
    );
  };

  return (
    <div className="container-fluid">
      <h3 className="mb-3">
        {isNew ? "New Question" : "Edit Question"}
      </h3>

      <Form>
        <Row className="mb-3">
          <Col md={8}>
            <Form.Label>Question Title</Form.Label>
            <Form.Control
              type="text"
              value={question.title}
              onChange={(e) =>
                updateQuestionField("title", e.target.value)
              }
            />
          </Col>
          <Col md={4}>
            <Form.Label>Points</Form.Label>
            <Form.Control
              type="number"
              min={0}
              value={question.points}
              onChange={(e) =>
                updateQuestionField(
                  "points",
                  Number(e.target.value) || 0
                )
              }
            />
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Question Text</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={question.question}
            onChange={(e) =>
              updateQuestionField("question", e.target.value)
            }
          />
        </Form.Group>

        <Row className="mb-3">
          <Col md={4}>
            <Form.Label>Question Type</Form.Label>
            <Form.Select
              value={question.type}
              onChange={(e) =>
                handleTypeChange(e.target.value as QuestionType)
              }
            >
              <option>Multiple Choice</option>
              <option>True/False</option>
              <option>Fill in the Blank</option>
            </Form.Select>
          </Col>
        </Row>

        {/* 這裡是題目內容編輯，各題型共用 */}
        {renderQuestionBody()}
      </Form>

      <div className="mt-4 d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onSave}>
          Save Question
        </Button>
      </div>
    </div>
  );
}
