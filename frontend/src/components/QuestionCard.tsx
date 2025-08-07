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
      className={`card cursor-pointer transition-all duration-300 hover:shadow-hackerrank-lg ${
        isActive ? 'ring-2 ring-hackerrank-green border-hackerrank-green shadow-hackerrank-lg' : 'hackerrank-card-hover gradient-card'
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-3">
            <span className="bg-hackerrank-darker text-hackerrank-text px-3 py-1.5 rounded-lg text-sm font-semibold">
              Question {questionNumber}
            </span>
            <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${difficultyColors[question.difficulty]}`}>
              {question.difficulty}
            </span>
            {hasCode && (
              <span className="bg-hackerrank-success text-hackerrank-dark px-3 py-1.5 rounded-lg text-xs font-semibold border border-hackerrank-success">
                Code Written
              </span>
            )}
          </div>
          
          <h3 className="text-xl font-bold text-hackerrank-text mb-3">
            {question.title}
          </h3>
          
          <p className="text-hackerrank-textSecondary text-sm mb-4 line-clamp-3 leading-relaxed">
            {question.description}
          </p>
          
          <div className="flex items-center justify-between text-xs text-hackerrank-textSecondary">
            <span className="font-medium">{question.category}</span>
            <span className="font-mono">#{question.neetcode_number}</span>
          </div>
          
          {userLanguage && (
            <div className="mt-3">
              <span className="text-xs text-hackerrank-textSecondary font-medium">
                Language: <span className="font-semibold text-hackerrank-text">{userLanguage}</span>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}