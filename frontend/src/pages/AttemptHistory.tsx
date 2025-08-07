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
          <div className="h-8 bg-meta-lighter rounded-xl w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-meta-lighter rounded-xl"></div>
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
        <h1 className="text-4xl font-bold text-meta-text mb-3 bg-gradient-to-r from-meta-text to-meta-textSecondary bg-clip-text text-transparent">
          Submissions
        </h1>
        <p className="text-meta-textSecondary text-lg">
          Track your progress across all contest attempts
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card meta-card-hover gradient-card">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm font-medium text-meta-textSecondary">Total</p>
              <p className="text-3xl font-bold text-meta-text">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="card meta-card-hover gradient-card">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm font-medium text-meta-textSecondary">Completed</p>
              <p className="text-3xl font-bold text-meta-success">{stats.completed}</p>
            </div>
          </div>
        </div>

        <div className="card meta-card-hover gradient-card">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm font-medium text-meta-textSecondary">In Progress</p>
              <p className="text-3xl font-bold text-meta-warning">{stats.inProgress}</p>
            </div>
          </div>
        </div>

        <div className="card meta-card-hover gradient-card">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm font-medium text-meta-textSecondary">Abandoned</p>
              <p className="text-3xl font-bold text-meta-textSecondary">{stats.abandoned}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="border-b border-meta-border mb-6">
        <nav className="-mb-px flex space-x-8">
          {(['all', 'completed', 'in_progress', 'abandoned'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`py-3 px-1 border-b-2 font-semibold text-sm transition-all duration-200 ${
                filter === status
                  ? 'border-meta-blue text-meta-blue'
                  : 'border-transparent text-meta-textSecondary hover:text-meta-text hover:border-meta-border'
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
            <div className="text-meta-textSecondary mb-2 text-lg font-medium">No submissions found</div>
            <p className="text-sm text-meta-textSecondary mb-4">
              {filter === 'all' 
                ? "You haven't made any submissions yet."
                : `No ${getStatusText(filter).toLowerCase()} submissions found.`}
            </p>
            {filter === 'all' && (
              <Link to="/" className="btn btn-primary shadow-meta">
                Start Your First Contest
              </Link>
            )}
          </div>
        ) : (
          <div className="divide-y divide-meta-border">
            {filteredAttempts.map((attempt) => (
              <div key={attempt.id} className="px-6 py-4 hover:bg-meta-lighter/30 transition-all duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-3">
                      <Link 
                        to={`/contest/${attempt.contest_id}`}
                        className="text-meta-blue hover:text-meta-blueLight font-semibold text-lg transition-colors"
                      >
                        {attempt.contest?.name || `Contest ${attempt.contest_id}`}
                      </Link>
                      
                      <span className={`badge ${statusColors[attempt.status]} border`}>
                        {getStatusText(attempt.status)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-meta-textSecondary">
                      <div>
                        <span className="text-meta-textSecondary font-medium">Started:</span>
                        <div className="font-semibold text-meta-text">
                          {new Date(attempt.started_at).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-meta-textSecondary">
                          {new Date(attempt.started_at).toLocaleTimeString()}
                        </div>
                      </div>
                      
                      {attempt.completed_at && (
                        <div>
                          <span className="text-meta-textSecondary font-medium">Duration:</span>
                          <div className="font-semibold text-meta-text">
                            {formatTime(attempt.duration_seconds || 0)}
                          </div>
                        </div>
                      )}
                      
                      <div>
                        <span className="text-meta-textSecondary font-medium">Languages:</span>
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
                            <span className="text-meta-textSecondary text-xs">None</span>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <span className="text-meta-textSecondary font-medium">Problems:</span>
                        <div className="flex space-x-1 mt-1">
                          {[1, 2, 3].map(i => (
                            <div
                              key={i}
                              className={`w-3 h-3 rounded-full ${
                                attempt[`question${i}_code` as keyof Attempt]
                                  ? 'bg-meta-success'
                                  : 'bg-meta-border'
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
                        className="btn btn-primary btn-sm shadow-meta"
                      >
                        Resume
                      </Link>
                    ) : (
                      <Link
                        to={`/attempt/${attempt.id}/review`}
                        className="btn btn-secondary btn-sm shadow-meta"
                      >
                        Review
                      </Link>
                    )}
                    
                    <button
                      onClick={() => handleDeleteAttempt(attempt.id)}
                      className="btn btn-danger btn-sm shadow-meta"
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