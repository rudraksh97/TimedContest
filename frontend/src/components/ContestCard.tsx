import { Link } from 'react-router-dom'
import { PlayCircle, CheckCircle, Clock } from 'lucide-react'
import { ContestSummary } from '../types'
import { statusColors, getStatusText } from '../utils/language'

interface ContestCardProps {
  contest: ContestSummary
}

export const ContestCard = ({ contest }: ContestCardProps) => {
  const getStatusIcon = () => {
    if (!contest.has_attempts) {
      return <PlayCircle className="w-5 h-5 text-meta-textSecondary" />
    }
    
    switch (contest.last_attempt_status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-meta-success" />
      case 'in_progress':
        return <Clock className="w-5 h-5 text-meta-success" />
      default:
        return <PlayCircle className="w-5 h-5 text-meta-textSecondary" />
    }
  }

  const getStatusBadge = () => {
    if (!contest.has_attempts) {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-semibold border text-meta-textSecondary bg-meta-lighter border-meta-border">
          Not Attempted
        </span>
      )
    }

    const status = contest.last_attempt_status!
    const colorClass = statusColors[status]
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${colorClass}`}>
        {getStatusText(status)}
      </span>
    )
  }

  return (
    <div className="glass rounded-2xl p-6 hover:bg-white/90 transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-meta-text">{contest.name}</h3>
        {getStatusIcon()}
      </div>
      
      <div className="flex items-center justify-between mb-4">
        {getStatusBadge()}
        <span className="text-sm text-meta-textSecondary">1 Hour</span>
      </div>
      
      <div className="flex space-x-2">
        <Link
          to={`/contest/${contest.id}`}
          className="btn-glass flex-1 text-center"
        >
          {contest.has_attempts ? 'View' : 'Start'}
        </Link>
        
        {contest.has_attempts && (
          <Link
            to={`/contest/${contest.id}`}
            className="glass rounded-lg px-4 py-3 text-sm font-medium text-meta-textSecondary hover:text-meta-text transition-colors"
          >
            History
          </Link>
        )}
      </div>
    </div>
  )
}

