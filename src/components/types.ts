export interface Question {
  id: string | number;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface Internship {
  id: string;
  title: string;
  company: string;
  description: string;
  duration: string;
  stipend: number;
  location: string;
  requirements: string;
  type: string;
  positions: number;
}

export interface Application {
  id: string;
  internship_id: string;
  status: string;
  applied_at: string;
  completed_at: string | null;
  certificate_url: string | null;
  internships: Internship;
}

export interface Profile {
  full_name: string | null;
  phone: string | null;
}

export interface Exam {
  id: string | number;
  title: string;
  duration: number;
  subject?: string;
  passingScore?: number;
  questions?: Question[];
}

export interface Subject {
  id: string | number;
  name: string;
  description: string;
  image: string;
  exams: Exam[];
}