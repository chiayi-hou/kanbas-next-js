"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import * as client from "../../client";
import { updateQuiz as updateQuizAction } from "../../reducer";
import { Button, ButtonGroup, ToggleButton } from "react-bootstrap";
import QuizDetailsEditor from "./QuizDetailsEditor";
import QuizQuestionsEditor from "./QuizQuestionsEditor";

export default function QuizEditor() {
  const { qid } = useParams();
  const dispatch = useDispatch();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"details" | "questions">(
    "details"
  );
  const [quiz, setQuiz] = useState<any | null>(null);
  const [originalQuiz, setOriginalQuiz] = useState<any | null>(null);

  // 先從 Redux 找 quiz，沒有就打 API 拿
  useEffect(() => {
    const loadQuiz = async () => {
      if (!qid) return;
      let found = quizzes.find((q: any) => q._id === qid);
      if (!found) {
        found = await client.findQuizWithID(qid as string);
      }
      setQuiz(found);
      setOriginalQuiz(found);
      setLoading(false);
    };
    loadQuiz();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qid]);

  if (loading || !quiz) {
    return <div>Loading quiz...</div>;
  }

  // 總分 = 所有 questions.points 加總
  const totalPoints =
    quiz.questions?.reduce(
      (sum: number, q: any) => sum + (q.points || 0),
      0
    ) ?? 0;

  // 子元件變更 quiz 時呼叫
  const handleQuizChange = (updated: any) => {
    setQuiz(updated);
  };

  // 存檔（不做導航）
  const saveQuiz = async (override: Partial<any> = {}) => {
    try {
      const updated = { ...quiz, ...override };
      const saved = await client.updateQuiz(updated);
      dispatch(updateQuizAction(saved));
      setQuiz(saved);
      setOriginalQuiz(saved);
    } catch (e) {
      console.error("Failed to save quiz", e);
      alert("Failed to save quiz.");
    }
  };

  const onSave = () => {
    // Save：更新後留在 Editor
    saveQuiz({});
  };

  const onSaveAndPublish = () => {
    // Save & Publish：設 published = true，同樣留在 Editor
    saveQuiz({ published: true });
  };

  const onCancel = () => {
    // Cancel：還原成載入時（或最後一次保存）的狀態
    if (originalQuiz) {
      setQuiz(originalQuiz);
    }
  };

  return (
    <div className="container-fluid">
      <h2 className="mb-3">Quiz Editor</h2>

      {/* Tabs */}
      <div className="mb-3 border-bottom">
        <ButtonGroup>
          <ToggleButton
            id="tab-details"
            type="radio"
            variant={activeTab === "details" ? "primary" : "outline-primary"}
            checked={activeTab === "details"}
            value="details"
            onClick={() => setActiveTab("details")}
          >
            Details
          </ToggleButton>
          <ToggleButton
            id="tab-questions"
            type="radio"
            variant={activeTab === "questions" ? "primary" : "outline-primary"}
            checked={activeTab === "questions"}
            value="questions"
            onClick={() => setActiveTab("questions")}
          >
            Questions
          </ToggleButton>
        </ButtonGroup>
      </div>

      {activeTab === "details" && (
        <QuizDetailsEditor
          quiz={quiz}
          totalPoints={totalPoints}
          onChange={handleQuizChange}
        />
      )}

      {activeTab === "questions" && (
        <QuizQuestionsEditor quiz={quiz} onChange={handleQuizChange} />
      )}

      {/* 底部按鈕（不再做 push 導航） */}
      <div className="mt-4 d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onSave}>
          Save
        </Button>
        <Button variant="success" onClick={onSaveAndPublish}>
          Save &amp; Publish
        </Button>
      </div>
    </div>
  );
}
