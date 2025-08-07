-- Database initialization script
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create tables
CREATE TABLE IF NOT EXISTS questions (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    difficulty VARCHAR(20) NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
    category VARCHAR(100) NOT NULL,
    neetcode_number INTEGER UNIQUE NOT NULL,
    python_template TEXT,
    java_template TEXT,
    cpp_template TEXT,
    javascript_template TEXT,
    go_template TEXT,
    c_template TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contests (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    question1_id INTEGER REFERENCES questions(id),
    question2_id INTEGER REFERENCES questions(id),
    question3_id INTEGER REFERENCES questions(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contest_id INTEGER REFERENCES contests(id),
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    duration_seconds INTEGER,
    status VARCHAR(20) DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'abandoned')),
    question1_code TEXT,
    question1_language VARCHAR(20) CHECK (question1_language IN ('python', 'java', 'cpp', 'javascript', 'go', 'c')),
    question2_code TEXT,
    question2_language VARCHAR(20) CHECK (question2_language IN ('python', 'java', 'cpp', 'javascript', 'go', 'c')),
    question3_code TEXT,
    question3_language VARCHAR(20) CHECK (question3_language IN ('python', 'java', 'cpp', 'javascript', 'go', 'c')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contests_name ON contests(name);
CREATE INDEX IF NOT EXISTS idx_attempts_contest_id ON attempts(contest_id);
CREATE INDEX IF NOT EXISTS idx_attempts_status ON attempts(status);
CREATE INDEX IF NOT EXISTS idx_questions_difficulty ON questions(difficulty);
CREATE INDEX IF NOT EXISTS idx_questions_neetcode_number ON questions(neetcode_number);

