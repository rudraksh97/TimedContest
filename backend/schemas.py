from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from models import Difficulty, AttemptStatus, Language
import uuid

class QuestionBase(BaseModel):
    title: str
    description: str
    difficulty: Difficulty
    category: str
    neetcode_number: int
    python_template: Optional[str] = None
    java_template: Optional[str] = None
    cpp_template: Optional[str] = None
    javascript_template: Optional[str] = None

class QuestionCreate(QuestionBase):
    pass

class Question(QuestionBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class ContestBase(BaseModel):
    name: str
    question1_id: int
    question2_id: int
    question3_id: int

class ContestCreate(ContestBase):
    pass

class Contest(ContestBase):
    id: int
    created_at: datetime
    question1: Optional[Question] = None
    question2: Optional[Question] = None
    question3: Optional[Question] = None
    
    class Config:
        from_attributes = True

class ContestSummary(BaseModel):
    id: int
    name: str
    has_attempts: bool = False
    last_attempt_status: Optional[AttemptStatus] = None
    
    class Config:
        from_attributes = True

class AttemptBase(BaseModel):
    contest_id: int
    question1_code: Optional[str] = None
    question1_language: Optional[Language] = None
    question2_code: Optional[str] = None
    question2_language: Optional[Language] = None
    question3_code: Optional[str] = None
    question3_language: Optional[Language] = None

class AttemptCreate(AttemptBase):
    pass

class AttemptUpdate(BaseModel):
    question1_code: Optional[str] = None
    question1_language: Optional[Language] = None
    question2_code: Optional[str] = None
    question2_language: Optional[Language] = None
    question3_code: Optional[str] = None
    question3_language: Optional[Language] = None
    status: Optional[AttemptStatus] = None
    completed_at: Optional[datetime] = None
    duration_seconds: Optional[int] = None

class Attempt(AttemptBase):
    id: uuid.UUID
    started_at: datetime
    completed_at: Optional[datetime] = None
    duration_seconds: Optional[int] = None
    status: AttemptStatus
    created_at: datetime
    contest: Optional[Contest] = None
    
    class Config:
        from_attributes = True

class TemplateResponse(BaseModel):
    python: Optional[str] = None
    java: Optional[str] = None
    cpp: Optional[str] = None
    javascript: Optional[str] = None

