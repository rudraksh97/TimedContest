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
  go: {
    name: 'Go',
    monaco: 'go',
    extension: '.go',
    icon: '🐹',
  },
  c: {
    name: 'C',
    monaco: 'c',
    extension: '.c',
    icon: '🔧',
  },
} as const;

export const getLanguageConfig = (language: Language) => {
  return languageConfig[language];
};

export const difficultyColors = {
  Easy: 'text-meta-success bg-meta-success/10 border-meta-success/20',
  Medium: 'text-meta-warning bg-meta-warning/10 border-meta-warning/20',
  Hard: 'text-meta-error bg-meta-error/10 border-meta-error/20',
} as const;

export const statusColors = {
  in_progress: 'text-meta-blue bg-meta-blue/10 border-meta-blue/20',
  completed: 'text-meta-success bg-meta-success/10 border-meta-success/20',
  abandoned: 'text-meta-textSecondary bg-meta-lighter border-meta-border',
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