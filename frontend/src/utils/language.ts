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
  Easy: 'text-green-600 bg-green-50 border-green-200',
  Medium: 'text-orange-600 bg-orange-50 border-orange-200',
  Hard: 'text-red-600 bg-red-50 border-red-200',
} as const;

export const statusColors = {
  in_progress: 'text-blue-600 bg-blue-50 border-blue-200',
  completed: 'text-green-600 bg-green-50 border-green-200',
  abandoned: 'text-gray-600 bg-gray-50 border-gray-200',
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