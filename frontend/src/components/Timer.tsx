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
    let interval: NodeJS.Timeout | null = null

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
    <div className="card">
      {/* Notification */}
      {notification && (
        <div className="px-6 py-3 bg-yellow-500/20 border-b border-yellow-500/30 text-yellow-400 text-sm">
          {notification}
        </div>
      )}
      
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className={`text-2xl font-mono font-bold ${timerColorClass}`}>
                {formatTime(timerState.timeLeft)}
              </div>
              <div className="text-sm text-hackerrank-textSecondary">
                {timerState.timeLeft <= 0 ? 'Time\'s up!' : 'remaining'}
              </div>
            </div>
            
            {/* Progress indicator */}
            <div className="flex items-center space-x-2">
              <div className="w-32 bg-hackerrank-border rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-1000 ${
                    timerState.timeLeft <= 300 
                      ? 'bg-red-500' 
                      : timerState.timeLeft <= 1800 
                      ? 'bg-yellow-500' 
                      : 'bg-hackerrank-green'
                  }`}
                  style={{
                    width: `${progressPercentage}%`
                  }}
                />
              </div>
              <span className="text-xs text-hackerrank-textSecondary min-w-0">
                {Math.round(progressPercentage)}%
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleTimer}
              disabled={timerState.timeLeft <= 0}
              className="btn btn-secondary btn-sm"
            >
              {timerState.isRunning ? 'Pause' : 'Resume'}
            </button>
            
            <button
              onClick={resetTimer}
              className="btn btn-secondary btn-sm"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}