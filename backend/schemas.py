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
    go_template: Optional[str] = None
    c_template: Optional[str] = None

# Clean question schema without difficulty/category for API responses
class QuestionClean(BaseModel):
    id: int
    title: str
    description: str
    neetcode_number: int
    python_template: Optional[str] = None
    java_template: Optional[str] = None
    cpp_template: Optional[str] = None
    javascript_template: Optional[str] = None
    go_template: Optional[str] = None
    c_template: Optional[str] = None
    created_at: datetime
    
    class Config:
        from_attributes = True

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

# Clean contest schema without difficulty/category for API responses
class ContestClean(BaseModel):
    id: int
    name: str
    question1_id: int
    question2_id: int
    question3_id: int
    created_at: datetime
    question1: Optional[QuestionClean] = None
    question2: Optional[QuestionClean] = None
    question3: Optional[QuestionClean] = None
    
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
    remaining_time_seconds: Optional[int] = None
    started_at: Optional[datetime] = None

class Attempt(AttemptBase):
    id: uuid.UUID
    started_at: datetime
    completed_at: Optional[datetime] = None
    duration_seconds: Optional[int] = None
    remaining_time_seconds: Optional[int] = None
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
    go: Optional[str] = None
    c: Optional[str] = None

