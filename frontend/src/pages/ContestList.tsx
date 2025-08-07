import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ContestSummary } from '../types'
import { contestAPI } from '../services/api'

export const ContestList: React.FC = () => {
  const [contests, setContests] = useState<ContestSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'attempted' | 'not-attempted'>('all')

  useEffect(() => {
    fetchContests()
  }, [])

  const fetchContests = async () => {
    try {
      const data = await contestAPI.getAll()
      setContests(data)
    } catch (error) {
      console.error('Error fetching contests:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredContests = contests.filter(contest => {
    if (filter === 'attempted') return contest.has_attempts
    if (filter === 'not-attempted') return !contest.has_attempts
    return true
  })

  const stats = {
    total: contests.length,
    attempted: contests.filter(c => c.has_attempts).length,
    completed: contests.filter(c => c.last_attempt_status === 'completed').length,
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
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
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Problems</h1>
        <p className="text-gray-600">
          Practice coding with timed contests. Each contest contains 3 carefully selected problems.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">Total Problems</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total * 3}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-blue-500 rounded"></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">Attempted</p>
              <p className="text-2xl font-bold text-gray-900">{stats.attempted}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-yellow-500 rounded"></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">Solved</p>
              <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-green-500 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setFilter('all')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              filter === 'all'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            All ({contests.length})
          </button>
          <button
            onClick={() => setFilter('not-attempted')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              filter === 'not-attempted'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Todo ({contests.length - stats.attempted})
          </button>
          <button
            onClick={() => setFilter('attempted')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              filter === 'attempted'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Attempted ({stats.attempted})
          </button>
        </nav>
      </div>

      {/* Contest List */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900">Contests</h3>
            <div className="text-sm text-gray-500">
              {filteredContests.length} contest{filteredContests.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredContests.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <div className="text-gray-400 mb-2">No contests found</div>
              <p className="text-sm text-gray-500">
                {filter === 'attempted' 
                  ? "You haven't attempted any contests yet."
                  : filter === 'not-attempted'
                  ? "All contests have been attempted."
                  : "No contests available."}
              </p>
            </div>
          ) : (
            filteredContests.map((contest) => (
              <div key={contest.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className={`status-indicator ${
                        contest.last_attempt_status === 'completed' 
                          ? 'status-completed'
                          : contest.has_attempts
                          ? 'status-attempted'
                          : 'status-not-attempted'
                      }`}></div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <Link 
                          to={`/contest/${contest.id}`}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          {contest.name}
                        </Link>
                        {contest.last_attempt_status === 'completed' && (
                          <span className="badge badge-success">Solved</span>
                        )}
                        {contest.has_attempts && contest.last_attempt_status !== 'completed' && (
                          <span className="badge badge-warning">Attempted</span>
                        )}
                      </div>
                      <div className="mt-1 text-sm text-gray-500">
                        3 problems • 1 hour time limit • Multiple languages
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="text-sm text-gray-500">
                      {contest.has_attempts ? 'Attempted' : 'New'}
                    </div>
                    <Link
                      to={`/contest/${contest.id}`}
                      className="btn btn-primary btn-sm"
                    >
                      {contest.has_attempts ? 'View' : 'Start'}
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Help Section */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-blue-900 mb-2">How it works</h3>
        <ul className="text-blue-800 space-y-1 text-sm">
          <li>• Each contest contains 3 carefully selected problems</li>
          <li>• You have 1 hour to solve all problems</li>
          <li>• Choose from Python, Java, C++, or JavaScript</li>
          <li>• Your progress is automatically saved</li>
          <li>• Get notifications at 30 minutes and 5 minutes remaining</li>
        </ul>
      </div>
    </div>
  )
}