import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Attempt } from '../types'
import { attemptAPI } from '../services/api'
import { CodeEditor } from '../components/CodeEditor'
import { statusColors, getStatusText, difficultyColors } from '../utils/language'
import { formatTime } from '../utils/timer'

export const AttemptReview: React.FC = () => {
  const { attemptId } = useParams<{ attemptId: string }>()
  const navigate = useNavigate()
  const [attempt, setAttempt] = useState<Attempt | null>(null)
  const [activeQuestion, setActiveQuestion] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAttempt()
  }, [attemptId])

  const fetchAttempt = async () => {
    if (!attemptId) return
    
    try {
      const data = await attemptAPI.getById(attemptId)
      setAttempt(data)
    } catch (error) {
      console.error('Error fetching attempt:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-meta-lighter rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-96 bg-meta-lighter rounded"></div>
            <div className="h-96 bg-meta-lighter rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!attempt) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-meta-text mb-4">Submission not found</h1>
          <Link to="/history" className="btn btn-primary">Back to Submissions</Link>
        </div>
      </div>
    )
  }

  const getCurrentCode = () => {
    switch (activeQuestion) {
      case 1:
        return { code: attempt.question1_code || '', language: attempt.question1_language || 'python' }
      case 2:
        return { code: attempt.question2_code || '', language: attempt.question2_language || 'python' }
      case 3:
        return { code: attempt.question3_code || '', language: attempt.question3_language || 'python' }
      default:
        return { code: '', language: 'python' as const }
    }
  }

  const getCurrentQuestion = () => {
    if (!attempt.contest) return null
    
    switch (activeQuestion) {
      case 1:
        return attempt.contest.question1
      case 2:
        return attempt.contest.question2
      case 3:
        return attempt.contest.question3
      default:
        return null
    }
  }

  const currentCode = getCurrentCode()
  const currentQuestion = getCurrentQuestion()
  const questions = [attempt.contest?.question1, attempt.contest?.question2, attempt.contest?.question3].filter(Boolean)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-4">
          <li>
            <Link to="/history" className="text-meta-textSecondary hover:text-meta-text">
              Submissions
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <svg className="flex-shrink-0 h-5 w-5 text-meta-border" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="ml-4 text-sm font-medium text-meta-text">
                {attempt.contest?.name || 'Review'}
              </span>
            </div>
          </li>
        </ol>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-meta-text mb-2">
              Submission Review
            </h1>
            <p className="text-meta-textSecondary">
              {attempt.contest?.name} • Problem {activeQuestion} of 3
            </p>
          </div>
        </div>
      </div>

      {/* Submission Info */}
      <div className="card mb-8">
        <h2 className="text-lg font-semibold text-meta-text mb-4">Submission Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <h3 className="text-sm font-medium text-meta-textSecondary mb-2">Status</h3>
            <span className={`badge ${statusColors[attempt.status]} border`}>
              {getStatusText(attempt.status)}
            </span>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-meta-textSecondary mb-2">Started</h3>
            <div className="text-sm text-meta-text">
              {new Date(attempt.started_at).toLocaleString()}
            </div>
          </div>
          
          {attempt.completed_at && (
            <div>
              <h3 className="text-sm font-medium text-meta-textSecondary mb-2">Duration</h3>
              <div className="text-sm text-meta-text">
                {formatTime(attempt.duration_seconds || 0)}
              </div>
            </div>
          )}
          
          <div>
            <h3 className="text-sm font-medium text-meta-textSecondary mb-2">Problems Attempted</h3>
            <div className="flex space-x-1">
              {[1, 2, 3].map(i => (
                <div
                  key={i}
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                    attempt[`question${i}_code` as keyof Attempt]
                      ? 'bg-meta-success text-white'
                      : 'bg-meta-lighter text-meta-textSecondary'
                  }`}
                >
                  {i}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Problem Navigation */}
      <div className="mb-6">
        <div className="border-b border-meta-border">
          <nav className="-mb-px flex space-x-8">
            {questions.map((question, index) => (
              <button
                key={question?.id}
                onClick={() => setActiveQuestion(index + 1)}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeQuestion === index + 1
                    ? 'border-meta-blue text-meta-blue'
                    : 'border-transparent text-meta-textSecondary hover:text-meta-text hover:border-meta-border'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span>{index + 1}. {question?.title}</span>
                  {attempt[`question${index + 1}_code` as keyof Attempt] && (
                    <div className="w-2 h-2 bg-meta-blue rounded-full"></div>
                  )}
                </div>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Problem Description */}
        <div>
          <div className="card">
            <h2 className="text-lg font-semibold text-meta-text mb-4">Problem Description</h2>
            
            {currentQuestion && (
              <div className="problem-description">
                <div className="flex items-center space-x-3 mb-4">
                  <h3 className="text-lg font-semibold text-meta-text">
                    {currentQuestion.title}
                  </h3>
                  <span className={`badge ${difficultyColors[currentQuestion.difficulty]} border`}>
                    {currentQuestion.difficulty}
                  </span>
                </div>
                
                <div className="prose prose-sm max-w-none mb-4 text-meta-textSecondary">
                  <p>{currentQuestion.description}</p>
                </div>
                
                <div className="pt-4 border-t border-meta-border text-sm text-meta-textSecondary">
                  <div className="flex items-center justify-between">
                    <span>Category: {currentQuestion.category}</span>
                    <span>Problem #{currentQuestion.neetcode_number}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Code Submission */}
        <div>
          <div className="card p-0 overflow-hidden">
            <div className="px-6 py-4 border-b border-meta-border bg-meta-lighter">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-meta-text">Your Submission</h2>
                {currentCode.language && (
                  <span className="badge badge-info">
                    {currentCode.language}
                  </span>
                )}
              </div>
            </div>
            
            <div className="p-0">
              {currentCode.code ? (
                <CodeEditor
                  language={currentCode.language}
                  value={currentCode.code}
                  onChange={() => {}} // Read-only
                  readOnly={true}
                  height="500px"
                />
              ) : (
                <div className="p-12 text-center">
                  <div className="text-meta-textSecondary mb-2">No code submitted</div>
                  <p className="text-sm text-meta-textSecondary">
                    This problem was not attempted during the contest.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex justify-center space-x-4">
        <Link
          to="/history"
          className="btn btn-secondary"
        >
          Back to Submissions
        </Link>
        
        <Link
          to={`/contest/${attempt.contest_id}`}
          className="btn btn-primary"
        >
          Try Again
        </Link>
      </div>
    </div>
  )
}