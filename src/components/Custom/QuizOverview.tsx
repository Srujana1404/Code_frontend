import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CheckCircle, Circle, AlertCircle, Clock, Send } from 'lucide-react';
import { QuizOverviewProps } from '../../Types/types';
import './QuizOverview.css';

const QuizOverview: React.FC<QuizOverviewProps> = ({
  questions,
  quizState,
  onCancel,
  autoSubmit,
}) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [submitTimer, setSubmitTimer] = useState(autoSubmit ? 10 : 0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitComplete, setSubmitComplete] = useState(false);

  const { selectedAnswers, markedForReview } = quizState;
  const answeredCount = Object.keys(selectedAnswers).length;
  const unansweredCount = questions.length - answeredCount;
  const markedCount = markedForReview.length;
  const submittedRef = React.useRef(false);

  useEffect(() => {
    if (autoSubmit && submitTimer > 0) {
      const timer = setInterval(() => {
        setSubmitTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [submitTimer, autoSubmit]);

  // const handleSubmit = async () => {
  //   if (isSubmitting) return;

  //   setIsSubmitting(true);

  //   try {
  //     // Submit to backend
  //     const response = await Axios.post('/api/submit', quizState);

  //     if (response.data) {
  //       // Clear local storage
  //       localStorage.removeItem(`mcq-quiz-${id}`);
  //       setSubmitComplete(true);

  //       // Navigate to contest over page after a brief delay
  //       setTimeout(() => {
  //         navigate('/');
  //       }, 3000);
  //     } else {
  //       throw new Error('Submission failed');
  //     }
  //   } catch (error) {
  //     console.error('Error submitting quiz:', error);
  //     setIsSubmitting(false);
  //     // Show error message to user
  //     alert('Failed to submit quiz. Please try again.');
  //   }
  // };

  const handleSubmit = async () => {
    if (submittedRef.current || isSubmitting) return;

    submittedRef.current = true;
    setIsSubmitting(true);

    try {
      const response = await Axios.post('/api/submit', quizState);

      if (response.data) {
        localStorage.removeItem(`mcq-quiz-${id}`);
        setSubmitComplete(true);
        setTimeout(() => navigate('/'), 3000);
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
      setIsSubmitting(false);
      submittedRef.current = false; // Allow retry
      alert('Failed to submit quiz. Please try again.');
    }
  };


  if (submitComplete) {
    return (
      <div className="quiz-overview">
        <div className="overview-container">
          <div className="submission-success">
            <div className="success-icon">
              <CheckCircle size={64} />
            </div>
            <h1 className="success-title">Quiz Submitted Successfully!</h1>
            <p className="success-message">
              Your answers have been recorded. Redirecting you to the Home page...
            </p>
            <div className="success-stats">
              <div className="success-stat">
                <span className="stat-number">{answeredCount}</span>
                <span className="stat-label">Questions Answered</span>
              </div>
              <div className="success-stat">
                <span className="stat-number">{questions.length}</span>
                <span className="stat-label">Total Questions</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-overview">
      <div className="overview-container">
        <h1 className="overview-title">
          {autoSubmit ? 'Time Expired - Quiz Overview' : 'Quiz Overview'}
        </h1>

        {autoSubmit && (
          <div className="timeout-warning">
            <Clock className="timeout-icon" />
            <div className="timeout-content">
              <h3>Time has expired!</h3>
              <p>Your quiz will be automatically submitted in {submitTimer} seconds.</p>
            </div>
          </div>
        )}

        <div className="overview-stats">
          <div className="stat-card answered">
            <CheckCircle className="stat-icon" />
            <div className="stat-content">
              <span className="stat-number">{answeredCount}</span>
              <span className="stat-label">Answered</span>
            </div>
          </div>

          <div className="stat-card unanswered">
            <Circle className="stat-icon" />
            <div className="stat-content">
              <span className="stat-number">{unansweredCount}</span>
              <span className="stat-label">Unanswered</span>
            </div>
          </div>

          <div className="stat-card marked">
            <AlertCircle className="stat-icon" />
            <div className="stat-content">
              <span className="stat-number">{markedCount}</span>
              <span className="stat-label">Marked for Review</span>
            </div>
          </div>
        </div>

        {unansweredCount > 0 && !autoSubmit && (
          <div className="warning-notice">
            <AlertCircle className="warning-icon" />
            <div className="warning-content">
              <h3>Incomplete Quiz</h3>
              <p>
                You have {unansweredCount} unanswered question{unansweredCount !== 1 ? 's' : ''}.
                Are you sure you want to submit?
              </p>
            </div>
          </div>
        )}

        <div className="question-summary">
          <h3 className="summary-title">Question Summary</h3>
          <div className="question-grid">
            {questions.map((question, index) => {
              const isAnswered = selectedAnswers[question.question_id] !== undefined;
              const isMarked = markedForReview.includes(question.question_id);

              let statusClass = 'unanswered';
              if (isAnswered && isMarked) statusClass = 'answered-marked';
              else if (isAnswered) statusClass = 'answered';
              else if (isMarked) statusClass = 'marked';

              return (
                <div
                  key={question.question_id}
                  className={`question-summary-item ${statusClass}`}
                  title={`Question ${index + 1}: ${statusClass.replace('-', ' ')}`}
                >
                  {index + 1}
                </div>
              );
            })}
          </div>

          <div className="summary-legend">
            <div className="legend-item">
              <div className="legend-color answered"></div>
              <span>Answered</span>
            </div>
            <div className="legend-item">
              <div className="legend-color marked"></div>
              <span>Marked</span>
            </div>
            <div className="legend-item">
              <div className="legend-color answered-marked"></div>
              <span>Answered & Marked</span>
            </div>
            <div className="legend-item">
              <div className="legend-color unanswered"></div>
              <span>Unanswered</span>
            </div>
          </div>
        </div>

        <div className="overview-actions">
          {!autoSubmit && onCancel && (
            <button
              onClick={onCancel}
              className="cancel-btn"
              disabled={isSubmitting}
            >
              Back to Quiz
            </button>
          )}
          <button
            onClick={handleSubmit}
            className="submit-btn"
            disabled={isSubmitting || (autoSubmit && submitTimer > 0)}
          >
            {isSubmitting ? (
              <>
                <div className="submit-spinner"></div>
                Submitting...
              </>
            ) : autoSubmit ? (
              `Auto-submitting in ${submitTimer}s`
            ) : (
              <>
                <Send size={20} />
                Submit Quiz
              </>
            )}
          </button>
        </div>

        {!autoSubmit && (
          <div className="final-reminder">
            <p>
              <strong>Important:</strong> Once you submit, you cannot make any changes to your answers.
              Please review your responses carefully before submitting.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizOverview;