import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Attempt } from '../types'
import { attemptAPI } from '../services/api'
import { statusColors, getStatusText } from '../utils/language'
import { formatTime } from '../utils/timer'

export const AttemptHistory: React.FC = () => {
  const [attempts, setAttempts] = useState<Attempt[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'completed' | 'in_progress' | 'abandoned'>('all')

  useEffect(() => {
    fetchAttempts()
  }, [])

  const fetchAttempts = async () => {
    try {
      const data = await attemptAPI.getAll({ limit: 100 })
      setAttempts(data)
    } catch (error) {
      console.error('Error fetching attempts:', error)
    } finally {
      setLoading(false)
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

  const filteredAttempts = attempts.filter(attempt => {
    if (filter === 'all') return true
    return attempt.status === filter
  })

  const stats = {
    total: attempts.length,
    completed: attempts.filter(a => a.status === 'completed').length,
    inProgress: attempts.filter(a => a.status === 'in_progress').length,
    abandoned: attempts.filter(a => a.status === 'abandoned').length,
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-hackerrank-light rounded-xl w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-hackerrank-light rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-hackerrank-text mb-3 bg-gradient-to-r from-hackerrank-text to-hackerrank-textSecondary bg-clip-text text-transparent">
          Submissions
        </h1>
        <p className="text-hackerrank-textSecondary text-lg">
          Track your progress across all contest attempts
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card hackerrank-card-hover gradient-card">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm font-medium text-hackerrank-textSecondary">Total</p>
              <p className="text-3xl font-bold text-hackerrank-text">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="card hackerrank-card-hover gradient-card">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm font-medium text-hackerrank-textSecondary">Completed</p>
              <p className="text-3xl font-bold text-hackerrank-success">{stats.completed}</p>
            </div>
          </div>
        </div>

        <div className="card hackerrank-card-hover gradient-card">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm font-medium text-hackerrank-textSecondary">In Progress</p>
              <p className="text-3xl font-bold text-hackerrank-warning">{stats.inProgress}</p>
            </div>
          </div>
        </div>

        <div className="card hackerrank-card-hover gradient-card">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm font-medium text-hackerrank-textSecondary">Abandoned</p>
              <p className="text-3xl font-bold text-hackerrank-textSecondary">{stats.abandoned}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="border-b border-hackerrank-border mb-6">
        <nav className="-mb-px flex space-x-8">
          {(['all', 'completed', 'in_progress', 'abandoned'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`py-3 px-1 border-b-2 font-semibold text-sm transition-all duration-200 ${
                filter === status
                  ? 'border-hackerrank-green text-hackerrank-green'
                  : 'border-transparent text-hackerrank-textSecondary hover:text-hackerrank-text hover:border-hackerrank-border'
              }`}
            >
              {status === 'all' ? 'All' : getStatusText(status)} ({
                status === 'all' ? stats.total :
                status === 'completed' ? stats.completed :
                status === 'in_progress' ? stats.inProgress :
                stats.abandoned
              })
            </button>
          ))}
        </nav>
      </div>

      {/* Submissions List */}
      <div className="card p-0 overflow-hidden gradient-card">
        {filteredAttempts.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <div className="text-hackerrank-textSecondary mb-2 text-lg font-medium">No submissions found</div>
            <p className="text-sm text-hackerrank-textSecondary mb-4">
              {filter === 'all' 
                ? "You haven't made any submissions yet."
                : `No ${getStatusText(filter).toLowerCase()} submissions found.`}
            </p>
            {filter === 'all' && (
              <Link to="/" className="btn btn-primary shadow-hackerrank">
                Start Your First Contest
              </Link>
            )}
          </div>
        ) : (
          <div className="divide-y divide-hackerrank-border">
            {filteredAttempts.map((attempt) => (
              <div key={attempt.id} className="px-6 py-4 hover:bg-hackerrank-darker/30 transition-all duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-3">
                      <Link 
                        to={`/contest/${attempt.contest_id}`}
                        className="text-hackerrank-green hover:text-hackerrank-greenLight font-semibold text-lg transition-colors"
                      >
                        {attempt.contest?.name || `Contest ${attempt.contest_id}`}
                      </Link>
                      
                      <span className={`badge ${statusColors[attempt.status]} border`}>
                        {getStatusText(attempt.status)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-hackerrank-textSecondary">
                      <div>
                        <span className="text-hackerrank-textSecondary font-medium">Started:</span>
                        <div className="font-semibold text-hackerrank-text">
                          {new Date(attempt.started_at).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-hackerrank-textSecondary">
                          {new Date(attempt.started_at).toLocaleTimeString()}
                        </div>
                      </div>
                      
                      {attempt.completed_at && (
                        <div>
                          <span className="text-hackerrank-textSecondary font-medium">Duration:</span>
                          <div className="font-semibold text-hackerrank-text">
                            {formatTime(attempt.duration_seconds || 0)}
                          </div>
                        </div>
                      )}
                      
                      <div>
                        <span className="text-hackerrank-textSecondary font-medium">Languages:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {[attempt.question1_language, attempt.question2_language, attempt.question3_language]
                            .filter(Boolean)
                            .map((lang, i) => (
                              <span key={i} className="badge badge-secondary">
                                {lang}
                              </span>
                            ))}
                          {![attempt.question1_language, attempt.question2_language, attempt.question3_language]
                            .some(Boolean) && (
                            <span className="text-hackerrank-textSecondary text-xs">None</span>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <span className="text-hackerrank-textSecondary font-medium">Problems:</span>
                        <div className="flex space-x-1 mt-1">
                          {[1, 2, 3].map(i => (
                            <div
                              key={i}
                              className={`w-3 h-3 rounded-full ${
                                attempt[`question${i}_code` as keyof Attempt]
                                  ? 'bg-hackerrank-success'
                                  : 'bg-hackerrank-border'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    {attempt.status === 'in_progress' ? (
                      <Link
                        to={`/contest/${attempt.contest_id}/attempt/${attempt.id}`}
                        className="btn btn-primary btn-sm shadow-hackerrank"
                      >
                        Resume
                      </Link>
                    ) : (
                      <Link
                        to={`/attempt/${attempt.id}/review`}
                        className="btn btn-secondary btn-sm shadow-hackerrank"
                      >
                        Review
                      </Link>
                    )}
                    
                    <button
                      onClick={() => handleDeleteAttempt(attempt.id)}
                      className="btn btn-danger btn-sm shadow-hackerrank"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}