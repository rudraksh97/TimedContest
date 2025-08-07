import React from 'react'
import { Question, Language } from '../types'
import { HtmlRenderer } from './HtmlRenderer'

interface QuestionCardProps {
  question: Question
  questionNumber: number
  isActive?: boolean
  onClick?: () => void
  userCode?: string
  userLanguage?: Language
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ 
  question, 
  questionNumber, 
  isActive = false,
  onClick,
  userCode,
  userLanguage
}) => {
  const hasCode = userCode && userCode.trim() !== ''
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-700 border-green-200'
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'hard':
        return 'bg-red-100 text-red-700 border-red-200'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }
  
  return (
    <div 
      className={`card cursor-pointer transition-all duration-300 hover:shadow-meta-lg ${
        isActive ? 'ring-2 ring-meta-primary border-meta-primary shadow-meta-lg' : 'meta-card-hover gradient-card'
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-3">
            <span className="bg-meta-lighter text-meta-text px-3 py-1.5 rounded-lg text-sm font-semibold">
              Question {questionNumber}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(question.difficulty)}`}>
              {question.difficulty}
            </span>
            {hasCode && (
              <span className="bg-meta-success/10 text-meta-success px-3 py-1.5 rounded-lg text-xs font-semibold border border-meta-success/20">
                Code Written
              </span>
            )}
          </div>
          
          <h3 className="text-xl font-bold text-meta-text mb-3">
            {question.title}
          </h3>
          
          <HtmlRenderer 
            content={question.description || ''}
            className="text-meta-textSecondary text-sm mb-4 leading-relaxed"
            maxHeight="200px"
          />
          
          <div className="flex items-center justify-between text-xs text-meta-textSecondary">
            <div className="flex items-center space-x-4">
              <span className="font-mono">#{question.neetcode_number}</span>
              {question.category && (
                <span className="bg-meta-lighter px-2 py-1 rounded text-xs font-medium">
                  {question.category}
                </span>
              )}
            </div>
          </div>
          
          {userLanguage && (
            <div className="mt-3">
              <span className="text-xs text-meta-textSecondary font-medium">
                Language: <span className="font-semibold text-meta-text">{userLanguage}</span>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}