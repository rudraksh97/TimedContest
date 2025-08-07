import React, { useState, useEffect } from 'react'
import { formatTime, getTimerColor } from '../utils/timer'
import { ConfirmationModal } from './ConfirmationModal'
import { TimerState } from '../types'

interface TimerProps {
  initialTime?: number // in seconds, defaults to 1 hour
  startTime?: string // ISO string of when the timer should start from
  remainingTime?: number // remaining time from database
  onTimeUp?: () => void
  onWarning?: (type: '30min' | '5min') => void
  onTimeUpdate?: (remainingTime: number) => void // callback to save remaining time
  autoStart?: boolean
}

export const Timer: React.FC<TimerProps> = ({ 
  initialTime = 3600, 
  startTime,
  remainingTime,
  onTimeUp, 
  onWarning,
  onTimeUpdate,
  autoStart = true 
}) => {
  const [timerState, setTimerState] = useState<TimerState>({
    timeLeft: remainingTime || initialTime,
    isRunning: autoStart,
    hasWarned30Min: false,
    hasWarned5Min: false,
  })
  const [notification, setNotification] = useState<string>('')
  const [resetModal, setResetModal] = useState(false)

  const calculateRemainingTime = () => {
    if (remainingTime !== undefined) {
      return remainingTime
    }
    
    if (startTime) {
      const startDate = new Date(startTime)
      const now = new Date()
      const elapsedSeconds = Math.floor((now.getTime() - startDate.getTime()) / 1000)
      const remaining = Math.max(0, initialTime - elapsedSeconds)
      return remaining
    }
    
    return initialTime
  }

  useEffect(() => {
    const calculatedTime = calculateRemainingTime()
    setTimerState(prev => ({ ...prev, timeLeft: calculatedTime }))
  }, [startTime, remainingTime, initialTime])

  useEffect(() => {
    let interval: number | null = null

    if (timerState.isRunning && timerState.timeLeft > 0) {
      interval = setInterval(() => {
        setTimerState(prev => {
          const newTimeLeft = prev.timeLeft - 1
          
          // Check for warnings
          if (newTimeLeft === 1800 && !prev.hasWarned30Min) {
            setNotification('⏰ Half time elapsed - 30 minutes remaining!')
            setTimeout(() => setNotification(''), 5000)
            onWarning?.('30min')
            return { ...prev, timeLeft: newTimeLeft, hasWarned30Min: true }
          }
          
          if (newTimeLeft === 300 && !prev.hasWarned5Min) {
            setNotification('⏰ Only 5 minutes remaining!')
            setTimeout(() => setNotification(''), 5000)
            onWarning?.('5min')
            return { ...prev, timeLeft: newTimeLeft, hasWarned5Min: true }
          }
          
          return { ...prev, timeLeft: newTimeLeft }
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
    setResetModal(true)
  }

  const confirmReset = () => {
    const newState = {
      timeLeft: initialTime, // Always reset to initial time (3600 seconds)
      isRunning: false,
      hasWarned30Min: false,
      hasWarned5Min: false,
    }
    setTimerState(newState)
    console.log('Timer reset to initial time:', initialTime, 'seconds')
    
    // Update the database with the new remaining time
    if (onTimeUpdate) {
      onTimeUpdate(initialTime)
    }
  }

  const timerColorClass = getTimerColor(timerState.timeLeft)
  const progressPercentage = (timerState.timeLeft / initialTime) * 100

  return (
    <>
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

      <ConfirmationModal
        isOpen={resetModal}
        onClose={() => setResetModal(false)}
        onConfirm={confirmReset}
        title="Reset Timer"
        message="Are you sure you want to reset the timer? This will reset the remaining time to 1 hour and cannot be undone."
        confirmText="Reset"
        cancelText="Cancel"
        confirmButtonClass="btn btn-warning"
      />
    </>
  )
}