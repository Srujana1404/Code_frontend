import React from 'react';
import { MCQGrouped } from '../../types/mcq';
import './QuestionCard.css';
import { BookmarkCheck } from 'lucide-react';

interface QuestionCardProps {
  question: MCQGrouped;
  index: number;
  selectedAnswer: number | undefined;
  isMarkedForReview: boolean;
  onSelectOption: (questionId: number, optionId: number) => void;
  onToggleMarkForReview: (questionId: number) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  index,
  selectedAnswer,
  isMarkedForReview,
  onSelectOption,
  onToggleMarkForReview,
}) => {
  return (
    <div className="question-card">
      <div className="question-header">
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span className="question-number">
            {index + 1}
          </span>
          <span className="question-title">{question.question_text}</span>
        </div>
        <div className="question-marks">
          {question.marks} {question.marks > 1 ? 'marks' : 'mark'}
        </div>
      </div>

      <div className="options">
        {question.options.map((option) => (
          <label
            key={option.option_id}
            className={`option-label${selectedAnswer === option.option_id ? ' selected' : ''}`}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="radio"
                name={`question-${question.question_id}`}
                value={option.option_id}
                checked={selectedAnswer === option.option_id}
                onChange={() => onSelectOption(question.question_id, option.option_id)}
                className="option-radio"
              />
              <span className="option-text">{option.option_text}</span>
            </div>
          </label>
        ))}
      </div>

      <div style={{ marginTop: "1.5rem", display: "flex", alignItems: "center" }}>
        <button
          type="button"
          onClick={() => onToggleMarkForReview(question.question_id)}
          className={`mark-review-btn${isMarkedForReview ? ' marked' : ''}`}
        >
          <BookmarkCheck />
          {isMarkedForReview ? 'Marked for review' : 'Mark for review'}
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;