import { Routes, Route } from 'react-router-dom'
import { Navigation } from './components/Navigation'
import { ContestList } from './pages/ContestList'
import { ContestDetails } from './pages/ContestDetails'
import { ContestAttempt } from './pages/ContestAttempt'
import { AttemptHistory } from './pages/AttemptHistory'
import { AttemptReview } from './pages/AttemptReview'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<ContestList />} />
          <Route path="/contest/:id" element={<ContestDetails />} />
          <Route path="/contest/:id/attempt/:attemptId" element={<ContestAttempt />} />
          <Route path="/history" element={<AttemptHistory />} />
          <Route path="/attempt/:attemptId/review" element={<AttemptReview />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
