import React, { useEffect, useState } from 'react'
import { formatTime, getTimerColor, shouldShowNotification } from '../utils/timer'
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
  // Calculate remaining time based on start time if provided, or use stored remaining time
  const calculateRemainingTime = () => {
    // If we have a stored remaining time, use it (this takes priority)
    if (remainingTime !== undefined && remainingTime !== null && remainingTime >= 0) {
      console.log('Using stored remaining time from database:', remainingTime, 'seconds')
      return Math.max(0, remainingTime)
    }
    
    // Only calculate based on start time if no stored remaining time exists
    if (startTime && startTime !== '') {
      try {
        const startDate = new Date(startTime).getTime()
        const now = Date.now()
        const elapsedSeconds = Math.floor((now - startDate) / 1000)
        
        // If startDate is in the future or invalid, return initialTime
        if (elapsedSeconds < 0 || isNaN(elapsedSeconds)) {
          console.log('Invalid start time, using initial time:', initialTime, 'seconds')
          return initialTime
        }
        
        const remaining = Math.max(0, initialTime - elapsedSeconds)
        console.log('Calculated remaining time from start time:', remaining, 'seconds (elapsed:', elapsedSeconds, 'seconds)')
        return remaining
      } catch (error) {
        console.error('Error calculating remaining time from start time:', error)
        return initialTime
      }
    }
    
    console.log('No stored time or start time, using initial time:', initialTime, 'seconds')
    return initialTime
  }

  // Initialize timer state
  const [timerState, setTimerState] = useState<TimerState>(() => {
    const remaining = calculateRemainingTime()
    const newState = {
      timeLeft: remaining,
      isRunning: remaining > 0 && autoStart,
      hasWarned30Min: remaining <= 1800, // 30 minutes - already warned if time is <= 30 min
      hasWarned5Min: remaining <= 300,   // 5 minutes - already warned if time is <= 5 min
    }
    console.log('Initialized timer state:', newState)
    return newState
  })

  const [notification, setNotification] = useState<string | null>(null)

  // Update timer state when remainingTime prop changes (e.g., after refresh)
  useEffect(() => {
    if (remainingTime !== undefined && remainingTime !== null) {
      const newTimeLeft = Math.max(0, remainingTime)
      setTimerState(prev => {
        // Only update if the time has actually changed
        if (prev.timeLeft !== newTimeLeft) {
          console.log('Updated timer state from remainingTime prop:', newTimeLeft, 'seconds')
          return {
            ...prev,
            timeLeft: newTimeLeft,
            isRunning: newTimeLeft > 0 && autoStart,
            hasWarned30Min: newTimeLeft <= 1800,
            hasWarned5Min: newTimeLeft <= 300,
          }
        }
        return prev
      })
    }
  }, [remainingTime, autoStart])

  // Save remaining time to database when it changes
  useEffect(() => {
    if (onTimeUpdate && timerState.timeLeft >= 0) {
      onTimeUpdate(timerState.timeLeft)
    }
  }, [timerState.timeLeft, onTimeUpdate])

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
    // Ask for confirmation before resetting
    if (!confirm('Are you sure you want to reset the timer? This will reset the remaining time to 1 hour and cannot be undone.')) {
      return
    }
    
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