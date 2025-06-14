export interface contestdata {
  id: number;
  name: string;
  description: string;
  start_time: string;
  end_time: string;
  status: string;
}

export interface FormData {
  fullName: string;
  email: string;
  phone: string;
  collegeName: string;
  rollNumber: string;
  department: string;
  qrImage: File | null;
  paymentScreenshot: File | null;
}

export interface QuizOverviewProps {
  questions: MCQGrouped[];
  quizState: QuizState;
  onCancel?: () => void;
  autoSubmit: boolean;
}

export type FormErrors = {
  [K in keyof FormData]?: string;
};