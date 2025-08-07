import { Language, AttemptStatus } from '../types';

export const languageConfig = {
  python: {
    name: 'Python',
    monaco: 'python',
    extension: '.py',
    icon: '🐍',
  },
  java: {
    name: 'Java',
    monaco: 'java',
    extension: '.java',
    icon: '☕',
  },
  cpp: {
    name: 'C++',
    monaco: 'cpp',
    extension: '.cpp',
    icon: '⚡',
  },
  javascript: {
    name: 'JavaScript',
    monaco: 'javascript',
    extension: '.js',
    icon: '📜',
  },
} as const;

export const getLanguageConfig = (language: Language) => {
  return languageConfig[language];
};

export const difficultyColors = {
  Easy: 'text-hackerrank-green bg-hackerrank-green/10 border-hackerrank-green/20',
  Medium: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  Hard: 'text-red-400 bg-red-400/10 border-red-400/20',
} as const;

export const statusColors = {
  in_progress: 'text-hackerrank-green bg-hackerrank-green/10 border-hackerrank-green/20',
  completed: 'text-hackerrank-green bg-hackerrank-green text-hackerrank-dark font-semibold',
  abandoned: 'text-hackerrank-textSecondary bg-hackerrank-light border-hackerrank-border',
} as const;

export const getStatusText = (status: AttemptStatus): string => {
  switch (status) {
    case 'in_progress':
      return 'In Progress';
    case 'completed':
      return 'Completed';
    case 'abandoned':
      return 'Abandoned';
    default:
      return status;
  }
};