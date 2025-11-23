"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useParams } from "next/navigation";
import Link from "next/link";
import { Button, ListGroup } from "react-bootstrap";

interface QuizQuestionsEditorProps {
  quiz: any;
  onChange: (updatedQuiz: any) => void; // 目前用不到，但保留介面
}

export default function QuizQuestionsEditor({
  quiz,
}: QuizQuestionsEditorProps) {
  const { cid, qid } = useParams();
  const questions = quiz.questions || [];

  const totalPoints =
    questions.reduce((sum: number, q: any) => sum + (q.points || 0), 0) ?? 0;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">
          Questions ({questions.length}) • Total points: {totalPoints}
        </h5>

        {/* New Question: 導到 Question Editor (new) */}
        <Link href={`/Courses/${cid}/Quizzes/${qid}/Editor/Questions/new`}>
          <Button variant="outline-primary" size="sm">
            + New Question
          </Button>
        </Link>
      </div>

      {questions.length === 0 && (
        <div className="text-muted">
          No questions yet. Click &quot;New Question&quot; to add one.
        </div>
      )}

      {questions.length > 0 && (
        <ListGroup className="mt-2">
          {questions.map((q: any, index: number) => (
            <ListGroup.Item
              key={q._id}
              className="d-flex justify-content-between align-items-center"
            >
              <div>
                <div>
                  <strong>
                    Question {index + 1}: {q.title || "(Untitled)"}
                  </strong>
                </div>
                <div className="text-muted small">
                  Type: {q.type || "Multiple Choice"} • Points:{" "}
                  {q.points ?? 0}
                </div>
              </div>

              <div>
                {/* Edit: 導到 Question Editor (edit) */}
                <Link
                  href={`/Courses/${cid}/Quizzes/${qid}/Editor/Questions/${q._id}`}
                  className="btn btn-outline-secondary btn-sm"
                >
                  Edit
                </Link>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
}
