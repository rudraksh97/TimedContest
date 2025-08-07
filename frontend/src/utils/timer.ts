export const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
};

export const getTimerColor = (timeLeft: number): string => {
  const totalTime = 3600; // 1 hour in seconds
  const percentage = timeLeft / totalTime;
  
  if (percentage <= 0.083) { // 5 minutes or less (5/60 = 0.083)
    return 'text-red-500 timer-danger';
  } else if (percentage <= 0.5) { // 30 minutes or less
    return 'text-yellow-500 timer-warning';
  }
  
  return 'text-hackerrank-green';
};

export const shouldShowNotification = (
  timeLeft: number,
  hasWarned30Min: boolean,
  hasWarned5Min: boolean
): { show: boolean; message: string; type: '30min' | '5min' | null } => {
  if (timeLeft <= 300 && !hasWarned5Min) { // 5 minutes
    return {
      show: true,
      message: '⏰ Only 5 minutes remaining!',
      type: '5min'
    };
  }
  
  if (timeLeft <= 1800 && !hasWarned30Min) { // 30 minutes
    return {
      show: true,
      message: '⏰ Half time elapsed - 30 minutes remaining!',
      type: '30min'
    };
  }
  
  return { show: false, message: '', type: null };
};