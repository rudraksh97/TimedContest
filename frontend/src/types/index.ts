// Clean type definitions without enum issues
export interface Question {
  id: number;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  neetcode_number: number;
  python_template?: string;
  java_template?: string;
  cpp_template?: string;
  javascript_template?: string;
  go_template?: string;
  c_template?: string;
  created_at: string;
}

export interface Contest {
  id: number;
  name: string;
  question1_id: number;
  question2_id: number;
  question3_id: number;
  created_at: string;
  question1?: Question;
  question2?: Question;
  question3?: Question;
}

export interface ContestSummary {
  id: number;
  name: string;
  has_attempts: boolean;
  last_attempt_status?: AttemptStatus;
}

// Use string literal types instead of enums
export type AttemptStatus = 'in_progress' | 'completed' | 'abandoned';
export type Language = 'python' | 'java' | 'cpp' | 'javascript' | 'go' | 'c';

export interface Attempt {
  id: string;
  contest_id: number;
  started_at: string;
  completed_at?: string;
  duration_seconds?: number;
  status: AttemptStatus;
  question1_code?: string;
  question1_language?: Language;
  question2_code?: string;
  question2_language?: Language;
  question3_code?: string;
  question3_language?: Language;
  created_at: string;
  contest?: Contest;
}

export interface AttemptCreate {
  contest_id: number;
  question1_code?: string;
  question1_language?: Language;
  question2_code?: string;
  question2_language?: Language;
  question3_code?: string;
  question3_language?: Language;
}

export interface AttemptUpdate {
  question1_code?: string;
  question1_language?: Language;
  question2_code?: string;
  question2_language?: Language;
  question3_code?: string;
  question3_language?: Language;
  status?: AttemptStatus;
  completed_at?: string;
  duration_seconds?: number;
}

export interface QuestionTemplate {
  id: number;
  title: string;
  templates: {
    python?: string;
    java?: string;
    cpp?: string;
    javascript?: string;
    go?: string;
    c?: string;
  };
}

export interface ContestTemplates {
  question1: QuestionTemplate;
  question2: QuestionTemplate;
  question3: QuestionTemplate;
}

export interface TimerState {
  timeLeft: number;
  isRunning: boolean;
  hasWarned30Min: boolean;
  hasWarned5Min: boolean;
}