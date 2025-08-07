import React, { useEffect, useState, useRef } from 'react'
import { formatTime, getTimerColor, shouldShowNotification } from '../utils/timer'
import { TimerState } from '../types'

interface TimerProps {
  initialTime?: number // in seconds, defaults to 1 hour
  startTime?: string // ISO string of when the timer should start from
  onTimeUp?: () => void
  onWarning?: (type: '30min' | '5min') => void
  autoStart?: boolean
}

export const Timer: React.FC<TimerProps> = ({ 
  initialTime = 3600, 
  startTime,
  onTimeUp, 
  onWarning,
  autoStart = true 
}) => {
  // Generate a unique key for localStorage based on startTime
  const getStorageKey = () => {
    if (!startTime) return null
    // Create a stable key by using the startTime directly
    const key = `timer_${startTime.replace(/[:.]/g, '_')}`
    console.log('Generated storage key:', key, 'for startTime:', startTime)
    return key
  }

  // Calculate remaining time based on start time if provided
  const calculateRemainingTime = () => {
    if (startTime && startTime !== '') {
      try {
        const startDate = new Date(startTime).getTime()
        const now = Date.now()
        const elapsedSeconds = Math.floor((now - startDate) / 1000)
        
        // If startDate is in the future or invalid, return initialTime
        if (elapsedSeconds < 0 || isNaN(elapsedSeconds)) {
          return initialTime
        }
        
        const remaining = Math.max(0, initialTime - elapsedSeconds)
        console.log('Calculated remaining time:', remaining, 'seconds')
        return remaining
      } catch (error) {
        // If there's any error parsing the date, return initialTime
        return initialTime
      }
    }
    return initialTime
  }

  // Load timer state from localStorage
  const loadTimerState = (): TimerState | null => {
    const key = getStorageKey()
    if (!key) return null
    
    try {
      const stored = localStorage.getItem(key)
      if (stored) {
        const parsed = JSON.parse(stored)
        // Check if the stored state is still valid (not expired)
        if (parsed.timeLeft > 0) {
          console.log('Loaded timer state from localStorage:', parsed)
          return parsed
        }
      }
    } catch (error) {
      console.error('Error loading timer state from localStorage:', error)
    }
    return null
  }

  // Save timer state to localStorage
  const saveTimerState = (state: TimerState) => {
    const key = getStorageKey()
    if (!key) return
    
    try {
      localStorage.setItem(key, JSON.stringify(state))
      console.log('Saved timer state to localStorage:', state)
    } catch (error) {
      console.error('Error saving timer state to localStorage:', error)
    }
  }

  // Initialize timer state
  const [timerState, setTimerState] = useState<TimerState>(() => {
    console.log('Initializing timer with startTime:', startTime)
    
    // Try to load from localStorage first
    const storedState = loadTimerState()
    if (storedState) {
      // Use stored state but recalculate timeLeft to account for time passed
      const currentTimeLeft = calculateRemainingTime()
      const newState = {
        ...storedState,
        timeLeft: currentTimeLeft,
        isRunning: currentTimeLeft > 0 && storedState.isRunning
      }
      console.log('Restored timer state:', newState)
      return newState
    }
    
    // No stored state, initialize with calculated time
    const remaining = calculateRemainingTime()
    const newState = {
      timeLeft: remaining,
      isRunning: remaining > 0 && autoStart,
      hasWarned30Min: false,
      hasWarned5Min: false,
    }
    console.log('Initialized new timer state:', newState)
    return newState
  })

  const [notification, setNotification] = useState<string | null>(null)
  const isInitialized = useRef(false)

  // Save timer state whenever it changes
  useEffect(() => {
    if (isInitialized.current) {
      console.log('Saving timer state:', timerState)
      saveTimerState(timerState)
    }
  }, [timerState])

  // Mark as initialized after first render
  useEffect(() => {
    isInitialized.current = true
    console.log('Timer initialized')
  }, [])

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
    const newState = {
      timeLeft: calculateRemainingTime(),
      isRunning: false,
      hasWarned30Min: false,
      hasWarned5Min: false,
    }
    setTimerState(newState)
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