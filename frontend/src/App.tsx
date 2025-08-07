
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navigation } from './components/Navigation'
import { ContestList } from './pages/ContestList'
import { ContestDetails } from './pages/ContestDetails'
import { ContestAttempt } from './pages/ContestAttempt'
import { AttemptHistory } from './pages/AttemptHistory'
import { AttemptReview } from './pages/AttemptReview'

function App() {
  return (
    <Router>
      <div className="min-h-screen gradient-bg">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<ContestList />} />
            <Route path="/contest/:id" element={<ContestDetails />} />
            <Route path="/contest/:id/attempt/:attemptId" element={<ContestAttempt />} />
            <Route path="/history" element={<AttemptHistory />} />
            <Route path="/attempt/:attemptId/review" element={<AttemptReview />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App