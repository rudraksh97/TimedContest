import { Link } from 'react-router-dom'
import { PlayCircle, CheckCircle, Clock, RotateCcw } from 'lucide-react'
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
      case 'abandoned':
        return <RotateCcw className="w-5 h-5 text-meta-textSecondary" />
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
    <div className="card meta-card-hover gradient-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-meta-text">{contest.name}</h3>
        {getStatusIcon()}
      </div>
      
      <div className="flex items-center justify-between mb-6">
        {getStatusBadge()}
        <span className="text-sm text-meta-textSecondary font-medium">3 Questions • 1 Hour</span>
      </div>
      
      <div className="flex space-x-3">
        <Link
          to={`/contest/${contest.id}`}
          className="btn btn-primary flex-1 text-center"
        >
          {contest.has_attempts ? 'View Contest' : 'Start Contest'}
        </Link>
        
        {contest.has_attempts && (
          <Link
            to={`/contest/${contest.id}`}
            className="btn btn-secondary"
          >
            History
          </Link>
        )}
      </div>
    </div>
  )
}

