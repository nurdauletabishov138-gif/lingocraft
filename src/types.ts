export interface LessonQuiz {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  icon: string;
  description: string;
  keyTakeaway: string;
  quickQuiz: LessonQuiz;
}

export interface ClassGrade {
  id: string;
  title: string;
  description: string;
  iconName: "school" | "psychology";
  lessons: Lesson[];
}

export interface VideoLesson {
  id: string;
  title: string;
  duration: string;
  image: string;
  description: string;
  keyPoints: string[];
  quizQuestion: {
    question: string;
    options: string[];
    answerIndex: number;
    explanation: string;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  grade: string;
  rating: number;
  text: string;
  initial: string;
  avatarColor: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface QuizQuestion {
  id: number;
  scenario: string;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
  category: string;
}
