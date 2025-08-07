-- Migration script to add remaining_time_seconds field
-- Run this script to add the new remaining_time_seconds column to existing attempts table

-- Add new column to attempts table
ALTER TABLE attempts ADD COLUMN IF NOT EXISTS remaining_time_seconds INTEGER DEFAULT 3600;

-- Update existing attempts to have the default remaining time
-- For completed attempts, set remaining_time_seconds to 0
UPDATE attempts SET remaining_time_seconds = 0 WHERE status = 'COMPLETED';

-- For in_progress attempts, calculate remaining time based on started_at
UPDATE attempts 
SET remaining_time_seconds = GREATEST(0, 3600 - EXTRACT(EPOCH FROM (NOW() - started_at))::INTEGER)
WHERE status = 'IN_PROGRESS' AND remaining_time_seconds = 3600;
