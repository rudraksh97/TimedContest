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
      return <PlayCircle className="w-5 h-5 text-gray-400" />
    }
    
    switch (contest.last_attempt_status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'in_progress':
        return <Clock className="w-5 h-5 text-blue-600" />
      case 'abandoned':
        return <RotateCcw className="w-5 h-5 text-gray-600" />
      default:
        return <PlayCircle className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusBadge = () => {
    if (!contest.has_attempts) {
      return (
        <span className="px-2 py-1 rounded text-xs font-medium border text-gray-600 bg-gray-50 border-gray-200">
          Not Attempted
        </span>
      )
    }

    const status = contest.last_attempt_status!
    const colorClass = statusColors[status]
    
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium border ${colorClass}`}>
        {getStatusText(status)}
      </span>
    )
  }

  return (
    <div className="card hover:shadow-md transition-all">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900">{contest.name}</h3>
        {getStatusIcon()}
      </div>
      
      <div className="flex items-center justify-between mb-6">
        {getStatusBadge()}
        <span className="text-sm text-gray-500">3 Questions • 1 Hour</span>
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

