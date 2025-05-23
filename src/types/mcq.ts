export interface MCQOption {
  option_id: number;
  option_text: string;
}

export interface MCQRaw {
  question_id: number;
  question_text: string;
  marks: number;
  option_id: number;
  option_text: string;
}

export interface MCQGrouped {
  question_id: number;
  question_text: string;
  marks: number;
  options: MCQOption[];
}

export interface QuizState {
  selectedAnswers: { [key: number]: number };
  markedForReview: number[];
  currentQuestionIndex: number;
}