from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session, joinedload
from typing import List, Optional
from datetime import datetime, timedelta
import uuid

from database import get_db, engine
from models import Base, Question, Contest, Attempt, AttemptStatus, Language
import schemas

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Timed Contest API", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://frontend:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Timed Contest API is running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.utcnow()}

# Contest endpoints
@app.get("/contests", response_model=List[schemas.ContestSummary])
async def get_contests(db: Session = Depends(get_db)):
    """Get all contests with attempt status"""
    contests = db.query(Contest).all()
    
    contest_summaries = []
    for contest in contests:
        # Check if there are any attempts for this contest
        attempts = db.query(Attempt).filter(Attempt.contest_id == contest.id).all()
        has_attempts = len(attempts) > 0
        last_attempt_status = None
        
        if attempts:
            # Get the most recent attempt
            latest_attempt = max(attempts, key=lambda x: x.started_at)
            last_attempt_status = latest_attempt.status
        
        contest_summary = schemas.ContestSummary(
            id=contest.id,
            name=contest.name,
            has_attempts=has_attempts,
            last_attempt_status=last_attempt_status
        )
        contest_summaries.append(contest_summary)
    
    return contest_summaries

@app.get("/contests/{contest_id}", response_model=schemas.ContestClean)
async def get_contest(contest_id: int, db: Session = Depends(get_db)):
    """Get a specific contest with all questions"""
    contest = db.query(Contest).options(
        joinedload(Contest.question1),
        joinedload(Contest.question2),
        joinedload(Contest.question3)
    ).filter(Contest.id == contest_id).first()
    
    if not contest:
        raise HTTPException(status_code=404, detail="Contest not found")
    
    return contest

@app.get("/contests/{contest_id}/templates")
async def get_contest_templates(contest_id: int, db: Session = Depends(get_db)):
    """Get template code for all questions in a contest"""
    contest = db.query(Contest).options(
        joinedload(Contest.question1),
        joinedload(Contest.question2),
        joinedload(Contest.question3)
    ).filter(Contest.id == contest_id).first()
    
    if not contest:
        raise HTTPException(status_code=404, detail="Contest not found")
    
    return {
        "question1": {
            "id": contest.question1.id,
            "title": contest.question1.title,
            "templates": {
                "python": contest.question1.python_template,
                "java": contest.question1.java_template,
                "cpp": contest.question1.cpp_template,
                "javascript": contest.question1.javascript_template
            }
        },
        "question2": {
            "id": contest.question2.id,
            "title": contest.question2.title,
            "templates": {
                "python": contest.question2.python_template,
                "java": contest.question2.java_template,
                "cpp": contest.question2.cpp_template,
                "javascript": contest.question2.javascript_template
            }
        },
        "question3": {
            "id": contest.question3.id,
            "title": contest.question3.title,
            "templates": {
                "python": contest.question3.python_template,
                "java": contest.question3.java_template,
                "cpp": contest.question3.cpp_template,
                "javascript": contest.question3.javascript_template
            }
        }
    }

# Attempt endpoints
@app.post("/attempts", response_model=schemas.Attempt)
async def create_attempt(attempt: schemas.AttemptCreate, db: Session = Depends(get_db)):
    """Start a new contest attempt"""
    # Check if contest exists
    contest = db.query(Contest).filter(Contest.id == attempt.contest_id).first()
    if not contest:
        raise HTTPException(status_code=404, detail="Contest not found")
    
    db_attempt = Attempt(
        contest_id=attempt.contest_id,
        status=AttemptStatus.IN_PROGRESS
    )
    db.add(db_attempt)
    db.commit()
    db.refresh(db_attempt)
    
    return db_attempt

@app.get("/attempts/{attempt_id}", response_model=schemas.Attempt)
async def get_attempt(attempt_id: str, db: Session = Depends(get_db)):
    """Get a specific attempt"""
    try:
        attempt_uuid = uuid.UUID(attempt_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid attempt ID format")
    
    attempt = db.query(Attempt).options(
        joinedload(Attempt.contest)
    ).filter(Attempt.id == attempt_uuid).first()
    
    if not attempt:
        raise HTTPException(status_code=404, detail="Attempt not found")
    
    return attempt

@app.put("/attempts/{attempt_id}", response_model=schemas.Attempt)
async def update_attempt(
    attempt_id: str, 
    attempt_update: schemas.AttemptUpdate, 
    db: Session = Depends(get_db)
):
    """Update an attempt with code submissions"""
    try:
        attempt_uuid = uuid.UUID(attempt_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid attempt ID format")
    
    attempt = db.query(Attempt).filter(Attempt.id == attempt_uuid).first()
    if not attempt:
        raise HTTPException(status_code=404, detail="Attempt not found")
    
    # Update fields if provided
    for field, value in attempt_update.dict(exclude_unset=True).items():
        setattr(attempt, field, value)
    
    # If completing the attempt, set completion time and calculate duration
    if attempt_update.status == AttemptStatus.COMPLETED and not attempt.completed_at:
        attempt.completed_at = datetime.utcnow()
        duration = attempt.completed_at - attempt.started_at
        attempt.duration_seconds = int(duration.total_seconds())
    
    db.commit()
    db.refresh(attempt)
    
    return attempt

@app.get("/attempts", response_model=List[schemas.Attempt])
async def get_attempts(
    contest_id: Optional[int] = None,
    status: Optional[AttemptStatus] = None,
    limit: int = 50,
    db: Session = Depends(get_db)
):
    """Get attempts with optional filtering"""
    query = db.query(Attempt).options(joinedload(Attempt.contest))
    
    if contest_id:
        query = query.filter(Attempt.contest_id == contest_id)
    
    if status:
        query = query.filter(Attempt.status == status)
    
    attempts = query.order_by(Attempt.started_at.desc()).limit(limit).all()
    return attempts

@app.delete("/attempts/{attempt_id}")
async def delete_attempt(attempt_id: str, db: Session = Depends(get_db)):
    """Delete an attempt"""
    try:
        attempt_uuid = uuid.UUID(attempt_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid attempt ID format")
    
    attempt = db.query(Attempt).filter(Attempt.id == attempt_uuid).first()
    if not attempt:
        raise HTTPException(status_code=404, detail="Attempt not found")
    
    db.delete(attempt)
    db.commit()
    
    return {"message": "Attempt deleted successfully"}

@app.get("/contests/{contest_id}/attempts", response_model=List[schemas.Attempt])
async def get_contest_attempts(contest_id: int, db: Session = Depends(get_db)):
    """Get all attempts for a specific contest"""
    contest = db.query(Contest).filter(Contest.id == contest_id).first()
    if not contest:
        raise HTTPException(status_code=404, detail="Contest not found")
    
    attempts = db.query(Attempt).options(
        joinedload(Attempt.contest)
    ).filter(Attempt.contest_id == contest_id).order_by(Attempt.started_at.desc()).all()
    
    return attempts

# Question endpoints (for reference)
@app.get("/questions/{question_id}", response_model=schemas.QuestionClean)
async def get_question(question_id: int, db: Session = Depends(get_db)):
    """Get a specific question"""
    question = db.query(Question).filter(Question.id == question_id).first()
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")
    
    return question

@app.get("/questions", response_model=List[schemas.QuestionClean])
async def get_questions(
    category: Optional[str] = None,
    difficulty: Optional[str] = None,
    limit: int = 150,
    db: Session = Depends(get_db)
):
    """Get questions with optional filtering"""
    query = db.query(Question)
    
    if category:
        query = query.filter(Question.category == category)
    
    if difficulty:
        query = query.filter(Question.difficulty == difficulty)
    
    questions = query.order_by(Question.neetcode_number).limit(limit).all()
    return questions

# Stats endpoints
@app.get("/stats/overview")
async def get_stats_overview(db: Session = Depends(get_db)):
    """Get overall statistics"""
    total_contests = db.query(Contest).count()
    total_attempts = db.query(Attempt).count()
    completed_attempts = db.query(Attempt).filter(Attempt.status == AttemptStatus.COMPLETED).count()
    in_progress_attempts = db.query(Attempt).filter(Attempt.status == AttemptStatus.IN_PROGRESS).count()
    
    return {
        "total_contests": total_contests,
        "total_attempts": total_attempts,
        "completed_attempts": completed_attempts,
        "in_progress_attempts": in_progress_attempts,
        "completion_rate": completed_attempts / total_attempts if total_attempts > 0 else 0
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

