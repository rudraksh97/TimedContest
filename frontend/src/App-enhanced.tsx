import React, { useState, useEffect } from 'react'
import { Navigation } from './components/Navigation'
import { ContestPage } from './pages/ContestPage'
import { Contest } from './types'

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'contest'>('home')
  const [selectedContestId, setSelectedContestId] = useState<number | null>(null)
  const [contests, setContests] = useState<Contest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchContests()
  }, [])

  const fetchContests = async () => {
    try {
      const response = await fetch('http://localhost:8000/contests')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setContests(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load contests')
    } finally {
      setLoading(false)
    }
  }

  const startContest = (contestId: number) => {
    setSelectedContestId(contestId)
    setCurrentView('contest')
  }

  const goHome = () => {
    setCurrentView('home')
    setSelectedContestId(null)
  }

  // Contest view
  if (currentView === 'contest' && selectedContestId) {
    return <ContestPage contestId={selectedContestId} />
  }

  // Home view
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading TimedContest Platform...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">❌ Error</div>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentPath="/" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🏆 Timed Contest Platform
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Challenge yourself with carefully curated contests. Each contest contains 3 balanced questions 
            from the Neetcode 150 list. You have 1 hour to solve all questions.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-2xl font-bold text-gray-900">{contests.length}</div>
            <div className="text-sm text-gray-600">Total Contests</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-2xl font-bold text-gray-900">
              {contests.filter(c => c.question1 && c.question2 && c.question3).length}
            </div>
            <div className="text-sm text-gray-600">Ready to Start</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-2xl font-bold text-gray-900">4</div>
            <div className="text-sm text-gray-600">Languages</div>
          </div>
        </div>

        {/* Contests Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Contests</h2>
          {contests.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No contests available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contests.map((contest) => (
                <div key={contest.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{contest.name}</h3>
                    <div className="text-2xl">🏁</div>
                  </div>
                  
                  <div className="mb-4">
                    <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                      Ready to Start
                    </span>
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-4">
                    3 Questions • 1 Hour • Multi-language
                  </div>
                  
                  <button
                    onClick={() => startContest(contest.id)}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                  >
                    Start Contest
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Features */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">🚀 Platform Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-green-600">✅</span>
              <span>1-hour timed contests with notifications</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-600">✅</span>
              <span>Clean code editor (no autocomplete)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-600">✅</span>
              <span>Python, Java, C++, JavaScript support</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-600">✅</span>
              <span>Auto-save your progress</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-600">✅</span>
              <span>Question navigation (Q1, Q2, Q3)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-600">✅</span>
              <span>Modern, responsive design</span>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">📋 How to Use</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Click "Start Contest" on any contest above</li>
            <li>A 1-hour timer will begin automatically</li>
            <li>Navigate between questions using Q1, Q2, Q3 buttons</li>
            <li>Select your preferred programming language</li>
            <li>Write your solution in the code editor</li>
            <li>Your code is auto-saved as you type</li>
            <li>Get notifications at 30 minutes and 5 minutes remaining</li>
            <li>Click "Finish" when done or let the timer expire</li>
          </ol>
        </div>
      </main>
    </div>
  )
}

export default App

