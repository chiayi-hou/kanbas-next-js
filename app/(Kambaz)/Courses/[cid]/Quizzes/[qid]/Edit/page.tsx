"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Button, Form, FormLabel, FormControl, FormCheck, Row, Col, Nav, Badge, Alert } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import * as client from "../../client";
import { updateQuiz } from "../../reducer";

// Question Preview Component (moved outside to prevent re-renders)
const QuestionPreview = ({ question, onEdit, onDelete }: { question: any; onEdit: () => void; onDelete: () => void }) => (
  <div>
    <div className="d-flex justify-content-between align-items-center mb-2">
      <div>
        <Badge bg="secondary" className="me-2">{question.type}</Badge>
        <strong>{question.title}</strong>
        <span className="ms-2 text-muted">({question.points} pts)</span>
      </div>
      <div>
        <Button variant="outline-secondary" size="sm" className="me-2" onClick={onEdit}>
          Edit
        </Button>
        <Button variant="outline-danger" size="sm" onClick={onDelete}>
          Delete
        </Button>
      </div>
    </div>
    <div dangerouslySetInnerHTML={{ __html: question.question || "" }} />
  </div>
);

// Question Editor Component (moved outside to prevent re-renders)
const QuestionEditor = ({ question, setQuestion, onSave, onCancel }: { question: any; setQuestion: (q: any) => void; onSave: () => void; onCancel: () => void }) => {
  const handleTypeChange = (newType: string) => {
    const updatedQuestion = { ...question, type: newType };

    if (newType === "Multiple Choice") {
      updatedQuestion.choices = question.choices && question.choices.length > 0 ? question.choices : ["", ""];
      updatedQuestion.answers = question.answers && question.answers.length > 0 ? question.answers : [""];
    } else if (newType === "True/False") {
      updatedQuestion.choices = ["True", "False"];
      updatedQuestion.answers = question.answers && question.answers.length > 0 ? [question.answers[0]] : [true];
    } else if (newType === "Fill in the Blank") {
      updatedQuestion.choices = [];
      updatedQuestion.answers = question.answers && question.answers.length > 0 ? question.answers : [""];
    }

    setQuestion(updatedQuestion);
  };

  const addChoice = () => {
    if (question.type === "Multiple Choice") {
      setQuestion({ ...question, choices: [...question.choices, ""] });
    } else if (question.type === "Fill in the Blank") {
      setQuestion({ ...question, answers: [...question.answers, ""] });
    }
  };

  const removeChoice = (index: number) => {
    if (question.type === "Multiple Choice") {
      const newChoices = question.choices.filter((_: any, i: number) => i !== index);
      setQuestion({ ...question, choices: newChoices });
    } else if (question.type === "Fill in the Blank") {
      const newAnswers = question.answers.filter((_: any, i: number) => i !== index);
      setQuestion({ ...question, answers: newAnswers });
    }
  };

  const updateChoice = (index: number, value: string) => {
    if (question.type === "Multiple Choice") {
      const newChoices = [...question.choices];
      newChoices[index] = value;
      setQuestion({ ...question, choices: newChoices });
    } else if (question.type === "Fill in the Blank") {
      const newAnswers = [...question.answers];
      newAnswers[index] = value;
      setQuestion({ ...question, answers: newAnswers });
    }
  };

  const setCorrectAnswer = (index: number) => {
    if (question.type === "Multiple Choice") {
      setQuestion({ ...question, answers: [question.choices[index]] });
    }
  };

  const setTrueFalseAnswer = (value: boolean) => {
    setQuestion({ ...question, answers: [value] });
  };

  return (
    <div>
      <Row className="mb-3">
        <Col md={6}>
          <FormLabel>Question Type</FormLabel>
          <Form.Select
            value={question.type}
            onChange={(e) => handleTypeChange(e.target.value)}
          >
            <option value="Multiple Choice">Multiple Choice</option>
            <option value="True/False">True/False</option>
            <option value="Fill in the Blank">Fill in the Blank</option>
          </Form.Select>
        </Col>
        <Col md={3}>
          <FormLabel>Title</FormLabel>
          <FormControl
            value={question.title}
            onChange={(e) => setQuestion({ ...question, title: e.target.value })}
          />
        </Col>
        <Col md={3}>
          <FormLabel>Points</FormLabel>
          <FormControl
            type="number"
            value={question.points}
            onChange={(e) => setQuestion({ ...question, points: parseInt(e.target.value) || 0 })}
          />
        </Col>
      </Row>

      <div className="mb-3">
        <FormLabel>Question</FormLabel>
        <FormControl
          as="textarea"
          rows={5}
          value={question.question}
          onChange={(e) => setQuestion({ ...question, question: e.target.value })}
          placeholder="Enter your question here"
        />
      </div>

      {question.type === "Multiple Choice" && (
        <div className="mb-3">
          <FormLabel>Answers</FormLabel>
          {question.choices?.map((choice: string, index: number) => (
            <div key={index} className="d-flex align-items-center mb-2">
              <FormCheck
                type="radio"
                name={`correct-answer-${question._id}`}
                checked={question.answers?.[0] === choice}
                onChange={() => setCorrectAnswer(index)}
                className="me-2"
              />
              <FormControl
                value={choice}
                onChange={(e) => updateChoice(index, e.target.value)}
                placeholder="Possible Answer"
              />
              {question.choices.length > 2 && (
                <Button
                  variant="outline-danger"
                  size="sm"
                  className="ms-2"
                  onClick={() => removeChoice(index)}
                >
                  Delete
                </Button>
              )}
            </div>
          ))}
          <Button variant="outline-primary" size="sm" onClick={addChoice}>
            + Add Another Answer
          </Button>
        </div>
      )}

      {question.type === "True/False" && (
        <div className="mb-3">
          <FormLabel>Correct Answer</FormLabel>
          <div>
            <FormCheck
              type="radio"
              name={`true-false-${question._id}`}
              label="True"
              checked={question.answers?.[0] === true || question.answers?.[0] === "True"}
              onChange={() => setTrueFalseAnswer(true)}
            />
            <FormCheck
              type="radio"
              name={`true-false-${question._id}`}
              label="False"
              checked={question.answers?.[0] === false || question.answers?.[0] === "False"}
              onChange={() => setTrueFalseAnswer(false)}
            />
          </div>
        </div>
      )}

      {question.type === "Fill in the Blank" && (
        <div className="mb-3">
          <FormLabel>Possible Correct Answers</FormLabel>
          {question.answers?.map((answer: string, index: number) => (
            <div key={index} className="d-flex align-items-center mb-2">
              <FormControl
                value={answer}
                onChange={(e) => updateChoice(index, e.target.value)}
                placeholder="Possible Answer"
              />
              {question.answers.length > 1 && (
                <Button
                  variant="outline-danger"
                  size="sm"
                  className="ms-2"
                  onClick={() => removeChoice(index)}
                >
                  Delete
                </Button>
              )}
            </div>
          ))}
          <Button variant="outline-primary" size="sm" onClick={addChoice}>
            + Add Another Answer
          </Button>
          <small className="text-muted d-block mt-1">Answers are case insensitive</small>
        </div>
      )}

      <div className="mt-3">
        <Button variant="primary" className="me-2" onClick={onSave}>
          Update Question
        </Button>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("details");
  const [questions, setQuestions] = useState<any[]>([]);
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<any>(null);
  const [saveStatus, setSaveStatus] = useState<{ type: "success" | "error" | null; message: string }>({ type: null, message: "" });
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState<any>({
    title: "",
    instructions: "",
    type: "Graded Quiz",
    points: 0,
    assignmentGroup: "Quizzes",
    shuffleAnswers: true,
    timeLimit: 20,
    multipleAttempts: false,
    maxAttempts: 1,
    showCorrectAnswers: "Immediately",
    accessCode: "",
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    due: "",
    availableFrom: "",
    availableUntil: "",
  });

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const quizData = await client.findQuizWithID(qid as string);
        setQuiz(quizData);

        // Calculate points from questions
        const calculatedPoints = quizData.questions?.reduce((sum: number, q: any) => sum + (q.points || 0), 0) || quizData.points || 0;

        setForm({
          title: quizData.title || "",
          instructions: quizData.instructions || "",
          type: quizData.type || "Graded Quiz",
          points: quizData.points || calculatedPoints,
          assignmentGroup: quizData.assignmentGroup || "Quizzes",
          shuffleAnswers: quizData.shuffleAnswers !== undefined ? quizData.shuffleAnswers : true,
          timeLimit: quizData.timeLimit || 20,
          multipleAttempts: quizData.multipleAttempts || false,
          maxAttempts: quizData.maxAttempts || 1,
          showCorrectAnswers: quizData.showCorrectAnswers === true ? "Immediately" :
                             quizData.showCorrectAnswers === false ? "Never" :
                             quizData.showCorrectAnswers || "Immediately",
          accessCode: quizData.accessCode || "",
          oneQuestionAtATime: quizData.oneQuestionAtATime !== undefined ? quizData.oneQuestionAtATime : true,
          webcamRequired: quizData.webcamRequired || false,
          lockQuestionsAfterAnswering: quizData.lockQuestionsAfterAnswering || false,
          due: quizData.due ? new Date(quizData.due).toISOString().split('T')[0] : "",
          availableFrom: quizData.availableFrom ? new Date(quizData.availableFrom).toISOString().split('T')[0] : "",
          availableUntil: quizData.availableUntil ? new Date(quizData.availableUntil).toISOString().split('T')[0] : "",
        });
        setQuestions(quizData.questions || []);
      } catch (error) {
        console.error("Failed to fetch quiz:", error);
      } finally {
        setLoading(false);
      }
    };
    if (qid) {
      fetchQuiz();
    }
  }, [qid]);

  if (loading || !currentUser) {
    return <div>Loading...</div>;
  }

  if (!quiz) {
    return <div>Quiz not found</div>;
  }

  const isFaculty = currentUser.role === "FACULTY";
  if (!isFaculty) {
    return <div>Access denied</div>;
  }

  // Calculate points from questions
  const calculatedPoints = questions.reduce((sum: number, q: any) => sum + (q.points || 0), 0);

  // Question management functions
  const handleNewQuestion = () => {
    const newQuestion = {
      _id: uuidv4(),
      title: "New Question",
      points: 1,
      question: "",
      type: "Multiple Choice",
      choices: ["", ""],
      answers: [""],
    };
    setQuestions([...questions, newQuestion]);
    setEditingQuestionId(newQuestion._id);
    setEditingQuestion({ ...newQuestion });
  };

  const handleEditQuestion = (questionId: string) => {
    const question = questions.find((q: any) => q._id === questionId);
    if (question) {
      setEditingQuestionId(questionId);
      setEditingQuestion({ ...question });
    }
  };

  const handleCancelEditQuestion = () => {
    setEditingQuestionId(null);
    setEditingQuestion(null);
  };

  const handleSaveQuestion = () => {
    if (!editingQuestion) return;
    const updatedQuestions = questions.map((q: any) =>
      q._id === editingQuestionId ? editingQuestion : q
    );
    setQuestions(updatedQuestions);
    setEditingQuestionId(null);
    setEditingQuestion(null);
  };

  const handleDeleteQuestion = (questionId: string) => {
    if (window.confirm("Delete this question?")) {
      setQuestions(questions.filter((q: any) => q._id !== questionId));
      if (editingQuestionId === questionId) {
        setEditingQuestionId(null);
        setEditingQuestion(null);
      }
    }
  };

  const handleSaveQuestions = async () => {
    setSaving(true);
    setSaveStatus({ type: null, message: "" });
    try {
      const updatedQuiz = {
        ...quiz,
        questions: questions,
        points: calculatedPoints,
      };
      await client.updateQuiz(updatedQuiz);
      dispatch(updateQuiz(updatedQuiz));
      setQuiz(updatedQuiz);
      setSaveStatus({ type: "success", message: "Questions saved successfully!" });
      setTimeout(() => {
        setSaveStatus({ type: null, message: "" });
      }, 3000);
    } catch (error) {
      console.error("Failed to save questions:", error);
      setSaveStatus({ type: "error", message: "Failed to save questions. Please try again." });
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveStatus({ type: null, message: "" });
    try {
      const updatedQuiz = {
        ...quiz,
        ...form,
        _id: quiz._id, // Preserve quiz ID
        questions: questions, // Include questions
        points: form.points || calculatedPoints,
        showCorrectAnswers: form.showCorrectAnswers === "Immediately" ? true :
                           form.showCorrectAnswers === "Never" ? false :
                           form.showCorrectAnswers,
        // Convert date strings to ISO format if they exist
        due: form.due || quiz.due,
        availableFrom: form.availableFrom || quiz.availableFrom,
        availableUntil: form.availableUntil || quiz.availableUntil,
      };
      await client.updateQuiz(updatedQuiz);
      dispatch(updateQuiz(updatedQuiz));
      setSaveStatus({ type: "success", message: "Quiz saved successfully!" });
      setTimeout(() => {
        router.push(`/Courses/${cid}/Quizzes/${qid}`);
      }, 1000);
    } catch (error) {
      console.error("Failed to save quiz:", error);
      setSaveStatus({ type: "error", message: "Failed to save quiz. Please try again." });
      setSaving(false);
    }
  };

  const handleSaveAndPublish = async () => {
    setSaving(true);
    setSaveStatus({ type: null, message: "" });
    try {
      const updatedQuiz = {
        ...quiz,
        ...form,
        _id: quiz._id, // Preserve quiz ID
        questions: questions, // Include questions
        published: true,
        points: form.points || calculatedPoints,
        showCorrectAnswers: form.showCorrectAnswers === "Immediately" ? true :
                           form.showCorrectAnswers === "Never" ? false :
                           form.showCorrectAnswers,
        // Convert date strings to ISO format if they exist
        due: form.due || quiz.due,
        availableFrom: form.availableFrom || quiz.availableFrom,
        availableUntil: form.availableUntil || quiz.availableUntil,
      };
      await client.updateQuiz(updatedQuiz);
      dispatch(updateQuiz(updatedQuiz));
      setSaveStatus({ type: "success", message: "Quiz saved and published successfully!" });
      setTimeout(() => {
        router.push(`/Courses/${cid}/Quizzes`);
      }, 1000);
    } catch (error) {
      console.error("Failed to save and publish quiz:", error);
      setSaveStatus({ type: "error", message: "Failed to save and publish quiz. Please try again." });
      setSaving(false);
    }
  };

  const handleCancel = () => {
    router.push(`/Courses/${cid}/Quizzes`);
  };

  return (
    <div id="wd-quiz-editor" className="ms-5 me-5">
      {/* Save Status Alert */}
      {saveStatus.type && (
        <Alert variant={saveStatus.type === "success" ? "success" : "danger"} className="mb-3" dismissible onClose={() => setSaveStatus({ type: null, message: "" })}>
          {saveStatus.message}
        </Alert>
      )}

      {/* Tabs */}
      <Nav variant="tabs" className="mb-4">
        <Nav.Item>
          <Nav.Link
            active={activeTab === "details"}
            onClick={() => setActiveTab("details")}
          >
            Details
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            active={activeTab === "questions"}
            onClick={() => setActiveTab("questions")}
          >
            Questions
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {/* Details Tab Content */}
      {activeTab === "details" && (
        <div>
          <Form>
            {/* Title */}
            <FormLabel htmlFor="wd-quiz-title">Quiz Title</FormLabel>
            <FormControl
              id="wd-quiz-title"
              className="mb-4"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            {/* Description */}
            <FormLabel htmlFor="wd-quiz-description">Description</FormLabel>
            <FormControl
              id="wd-quiz-description"
              as="textarea"
              rows={5}
              className="mb-4"
              value={form.instructions}
              onChange={(e) => setForm({ ...form, instructions: e.target.value })}
            />

            {/* Quiz Type */}
            <Row className="mb-3">
              <Col md={4} className="d-flex justify-content-end align-items-center">
                <FormLabel htmlFor="wd-quiz-type">Quiz Type</FormLabel>
              </Col>
              <Col md={8}>
                <Form.Select
                  id="wd-quiz-type"
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                >
                  <option value="Graded Quiz">Graded Quiz</option>
                  <option value="Practice Quiz">Practice Quiz</option>
                  <option value="Graded Survey">Graded Survey</option>
                  <option value="Ungraded Survey">Ungraded Survey</option>
                </Form.Select>
              </Col>
            </Row>

            {/* Points */}
            <Row className="mb-3">
              <Col md={4} className="d-flex justify-content-end align-items-center">
                <FormLabel htmlFor="wd-quiz-points">Points</FormLabel>
              </Col>
              <Col md={8}>
                <FormControl
                  id="wd-quiz-points"
                  type="number"
                  value={form.points}
                  onChange={(e) => setForm({ ...form, points: parseInt(e.target.value) || calculatedPoints })}
                />
                <small className="text-muted">Calculated: {calculatedPoints} (from questions)</small>
              </Col>
            </Row>

            {/* Assignment Group */}
            <Row className="mb-3">
              <Col md={4} className="d-flex justify-content-end align-items-center">
                <FormLabel htmlFor="wd-assignment-group">Assignment Group</FormLabel>
              </Col>
              <Col md={8}>
                <Form.Select
                  id="wd-assignment-group"
                  value={form.assignmentGroup}
                  onChange={(e) => setForm({ ...form, assignmentGroup: e.target.value })}
                >
                  <option value="Quizzes">Quizzes</option>
                  <option value="Exams">Exams</option>
                  <option value="Assignments">Assignments</option>
                  <option value="Project">Project</option>
                </Form.Select>
              </Col>
            </Row>

            {/* Shuffle Answers */}
            <Row className="mb-3">
              <Col md={4} className="d-flex justify-content-end align-items-center">
                <FormLabel>Shuffle Answers</FormLabel>
              </Col>
              <Col md={8}>
                <FormCheck
                  type="checkbox"
                  id="wd-shuffle-answers"
                  checked={form.shuffleAnswers}
                  onChange={(e) => setForm({ ...form, shuffleAnswers: e.target.checked })}
                  label={form.shuffleAnswers ? "Yes" : "No"}
                />
              </Col>
            </Row>

            {/* Time Limit */}
            <Row className="mb-3">
              <Col md={4} className="d-flex justify-content-end align-items-center">
                <FormLabel htmlFor="wd-time-limit">Time Limit</FormLabel>
              </Col>
              <Col md={8}>
                <FormControl
                  id="wd-time-limit"
                  type="number"
                  value={form.timeLimit}
                  onChange={(e) => setForm({ ...form, timeLimit: parseInt(e.target.value) || 20 })}
                />
                <small className="text-muted">Minutes</small>
              </Col>
            </Row>

            {/* Multiple Attempts */}
            <Row className="mb-3">
              <Col md={4} className="d-flex justify-content-end align-items-center">
                <FormLabel>Multiple Attempts</FormLabel>
              </Col>
              <Col md={8}>
                <FormCheck
                  type="switch"
                  id="wd-multiple-attempts"
                  checked={form.multipleAttempts}
                  onChange={(e) => setForm({ ...form, multipleAttempts: e.target.checked })}
                  label={form.multipleAttempts ? "Yes" : "No"}
                />
              </Col>
            </Row>

            {/* How Many Attempts (shown only if Multiple Attempts is Yes) */}
            {form.multipleAttempts && (
              <Row className="mb-3">
                <Col md={4} className="d-flex justify-content-end align-items-center">
                  <FormLabel htmlFor="wd-max-attempts">How Many Attempts</FormLabel>
                </Col>
                <Col md={8}>
                  <FormControl
                    id="wd-max-attempts"
                    type="number"
                    value={form.maxAttempts}
                    onChange={(e) => setForm({ ...form, maxAttempts: parseInt(e.target.value) || 1 })}
                  />
                </Col>
              </Row>
            )}

            {/* Show Correct Answers */}
            <Row className="mb-3">
              <Col md={4} className="d-flex justify-content-end align-items-center">
                <FormLabel htmlFor="wd-show-correct-answers">Show Correct Answers</FormLabel>
              </Col>
              <Col md={8}>
                <Form.Select
                  id="wd-show-correct-answers"
                  value={form.showCorrectAnswers}
                  onChange={(e) => setForm({ ...form, showCorrectAnswers: e.target.value })}
                >
                  <option value="Immediately">Immediately</option>
                  <option value="After Due Date">After Due Date</option>
                  <option value="Never">Never</option>
                </Form.Select>
              </Col>
            </Row>

            {/* Access Code */}
            <Row className="mb-3">
              <Col md={4} className="d-flex justify-content-end align-items-center">
                <FormLabel htmlFor="wd-access-code">Access Code</FormLabel>
              </Col>
              <Col md={8}>
                <FormControl
                  id="wd-access-code"
                  type="text"
                  value={form.accessCode}
                  onChange={(e) => setForm({ ...form, accessCode: e.target.value })}
                  placeholder="Leave blank for no access code"
                />
              </Col>
            </Row>

            {/* One Question at a Time */}
            <Row className="mb-3">
              <Col md={4} className="d-flex justify-content-end align-items-center">
                <FormLabel>One Question at a Time</FormLabel>
              </Col>
              <Col md={8}>
                <FormCheck
                  type="checkbox"
                  id="wd-one-question-at-a-time"
                  checked={form.oneQuestionAtATime}
                  onChange={(e) => setForm({ ...form, oneQuestionAtATime: e.target.checked })}
                  label={form.oneQuestionAtATime ? "Yes" : "No"}
                />
              </Col>
            </Row>

            {/* Webcam Required */}
            <Row className="mb-3">
              <Col md={4} className="d-flex justify-content-end align-items-center">
                <FormLabel>Webcam Required</FormLabel>
              </Col>
              <Col md={8}>
                <FormCheck
                  type="switch"
                  id="wd-webcam-required"
                  checked={form.webcamRequired}
                  onChange={(e) => setForm({ ...form, webcamRequired: e.target.checked })}
                  label={form.webcamRequired ? "Yes" : "No"}
                />
              </Col>
            </Row>

            {/* Lock Questions After Answering */}
            <Row className="mb-3">
              <Col md={4} className="d-flex justify-content-end align-items-center">
                <FormLabel>Lock Questions After Answering</FormLabel>
              </Col>
              <Col md={8}>
                <FormCheck
                  type="switch"
                  id="wd-lock-questions"
                  checked={form.lockQuestionsAfterAnswering}
                  onChange={(e) => setForm({ ...form, lockQuestionsAfterAnswering: e.target.checked })}
                  label={form.lockQuestionsAfterAnswering ? "Yes" : "No"}
                />
              </Col>
            </Row>

            {/* Due Date */}
            <Row className="mb-3">
              <Col md={4} className="d-flex justify-content-end align-items-center">
                <FormLabel htmlFor="wd-due-date">Due Date</FormLabel>
              </Col>
              <Col md={8}>
                <FormControl
                  id="wd-due-date"
                  type="date"
                  value={form.due}
                  onChange={(e) => setForm({ ...form, due: e.target.value })}
                />
              </Col>
            </Row>

            {/* Available From */}
            <Row className="mb-3">
              <Col md={4} className="d-flex justify-content-end align-items-center">
                <FormLabel htmlFor="wd-available-from">Available From</FormLabel>
              </Col>
              <Col md={8}>
                <FormControl
                  id="wd-available-from"
                  type="date"
                  value={form.availableFrom}
                  onChange={(e) => setForm({ ...form, availableFrom: e.target.value })}
                />
              </Col>
            </Row>

            {/* Available Until */}
            <Row className="mb-3">
              <Col md={4} className="d-flex justify-content-end align-items-center">
                <FormLabel htmlFor="wd-available-until">Available Until</FormLabel>
              </Col>
              <Col md={8}>
                <FormControl
                  id="wd-available-until"
                  type="date"
                  value={form.availableUntil}
                  onChange={(e) => setForm({ ...form, availableUntil: e.target.value })}
                />
              </Col>
            </Row>
          </Form>

          {/* Action Buttons */}
          <div className="mt-4">
            <Button
              variant="success"
              className="btn btn-success float-end ms-2"
              onClick={handleSaveAndPublish}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save & Publish"}
            </Button>
            <Button
              variant="primary"
              className="btn btn-primary float-end"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save"}
            </Button>
            <Button
              variant="secondary"
              className="btn btn-secondary float-end me-2"
              onClick={handleCancel}
              disabled={saving}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Questions Tab Content */}
      {activeTab === "questions" && (
        <div>
          <div className="mb-3">
            <h5>Total Points: {calculatedPoints}</h5>
          </div>

          {/* Questions List */}
          {questions.length === 0 ? (
            <div className="text-center p-5 mb-3">
              <p>No questions yet. Click &quot;New Question&quot; to add your first question.</p>
            </div>
          ) : (
            questions.map((question: any) => (
              <div key={question._id} className="border rounded p-3 mb-3">
                {editingQuestionId === question._id ? (
                  <QuestionEditor
                    question={editingQuestion}
                    setQuestion={setEditingQuestion}
                    onSave={handleSaveQuestion}
                    onCancel={handleCancelEditQuestion}
                  />
                ) : (
                  <QuestionPreview
                    question={question}
                    onEdit={() => handleEditQuestion(question._id)}
                    onDelete={() => handleDeleteQuestion(question._id)}
                  />
                )}
              </div>
            ))
          )}

          {/* New Question Button */}
          <Button variant="outline-primary" onClick={handleNewQuestion} className="mb-3">
            + New Question
          </Button>

          {/* Save Questions Button */}
          {questions.length > 0 && (
            <div className="mt-3">
              <Button
                variant="primary"
                className="btn btn-primary"
                onClick={handleSaveQuestions}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Questions"}
              </Button>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-4">
            <Button
              variant="success"
              className="btn btn-success float-end ms-2"
              onClick={handleSaveAndPublish}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save & Publish"}
            </Button>
            <Button
              variant="primary"
              className="btn btn-primary float-end"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save"}
            </Button>
            <Button
              variant="secondary"
              className="btn btn-secondary float-end me-2"
              onClick={handleCancel}
              disabled={saving}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

