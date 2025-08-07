import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Contest, Attempt } from '../types'
import { contestAPI, attemptAPI } from '../services/api'
import { formatTime } from '../utils/timer'
import { difficultyColors, statusColors, getStatusText } from '../utils/language'

export const ContestDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [contest, setContest] = useState<Contest | null>(null)
  const [attempts, setAttempts] = useState<Attempt[]>([])
  const [loading, setLoading] = useState(true)
  const [startingContest, setStartingContest] = useState(false)

  useEffect(() => {
    fetchData()
  }, [id])

  const fetchData = async () => {
    if (!id) return
    
    try {
      const [contestData, attemptsData] = await Promise.all([
        contestAPI.getById(parseInt(id)),
        contestAPI.getAttempts(parseInt(id))
      ])
      
      setContest(contestData)
      setAttempts(attemptsData)
    } catch (error) {
      console.error('Error fetching contest:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStartContest = async () => {
    if (!contest) return
    
    setStartingContest(true)
    try {
      const attempt = await attemptAPI.create({ contest_id: contest.id })
      navigate(`/contest/${contest.id}/attempt/${attempt.id}`)
    } catch (error) {
      console.error('Error starting contest:', error)
    } finally {
      setStartingContest(false)
    }
  }

  const handleDeleteAttempt = async (attemptId: string) => {
    if (!confirm('Are you sure you want to delete this submission?')) return
    
    try {
      await attemptAPI.delete(attemptId)
      setAttempts(attempts.filter(a => a.id !== attemptId))
    } catch (error) {
      console.error('Error deleting attempt:', error)
    }
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-hackerrank-light rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-64 bg-hackerrank-light rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!contest) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-hackerrank-text mb-4">Contest not found</h1>
          <Link to="/" className="btn btn-primary">Back to Problems</Link>
        </div>
      </div>
    )
  }

  const questions = [contest.question1, contest.question2, contest.question3].filter(Boolean)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-4">
          <li>
            <Link to="/" className="text-hackerrank-textSecondary hover:text-hackerrank-text">
              Problems
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <svg className="flex-shrink-0 h-5 w-5 text-hackerrank-border" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="ml-4 text-sm font-medium text-hackerrank-text">{contest.name}</span>
            </div>
          </li>
        </ol>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-hackerrank-text mb-2">{contest.name}</h1>
            <p className="text-hackerrank-textSecondary">
              Solve 3 problems in 1 hour • Choose your programming language
            </p>
          </div>
          <div>
            <button
              onClick={handleStartContest}
              disabled={startingContest}
              className="btn btn-primary btn-lg"
            >
              {startingContest ? 'Starting...' : 'Start Contest'}
            </button>
          </div>
        </div>
      </div>

      {/* Problems */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-hackerrank-text mb-4">Problems</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {questions.map((question, index) => (
            <div key={question?.id} className="card hackerrank-card-hover">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-hackerrank-textSecondary">
                    {index + 1}.
                  </span>
                  <h3 className="font-semibold text-hackerrank-text">{question?.title}</h3>
                </div>
                {question && (
                  <span className={`badge ${difficultyColors[question.difficulty]} border`}>
                    {question.difficulty}
                  </span>
                )}
              </div>
              
              <p className="text-sm text-hackerrank-textSecondary mb-4 line-clamp-3">
                {question?.description}
              </p>
              
              <div className="flex items-center justify-between text-xs text-hackerrank-textSecondary">
                <span>{question?.category}</span>
                <span>#{question?.neetcode_number}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Submissions History */}
      {attempts.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-hackerrank-text mb-4">Your Submissions</h2>
          <div className="card p-0 overflow-hidden">
            <div className="px-6 py-4 bg-hackerrank-darker border-b border-hackerrank-border">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-hackerrank-text">Submission History</h3>
                <div className="text-sm text-hackerrank-textSecondary">
                  {attempts.length} submission{attempts.length !== 1 ? 's' : ''}
                </div>
              </div>
            </div>
            
            <div className="divide-y divide-hackerrank-border">
              {attempts.map((attempt) => (
                <div key={attempt.id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-2">
                        <span className={`badge ${statusColors[attempt.status]} border`}>
                          {getStatusText(attempt.status)}
                        </span>
                        
                        <span className="text-sm text-hackerrank-textSecondary">
                          {new Date(attempt.started_at).toLocaleString()}
                        </span>
                        
                        {attempt.completed_at && (
                          <span className="text-sm text-hackerrank-textSecondary">
                            Duration: {formatTime(attempt.duration_seconds || 0)}
                          </span>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-hackerrank-textSecondary">Problem 1:</span>
                          <span className="ml-2 font-medium text-hackerrank-text">
                            {attempt.question1_language || 'Not attempted'}
                          </span>
                        </div>
                        <div>
                          <span className="text-hackerrank-textSecondary">Problem 2:</span>
                          <span className="ml-2 font-medium text-hackerrank-text">
                            {attempt.question2_language || 'Not attempted'}
                          </span>
                        </div>
                        <div>
                          <span className="text-hackerrank-textSecondary">Problem 3:</span>
                          <span className="ml-2 font-medium text-hackerrank-text">
                            {attempt.question3_language || 'Not attempted'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      {attempt.status === 'in_progress' ? (
                        <Link
                          to={`/contest/${contest.id}/attempt/${attempt.id}`}
                          className="btn btn-primary btn-sm"
                        >
                          Resume
                        </Link>
                      ) : (
                        <Link
                          to={`/attempt/${attempt.id}/review`}
                          className="btn btn-secondary btn-sm"
                        >
                          View
                        </Link>
                      )}
                      
                      <button
                        onClick={() => handleDeleteAttempt(attempt.id)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Contest Info */}
      <div className="mt-8 card bg-hackerrank-green/10 border-hackerrank-green/20">
        <h3 className="text-lg font-medium text-hackerrank-green mb-4">Contest Rules</h3>
        <ul className="text-hackerrank-textSecondary space-y-2">
          <li>• You have 1 hour to complete all 3 problems</li>
          <li>• Choose from Python, Java, C++, or JavaScript</li>
          <li>• Your code is automatically saved as you type</li>
          <li>• You'll receive notifications at 30 minutes and 5 minutes remaining</li>
          <li>• You can finish early or let the timer expire</li>
          <li>• Multiple attempts are allowed</li>
        </ul>
      </div>
    </div>
  )
}