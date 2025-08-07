import React from 'react'
import { Question, Language } from '../types'
import { difficultyColors } from '../utils/language'

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
  
  return (
    <div 
      className={`card cursor-pointer transition-all duration-300 hover:shadow-meta-lg ${
        isActive ? 'ring-2 ring-meta-blue border-meta-blue shadow-meta-lg' : 'meta-card-hover gradient-card'
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-3">
            <span className="bg-meta-darker text-meta-text px-3 py-1.5 rounded-lg text-sm font-semibold">
              Question {questionNumber}
            </span>
            <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${difficultyColors[question.difficulty]}`}>
              {question.difficulty}
            </span>
            {hasCode && (
              <span className="bg-meta-success text-meta-dark px-3 py-1.5 rounded-lg text-xs font-semibold border border-meta-success">
                Code Written
              </span>
            )}
          </div>
          
          <h3 className="text-xl font-bold text-meta-text mb-3">
            {question.title}
          </h3>
          
          <p className="text-meta-textSecondary text-sm mb-4 line-clamp-3 leading-relaxed">
            {question.description}
          </p>
          
          <div className="flex items-center justify-between text-xs text-meta-textSecondary">
            <span className="font-medium">{question.category}</span>
            <span className="font-mono">#{question.neetcode_number}</span>
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