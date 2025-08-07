import React, { useState, useEffect } from 'react'

// Simple types without enums
interface Contest {
  id: number
  name: string
  has_attempts: boolean
  last_attempt_status?: string
}

function App() {
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

  const startContest = async (contestId: number) => {
    try {
      const response = await fetch('http://localhost:8000/attempts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contest_id: contestId }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to start contest')
      }
      
      const attempt = await response.json()
      alert(`Contest started! Attempt ID: ${attempt.id}\n\nIn the full version, this would open the coding interface with:\n- 1-hour timer\n- Code editor with syntax highlighting\n- 3 questions to solve\n- Multi-language support`)
    } catch (err) {
      alert('Error starting contest: ' + (err instanceof Error ? err.message : 'Unknown error'))
    }
  }

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
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">⏱️</span>
              <span className="text-xl font-bold text-gray-900">TimedContest</span>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-600 hover:text-blue-800">Contests</a>
              <a href="#" className="text-gray-600 hover:text-gray-800">History</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Timed Contest Platform
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
              {contests.filter(c => c.has_attempts).length}
            </div>
            <div className="text-sm text-gray-600">Attempted</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-2xl font-bold text-gray-900">
              {contests.filter(c => c.last_attempt_status === 'completed').length}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
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
                    <div className="text-2xl">
                      {contest.has_attempts ? '✅' : '🏁'}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      contest.has_attempts 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {contest.has_attempts ? 'Attempted' : 'Not Attempted'}
                    </span>
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-4">
                    3 Questions • 1 Hour • Multi-language
                  </div>
                  
                  <button
                    onClick={() => startContest(contest.id)}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                  >
                    {contest.has_attempts ? 'Start New Attempt' : 'Start Contest'}
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
              <span>1-hour timed contests</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-600">✅</span>
              <span>Monaco code editor</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-600">✅</span>
              <span>4 programming languages</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-600">✅</span>
              <span>Attempt history & review</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-600">✅</span>
              <span>Real-time notifications</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-600">✅</span>
              <span>Responsive design</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App

