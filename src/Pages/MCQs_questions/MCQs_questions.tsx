import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { MCQGrouped, MCQRaw, QuizState } from '../../types/mcq';
import { groupQuestions } from '../../types/mcqHelpers';
import QuestionCard from '../../components/Custom/QuestionCard';
import QuestionNavigation from '../../components/Custom/QuestionNavigation';
import useLocalStorage from '../../types/useLocalStorage';
import QuizOverview from '../../components/Custom/QuizOverview';
import Timer from '../../components/common/Timer';
import PreviewIcon from '@mui/icons-material/Preview';
import './MCQs_questions.css';
import { Send, StepBack, StepForward } from 'lucide-react';


interface contestdata {
  id: number;
  name: string;
  description: string;
  start_time: string;
  end_time: string;
  status: string;
}

const MCQQuiz: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const storageKey = `mcq-quiz-${id}`;

  const [questions, setQuestions] = useState<MCQGrouped[]>([]);
  const [loading, setLoading] = useState(true);
  const [showOverview, setShowOverview] = useState(false);
  const [timeExpired, setTimeExpired] = useState(false);
  const [contestdata, setContestdata] = useState<contestdata | null>(null);
  const [quizState, setQuizState] = useLocalStorage<QuizState>(storageKey, {
    selectedAnswers: {},
    markedForReview: [],
    currentQuestionIndex: 0,
  });

  const { selectedAnswers, markedForReview, currentQuestionIndex } = quizState;
  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  useEffect(() => {
    setLoading(true);
    Axios
      .get(`/api/MCQdata/${id}`)
      .then((res) => {
        const data = res.data as { mcqdata: MCQRaw[] };
        const raw: MCQRaw[] = data.mcqdata;
        setQuestions(groupQuestions(raw));
        setLoading(false);
      })
      .catch((_err) => {
        setQuestions([]);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    Axios.get(`/api/contests/${id}`)
      .then(response => setContestdata((response.data as { contestdata: contestdata }).contestdata))
      .catch(error => console.error("Error fetching contest:", error));
  }, [id]);

  useEffect(() => {
    if (contestdata && contestdata.status !== "active") {
      navigate('/contest-over'); // Change this path to your actual "Contest Over" route
    }
  }, [contestdata]);

  const handleOptionChange = (questionId: number, optionId: number) => {
    setQuizState({
      ...quizState,
      selectedAnswers: {
        ...selectedAnswers,
        [questionId]: optionId,
      },
    });
  };

  const handleToggleMarkForReview = (questionId: number) => {
    const isMarked = markedForReview.includes(questionId);
    const updatedMarkedForReview = isMarked
      ? markedForReview.filter((id) => id !== questionId)
      : [...markedForReview, questionId];

    setQuizState({
      ...quizState,
      markedForReview: updatedMarkedForReview,
    });
  };

  const goToQuestion = (index: number) => {
    if (index >= 0 && index < questions.length) {
      setQuizState({
        ...quizState,
        currentQuestionIndex: index,
      });
    }
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      goToQuestion(currentQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      goToQuestion(currentQuestionIndex - 1);
    }
  };

  const handleSubmitQuiz = () => {
    setShowOverview(true);

    // localStorage.removeItem(storageKey);
    // navigate('/results');
  };

  const handleTimeComplete = () => {
    setTimeExpired(true);
    setShowOverview(true);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="error-container">
        <h2 className="error-title">No questions found</h2>
        <p className="error-text">There are no questions available for this quiz.</p>
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          Go Home
        </button>
      </div>
    );
  }

  if (showOverview) {
    return (
      <QuizOverview
        questions={questions}
        quizState={quizState}
        onCancel={timeExpired ? undefined : () => setShowOverview(false)}
        autoSubmit={timeExpired}
      />
    );
  }

  // if (loading) {
  //   return (
  //     <div className="mcqquiz-loading">
  //       <div className="mcqquiz-loading-content">
  //         <div className="mcqquiz-loading-circle"></div>
  //         <div className="mcqquiz-loading-bar"></div>
  //         <div className="mcqquiz-loading-bar-small"></div>
  //       </div>
  //     </div>
  //   );
  // }

  // if (questions.length === 0) {
  //   return (
  //     <div className="mcqquiz-empty">
  //       <div className="mcqquiz-empty-content">
  //         <svg
  //           xmlns="http://www.w3.org/2000/svg"
  //           className="mcqquiz-empty-icon"
  //           fill="none"
  //           viewBox="0 0 24 24"
  //           stroke="currentColor"
  //         >
  //           <path
  //             strokeLinecap="round"
  //             strokeLinejoin="round"
  //             strokeWidth={2}
  //             d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  //           />
  //         </svg>
  //         <h2 className="mcqquiz-empty-title">No questions found</h2>
  //         <p className="mcqquiz-empty-desc">
  //           There are no questions available for this quiz.
  //         </p>
  //         <button
  //           onClick={() => navigate('/')}
  //           className="mcqquiz-empty-btn"
  //         >
  //           Go Home
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="mcqquiz-bg">
      <div className="mcqquiz-container">
        {contestdata?.start_time && contestdata?.end_time && (
          <Timer
            startTime={contestdata.start_time}
            endTime={contestdata.end_time}
            status={contestdata.status}
            onTimeComplete={handleTimeComplete}
          />
        )}
        <div className="mcqquiz-header">
          <h1 className="mcqquiz-title">MCQ Quiz</h1>
          <div className="mcqquiz-progress">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="mcqquiz-progress-text">
                <span className="count">
                  {Object.keys(selectedAnswers).length}/{questions.length}
                </span>{' '}
                questions answered
              </span>
            </div>
            <span className="mcqquiz-progress-text">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
          </div>
        </div>

        <div className="mcqquiz-main-grid">
          <div className="mcqquiz-question-card">
            {currentQuestion && (
              <>
                <QuestionCard
                  question={currentQuestion}
                  index={currentQuestionIndex}
                  selectedAnswer={selectedAnswers[currentQuestion.question_id]}
                  isMarkedForReview={markedForReview.includes(currentQuestion.question_id)}
                  onSelectOption={handleOptionChange}
                  onToggleMarkForReview={handleToggleMarkForReview}
                />

                <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between" style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid #f3f4f6", display: "flex", justifyContent: "space-between" }}>
                  <button
                    onClick={goToPreviousQuestion}
                    disabled={currentQuestionIndex === 0}
                    className={`mcqquiz-btn mcqquiz-btn-secondary${currentQuestionIndex === 0 ? ' mcqquiz-btn-disabled' : ''}`}
                  >
                    <StepBack />
                    Previous
                  </button>

                  {isLastQuestion ? (
                    <button
                      onClick={handleSubmitQuiz}
                      className="mcqquiz-btn mcqquiz-btn-primary"
                    >
                      Overview
                      <PreviewIcon />
                    </button>
                  ) : (
                    <button
                      onClick={goToNextQuestion}
                      className="mcqquiz-btn mcqquiz-btn-primary"
                    >
                      Next
                      <StepForward />
                    </button>
                  )}
                </div>
              </>
            )}
          </div>

          <div className="mcqquiz-sidebar">
            <QuestionNavigation
              questions={questions}
              selectedAnswers={selectedAnswers}
              markedForReview={markedForReview}
              currentQuestionIndex={currentQuestionIndex}
              onSelectQuestion={goToQuestion}
            />

            {isLastQuestion && (
              <div className="mcqquiz-submit-box">
                <h3 className="mcqquiz-submit-title">
                  Ready to submit?
                </h3>
                <p className="mcqquiz-submit-desc">
                  You've reached the end of the quiz. Make sure you've answered all questions before submitting.
                </p>
                <button
                  onClick={handleSubmitQuiz}
                  className="mcqquiz-btn mcqquiz-btn-primary"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  Submit Quiz
                  <Send />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MCQQuiz;