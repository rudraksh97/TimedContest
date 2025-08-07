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
      className={`card cursor-pointer transition-all hover:shadow-lg ${
        isActive ? 'ring-2 ring-hackerrank-green border-hackerrank-green' : 'hackerrank-card-hover'
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <span className="bg-hackerrank-darker text-hackerrank-text px-2 py-1 rounded text-sm font-medium">
              Question {questionNumber}
            </span>
            <span className={`px-2 py-1 rounded text-xs font-medium border ${difficultyColors[question.difficulty]}`}>
              {question.difficulty}
            </span>
            {hasCode && (
              <span className="bg-hackerrank-green text-hackerrank-dark px-2 py-1 rounded text-xs font-medium border border-hackerrank-green font-semibold">
                Code Written
              </span>
            )}
          </div>
          
          <h3 className="text-lg font-semibold text-hackerrank-text mb-2">
            {question.title}
          </h3>
          
          <p className="text-hackerrank-textSecondary text-sm mb-3 line-clamp-3">
            {question.description}
          </p>
          
          <div className="flex items-center justify-between text-xs text-hackerrank-textSecondary">
            <span>{question.category}</span>
            <span>#{question.neetcode_number}</span>
          </div>
          
          {userLanguage && (
            <div className="mt-2">
              <span className="text-xs text-hackerrank-textSecondary">
                Language: <span className="font-medium text-hackerrank-text">{userLanguage}</span>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}