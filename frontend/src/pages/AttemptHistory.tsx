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
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
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
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Submissions</h1>
        <p className="text-gray-600">
          Track your progress across all contest attempts
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">Total</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">Abandoned</p>
              <p className="text-2xl font-bold text-gray-600">{stats.abandoned}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {(['all', 'completed', 'in_progress', 'abandoned'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                filter === status
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
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
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {filteredAttempts.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <div className="text-gray-400 mb-2">No submissions found</div>
            <p className="text-sm text-gray-500 mb-4">
              {filter === 'all' 
                ? "You haven't made any submissions yet."
                : `No ${getStatusText(filter).toLowerCase()} submissions found.`}
            </p>
            {filter === 'all' && (
              <Link to="/" className="btn btn-primary">
                Start Your First Contest
              </Link>
            )}
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredAttempts.map((attempt) => (
              <div key={attempt.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-3">
                      <Link 
                        to={`/contest/${attempt.contest_id}`}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        {attempt.contest?.name || `Contest ${attempt.contest_id}`}
                      </Link>
                      
                      <span className={`badge ${statusColors[attempt.status]} border`}>
                        {getStatusText(attempt.status)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="text-gray-500">Started:</span>
                        <div className="font-medium">
                          {new Date(attempt.started_at).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-400">
                          {new Date(attempt.started_at).toLocaleTimeString()}
                        </div>
                      </div>
                      
                      {attempt.completed_at && (
                        <div>
                          <span className="text-gray-500">Duration:</span>
                          <div className="font-medium">
                            {formatTime(attempt.duration_seconds || 0)}
                          </div>
                        </div>
                      )}
                      
                      <div>
                        <span className="text-gray-500">Languages:</span>
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
                            <span className="text-gray-400 text-xs">None</span>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <span className="text-gray-500">Problems:</span>
                        <div className="flex space-x-1 mt-1">
                          {[1, 2, 3].map(i => (
                            <div
                              key={i}
                              className={`w-3 h-3 rounded-full ${
                                attempt[`question${i}_code` as keyof Attempt]
                                  ? 'bg-green-500'
                                  : 'bg-gray-300'
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
                        className="btn btn-primary btn-sm"
                      >
                        Resume
                      </Link>
                    ) : (
                      <Link
                        to={`/attempt/${attempt.id}/review`}
                        className="btn btn-secondary btn-sm"
                      >
                        Review
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
        )}
      </div>
    </div>
  )
}