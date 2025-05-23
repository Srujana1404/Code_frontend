import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { MCQGrouped, QuizState } from '../../types/mcq';
import './QuizOverview.css';

interface QuizOverviewProps {
  questions: MCQGrouped[];
  quizState: QuizState;
  onCancel?: () => void;
  autoSubmit?: boolean;
}

const QuizOverview: React.FC<QuizOverviewProps> = ({ 
  questions, 
  quizState, 
  onCancel, 
  autoSubmit = false 
}) => {
  const navigate = useNavigate();
  const [submitTimer, setSubmitTimer] = useState(autoSubmit ? 5 : 0);

  const answeredCount = Object.keys(quizState.selectedAnswers).length;
  const markedCount = quizState.markedForReview.length;
  const unansweredCount = questions.length - answeredCount;

  useEffect(() => {
    if (autoSubmit && submitTimer > 0) {
      const timer = setInterval(() => {
        setSubmitTimer((prev) => prev - 1);
      }, 1000);

      if (submitTimer === 1) {
        handleSubmit();
      }

      return () => clearInterval(timer);
    }
  }, [submitTimer, autoSubmit]);

  const handleSubmit = async () => {
    try {
      await Axios.post('/api/submit', quizState);
      localStorage.removeItem(`mcq-quiz-${questions[0].question_id}`);
      navigate('/');
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  return (
    <div className="quiz-overview">
      <h2>Quiz Overview</h2>
      
      <div className="stats-container">
        <div className="stat-item">
          <div className="stat-value answered">{answeredCount}</div>
          <div className="stat-label">Answered</div>
        </div>
        <div className="stat-item">
          <div className="stat-value marked">{markedCount}</div>
          <div className="stat-label">Marked for Review</div>
        </div>
        <div className="stat-item">
          <div className="stat-value unanswered">{unansweredCount}</div>
          <div className="stat-label">Unanswered</div>
        </div>
      </div>

      <div className="button-container">
        {!autoSubmit && onCancel && (
          <button className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
        )}
        <button 
          className="submit-btn" 
          onClick={handleSubmit}
          disabled={autoSubmit && submitTimer > 0}
        >
          {autoSubmit 
            ? `Submitting in ${submitTimer}s` 
            : 'Submit Quiz'}
        </button>
      </div>
    </div>
  );
};

export default QuizOverview;