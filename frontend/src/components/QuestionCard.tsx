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
      className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 cursor-pointer transition-all hover:shadow-md ${
        isActive ? 'ring-2 ring-blue-500 border-blue-200' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm font-medium">
              Question {questionNumber}
            </span>
            <span className={`px-2 py-1 rounded text-xs font-medium border ${difficultyColors[question.difficulty]}`}>
              {question.difficulty}
            </span>
            {hasCode && (
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium border border-green-200">
                Code Written
              </span>
            )}
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {question.title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-3">
            {question.description}
          </p>
          
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{question.category}</span>
            <span>#{question.neetcode_number}</span>
          </div>
          
          {userLanguage && (
            <div className="mt-2">
              <span className="text-xs text-gray-500">
                Language: <span className="font-medium">{userLanguage}</span>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}