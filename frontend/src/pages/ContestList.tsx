import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ContestSummary } from '../types'
import { contestAPI } from '../services/api'
import { Clock, Code, Trophy, Target, CheckCircle, PlayCircle, RotateCcw } from 'lucide-react'

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
          <div className="h-8 bg-meta-lighter rounded-xl w-1/4 mb-6"></div>
          <div className="grid grid-cols-10 gap-3">
            {[...Array(50)].map((_, i) => (
              <div key={i} className="h-20 bg-slate-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-full mx-auto px-6 py-4">


      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-lg hover:scale-105 transition-all duration-300">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-slate-100 rounded-xl">
              <Target className="w-6 h-6 text-slate-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Total Challenges</p>
              <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-lg hover:scale-105 transition-all duration-300">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-50 rounded-xl">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">In Progress</p>
              <p className="text-2xl font-bold text-slate-800">{stats.attempted}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-lg hover:scale-105 transition-all duration-300">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-emerald-50 rounded-xl">
              <Trophy className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Completed</p>
              <p className="text-2xl font-bold text-slate-800">{stats.completed}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-between items-center mb-6">
        <div></div>
        <div className="bg-slate-100 rounded-2xl p-2 inline-flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
              filter === 'all'
                ? 'bg-slate-800 text-white shadow-md transform scale-105'
                : 'text-slate-600 hover:text-slate-800 hover:bg-slate-200'
            }`}
          >
            All Contests
            <span className={`ml-3 px-3 py-1 rounded-full text-xs ${
              filter === 'all' 
                ? 'bg-white/20 text-white' 
                : 'bg-slate-200 text-slate-600'
            }`}>
              {contests.length}
            </span>
          </button>
          <button
            onClick={() => setFilter('not-attempted')}
            className={`px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
              filter === 'not-attempted'
                ? 'bg-blue-600 text-white shadow-md transform scale-105'
                : 'text-slate-600 hover:text-slate-800 hover:bg-slate-200'
            }`}
          >
            New
            <span className={`ml-3 px-3 py-1 rounded-full text-xs ${
              filter === 'not-attempted' 
                ? 'bg-white/20 text-white' 
                : 'bg-slate-200 text-slate-600'
            }`}>
              {contests.length - stats.attempted}
            </span>
          </button>
          <button
            onClick={() => setFilter('attempted')}
            className={`px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
              filter === 'attempted'
                ? 'bg-emerald-600 text-white shadow-md transform scale-105'
                : 'text-slate-600 hover:text-slate-800 hover:bg-slate-200'
            }`}
          >
            Started
            <span className={`ml-3 px-3 py-1 rounded-full text-xs ${
              filter === 'attempted' 
                ? 'bg-white/20 text-white' 
                : 'bg-slate-200 text-slate-600'
            }`}>
              {stats.attempted}
            </span>
          </button>
        </div>
        <div></div>
      </div>

      {/* Contest Grid */}
      <div className="grid grid-cols-10 gap-3">
        {filteredContests.length === 0 ? (
          <div className="col-span-full">
            <div className="bg-slate-50 rounded-3xl p-12 text-center border-2 border-slate-200">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-800 rounded-full mb-6 shadow-lg">
                <Target className="w-10 h-10 text-slate-200" />
              </div>
              <div className="text-2xl font-bold text-slate-800 mb-3">
                {filter === 'attempted' 
                  ? "Ready to Begin Your Coding Journey?"
                  : filter === 'not-attempted'
                  ? "Amazing! You're on a Roll!"
                  : "Your Coding Adventure Awaits!"}
              </div>
              <p className="text-slate-600 text-lg max-w-md mx-auto leading-relaxed">
                {filter === 'attempted' 
                  ? "Time to dive into your first coding challenge! Pick any contest and start building your skills."
                  : filter === 'not-attempted'
                  ? "You've tackled all available challenges! New contests are coming soon. Keep checking back!"
                  : "We're preparing exciting coding challenges just for you. Check back soon for fresh problems to solve!"}
              </p>
              {filter === 'attempted' && (
                <button 
                  onClick={() => setFilter('not-attempted')}
                  className="mt-6 px-8 py-3 bg-slate-800 text-white font-semibold rounded-xl hover:bg-slate-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Show Me Fresh Challenges
                </button>
              )}
            </div>
          </div>
        ) : (
          filteredContests.map((contest) => {
            return (
              <Link
                key={contest.id}
                to={`/contest/${contest.id}`}
                className="bg-white rounded-lg p-3 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 border border-gray-200 flex flex-col h-20 cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`w-2 h-2 rounded-full ${
                    contest.last_attempt_status === 'completed' 
                      ? 'bg-green-500' 
                      : contest.has_attempts 
                        ? 'bg-blue-500'
                        : 'bg-gray-300'
                  }`}></span>
                  <div className="text-gray-400 group-hover:text-gray-600 transition-colors text-xs">
                    →
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                    {contest.name}
                  </h3>
                  <p className="text-xs text-gray-500">3 Problems</p>
                </div>
              </Link>
            )
          })
        )}
      </div>


    </div>
  )
}