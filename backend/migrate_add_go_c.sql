-- Migration script to add Go and C support
-- Run this script to add the new template columns to existing questions table

-- First, add new values to the language enum
ALTER TYPE language ADD VALUE IF NOT EXISTS 'go';
ALTER TYPE language ADD VALUE IF NOT EXISTS 'c';

-- Add new template columns to questions table
ALTER TABLE questions ADD COLUMN IF NOT EXISTS go_template TEXT;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS c_template TEXT;

-- Update the attempts table to support new languages
-- First, drop existing constraints if they exist
ALTER TABLE attempts DROP CONSTRAINT IF EXISTS attempts_question1_language_check;
ALTER TABLE attempts DROP CONSTRAINT IF EXISTS attempts_question2_language_check;
ALTER TABLE attempts DROP CONSTRAINT IF EXISTS attempts_question3_language_check;

-- Add new constraints with updated language list
ALTER TABLE attempts ADD CONSTRAINT attempts_question1_language_check 
    CHECK (question1_language IN ('python', 'java', 'cpp', 'javascript', 'go', 'c'));

ALTER TABLE attempts ADD CONSTRAINT attempts_question2_language_check 
    CHECK (question2_language IN ('python', 'java', 'cpp', 'javascript', 'go', 'c'));

ALTER TABLE attempts ADD CONSTRAINT attempts_question3_language_check 
    CHECK (question3_language IN ('python', 'java', 'cpp', 'javascript', 'go', 'c'));
