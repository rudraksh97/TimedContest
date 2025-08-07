import React, { useEffect, useState } from 'react'
import { formatTime, getTimerColor, shouldShowNotification } from '../utils/timer'
import { TimerState } from '../types'

interface TimerProps {
  initialTime?: number // in seconds, defaults to 1 hour
  onTimeUp?: () => void
  onWarning?: (type: '30min' | '5min') => void
  autoStart?: boolean
}

export const Timer: React.FC<TimerProps> = ({ 
  initialTime = 3600, 
  onTimeUp, 
  onWarning,
  autoStart = true 
}) => {
  const [timerState, setTimerState] = useState<TimerState>({
    timeLeft: initialTime,
    isRunning: autoStart,
    hasWarned30Min: false,
    hasWarned5Min: false,
  })

  const [notification, setNotification] = useState<string | null>(null)

  useEffect(() => {
    let interval: number | null = null

    if (timerState.isRunning && timerState.timeLeft > 0) {
      interval = setInterval(() => {
        setTimerState(prev => {
          const newTimeLeft = prev.timeLeft - 1
          
          // Check for notifications
          const notificationCheck = shouldShowNotification(
            newTimeLeft, 
            prev.hasWarned30Min, 
            prev.hasWarned5Min
          )
          
          if (notificationCheck.show) {
            setNotification(notificationCheck.message)
            setTimeout(() => setNotification(null), 5000)
            onWarning?.(notificationCheck.type!)
          }
          
          return {
            ...prev,
            timeLeft: newTimeLeft,
            hasWarned30Min: prev.hasWarned30Min || notificationCheck.type === '30min',
            hasWarned5Min: prev.hasWarned5Min || notificationCheck.type === '5min',
          }
        })
      }, 1000)
    } else if (timerState.timeLeft <= 0) {
      setTimerState(prev => ({ ...prev, isRunning: false }))
      onTimeUp?.()
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [timerState.isRunning, timerState.timeLeft, timerState.hasWarned30Min, timerState.hasWarned5Min, onTimeUp, onWarning])

  const toggleTimer = () => {
    setTimerState(prev => ({ ...prev, isRunning: !prev.isRunning }))
  }

  const resetTimer = () => {
    setTimerState({
      timeLeft: initialTime,
      isRunning: false,
      hasWarned30Min: false,
      hasWarned5Min: false,
    })
  }

  const timerColorClass = getTimerColor(timerState.timeLeft)
  const progressPercentage = (timerState.timeLeft / initialTime) * 100

  return (
    <div className="flex items-center space-x-4">
      {/* Notification */}
      {notification && (
        <div className="glass rounded-lg px-3 py-1 text-yellow-600 text-sm font-medium">
          {notification}
        </div>
      )}
      
      {/* Timer Display - HackerRank Style */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <div className={`text-lg font-mono font-bold ${timerColorClass}`}>
            {formatTime(timerState.timeLeft)}
          </div>
          <div className="text-xs text-meta-textSecondary">
            {timerState.timeLeft <= 0 ? 'Time\'s up!' : 'remaining'}
          </div>
        </div>
        
        {/* Compact Progress Bar */}
        <div className="flex items-center space-x-2">
          <div className="w-20 bg-meta-border rounded-full h-1 overflow-hidden">
            <div
              className={`h-1 rounded-full transition-all duration-1000 ${
                timerState.timeLeft <= 300 
                  ? 'bg-red-500' 
                  : timerState.timeLeft <= 1800 
                  ? 'bg-yellow-500' 
                  : 'bg-green-500'
              }`}
              style={{
                width: `${progressPercentage}%`
              }}
            />
          </div>
        </div>
        
        {/* Compact Controls */}
        <div className="flex items-center space-x-1">
          <button
            onClick={toggleTimer}
            disabled={timerState.timeLeft <= 0}
            className="glass rounded px-2 py-1 text-xs font-medium text-meta-textSecondary hover:text-meta-text transition-colors"
          >
            {timerState.isRunning ? 'Pause' : 'Resume'}
          </button>
          
          <button
            onClick={resetTimer}
            className="glass rounded px-2 py-1 text-xs font-medium text-meta-textSecondary hover:text-meta-text transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}