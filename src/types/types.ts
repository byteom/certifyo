export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface Exam {
  id: number;
  title: string;
  subject: string;
  duration: number; // in minutes
  questions: Question[];
  passingScore: number;
}

export interface Subject {
  id: number;
  name: string;
  description: string;
  image: string;
  exams: Exam[];
}