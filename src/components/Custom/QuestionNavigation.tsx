import React from 'react';
import { MCQGrouped } from '../../types/mcq';
import { getQuestionStatusClass } from '../../types/mcqHelpers';
import './QuestionNavigation.css';

interface QuestionNavigationProps {
  questions: MCQGrouped[];
  selectedAnswers: { [key: number]: number };
  markedForReview: number[];
  currentQuestionIndex: number;
  onSelectQuestion: (index: number) => void;
}

const QuestionNavigation: React.FC<QuestionNavigationProps> = ({
  questions,
  selectedAnswers,
  markedForReview,
  currentQuestionIndex,
  onSelectQuestion,
}) => {
  return (
    <div className="question-navigation">
      <h3>Questions</h3>
      <div className="question-nav-grid">
        {questions.map((_, index) => {
          const questionId = questions[index].question_id;
          const statusClass = getQuestionStatusClass(
            questionId,
            selectedAnswers,
            markedForReview
          );

          return (
            <button
              key={questionId}
              onClick={() => onSelectQuestion(index)}
              className={`question-nav-item${index === currentQuestionIndex ? ' ring' : ''} ${statusClass}`}
              aria-label={`Question ${index + 1}`}
            >
              {index + 1}
            </button>
          );
        })}
      </div> 

      <div className="legend">
        <div className="legend-row">
          <span className="legend-dot not-answered"></span>
          <span>Not answered</span>
        </div>
        <div className="legend-row">
          <span className="legend-dot answered"></span>
          <span>Answered</span>
        </div>
        <div className="legend-row">
          <span className="legend-dot marked"></span>
          <span>Marked for review</span>
        </div>
      </div>
    </div>
  );
};

export default QuestionNavigation;