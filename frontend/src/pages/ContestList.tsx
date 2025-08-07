import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ContestSummary } from '../types'
import { contestAPI, attemptAPI } from '../services/api'
import { Clock, Code, Trophy, Target, PlayCircle, RotateCcw, History, Zap, Star, Award, Eye } from 'lucide-react'

export const ContestList: React.FC = () => {
  const navigate = useNavigate()
  const [contests, setContests] = useState<ContestSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'attempted' | 'not-attempted'>('all')
  const [startingContests, setStartingContests] = useState<Set<number>>(new Set())

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

  const handleContestClick = async (contest: ContestSummary, e: React.MouseEvent) => {
    e.preventDefault()
    
    // If contest has attempts, navigate to contest details to show submissions
    if (contest.has_attempts) {
      navigate(`/contest/${contest.id}`)
      return
    }
    
    // Create new attempt for contests without attempts
    setStartingContests(prev => new Set(prev).add(contest.id))
    try {
      const attempt = await attemptAPI.create({ contest_id: contest.id })
      navigate(`/contest/${contest.id}/attempt/${attempt.id}`)
    } catch (error) {
      console.error('Error starting contest:', error)
    } finally {
      setStartingContests(prev => {
        const newSet = new Set(prev)
        newSet.delete(contest.id)
        return newSet
      })
    }
  }

  const handleStartNewAttempt = async (contest: ContestSummary) => {
    setStartingContests(prev => new Set(prev).add(contest.id))
    try {
      const attempt = await attemptAPI.create({ contest_id: contest.id })
      navigate(`/contest/${contest.id}/attempt/${attempt.id}`)
    } catch (error) {
      console.error('Error starting new attempt:', error)
    } finally {
      setStartingContests(prev => {
        const newSet = new Set(prev)
        newSet.delete(contest.id)
        return newSet
      })
    }
  }

  const handleReviewContest = async (contest: ContestSummary) => {
    try {
      const attempts = await contestAPI.getAttempts(contest.id)
      const completedAttempts = attempts.filter(attempt => attempt.status === 'completed')
      
      if (completedAttempts.length > 0) {
        // Get the most recent completed attempt
        const latestCompletedAttempt = completedAttempts.sort((a, b) => 
          new Date(b.completed_at || '').getTime() - new Date(a.completed_at || '').getTime()
        )[0]
        
        navigate(`/attempt/${latestCompletedAttempt.id}/review`)
      } else {
        // If no completed attempts, navigate to contest details
        navigate(`/contest/${contest.id}`)
      }
    } catch (error) {
      console.error('Error fetching attempts for review:', error)
      // Fallback to contest details
      navigate(`/contest/${contest.id}`)
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="animate-pulse">
            <div className="h-12 bg-white rounded-2xl w-1/3 mb-8 shadow-sm"></div>
            <div className="grid grid-cols-3 gap-6 mb-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-24 bg-white rounded-2xl shadow-sm"></div>
              ))}
            </div>
            <div className="grid grid-cols-5 gap-4">
              {[...Array(50)].map((_, i) => (
                <div key={i} className="h-32 bg-white rounded-2xl shadow-sm"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            🏆 Coding Challenges
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Master the art of problem-solving with our curated collection of 50 programming challenges. 
            Each contest features 3 carefully selected problems to test your skills.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-lg hover:scale-105 transition-all duration-300">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl">
                <Target className="w-6 h-6 text-slate-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Total Challenges</p>
                <p className="text-3xl font-bold text-slate-800">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-lg hover:scale-105 transition-all duration-300">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">In Progress</p>
                <p className="text-3xl font-bold text-slate-800">{stats.attempted}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-lg hover:scale-105 transition-all duration-300">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl">
                <Trophy className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Completed</p>
                <p className="text-3xl font-bold text-slate-800">{stats.completed}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-2xl p-2 shadow-sm border border-slate-200 inline-flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center space-x-2 ${
                filter === 'all'
                  ? 'bg-gradient-to-r from-slate-800 to-slate-700 text-white shadow-lg transform scale-105'
                  : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
              }`}
            >
              <Code className="w-4 h-4" />
              <span>All Contests</span>
              <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                filter === 'all' 
                  ? 'bg-white/20 text-white' 
                  : 'bg-slate-200 text-slate-600'
              }`}>
                {contests.length}
              </span>
            </button>
            <button
              onClick={() => setFilter('not-attempted')}
              className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center space-x-2 ${
                filter === 'not-attempted'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg transform scale-105'
                  : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>New</span>
              <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                filter === 'not-attempted' 
                  ? 'bg-white/20 text-white' 
                  : 'bg-slate-200 text-slate-600'
              }`}>
                {contests.length - stats.attempted}
              </span>
            </button>
            <button
              onClick={() => setFilter('attempted')}
              className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center space-x-2 ${
                filter === 'attempted'
                  ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg transform scale-105'
                  : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
              }`}
            >
              <PlayCircle className="w-4 h-4" />
              <span>Started</span>
              <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                filter === 'attempted' 
                  ? 'bg-white/20 text-white' 
                  : 'bg-slate-200 text-slate-600'
              }`}>
                {stats.attempted}
              </span>
            </button>
          </div>
        </div>

        {/* Contest Grid */}
        {filteredContests.length === 0 ? (
          <div className="text-center">
            <div className="bg-white rounded-3xl p-12 shadow-sm border border-slate-200 max-w-2xl mx-auto">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full mb-6 shadow-lg">
                <Target className="w-10 h-10 text-slate-600" />
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
                  className="mt-6 px-8 py-3 bg-gradient-to-r from-slate-800 to-slate-700 text-white font-semibold rounded-xl hover:from-slate-700 hover:to-slate-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Show Me Fresh Challenges
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {filteredContests.map((contest) => {
              const isStarting = startingContests.has(contest.id)
              const isCompleted = contest.last_attempt_status === 'completed'
              const isAttempted = contest.has_attempts
              
              return (
                <div
                  key={contest.id}
                  className={`group relative bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden ${
                    contest.has_attempts 
                      ? 'cursor-pointer hover:border-blue-300' 
                      : 'cursor-pointer hover:border-blue-300'
                  }`}
                  onClick={(e) => handleContestClick(contest, e)}
                >
                  {/* Status Indicator */}
                  <div className="absolute top-4 right-4">
                    <div className={`w-3 h-3 rounded-full ${
                      isCompleted 
                        ? 'bg-gradient-to-r from-emerald-400 to-emerald-500 shadow-lg' 
                        : isAttempted 
                          ? 'bg-gradient-to-r from-blue-400 to-blue-500 shadow-lg'
                          : 'bg-gradient-to-r from-slate-300 to-slate-400'
                    }`}></div>
                  </div>

                  {/* Contest Info */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                      {contest.name}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm text-slate-500">
                      <Code className="w-4 h-4" />
                      <span>3 Problems</span>
                    </div>
                    {contest.has_attempts && (
                      <div className="text-xs text-blue-600 font-medium">
                        Click to view submissions
                      </div>
                    )}
                    {!contest.has_attempts && (
                      <div className="text-xs text-slate-500 font-medium">
                        Click to start contest
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {isCompleted && (
                        <Award className="w-4 h-4 text-emerald-500" />
                      )}
                      {isAttempted && !isCompleted && (
                        <Clock className="w-4 h-4 text-blue-500" />
                      )}
                      {!isAttempted && (
                        <Star className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {contest.has_attempts && (
                        <>
                          <Link
                            to={`/contest/${contest.id}`}
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all duration-200"
                            title="View submissions"
                          >
                            <History className="w-4 h-4" />
                          </Link>
                          {isCompleted && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleReviewContest(contest)
                              }}
                              className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200"
                              title="Review completed contest (no timer)"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleStartNewAttempt(contest)
                            }}
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                            title="Start new attempt"
                          >
                            <PlayCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      {!contest.has_attempts && (
                        <div className="p-2 text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 rounded-lg transition-all duration-200">
                          {isStarting ? (
                            <RotateCcw className="w-4 h-4 animate-spin" />
                          ) : (
                            <PlayCircle className="w-4 h-4" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Loading Overlay */}
                  {isStarting && (
                    <div className="absolute inset-0 bg-white/90 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                        <p className="text-sm font-medium text-slate-600">Starting...</p>
                      </div>
                    </div>
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-slate-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}