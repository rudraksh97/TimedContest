from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Enum as SQLEnum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from database import Base
import uuid
from datetime import datetime
import enum

class Difficulty(str, enum.Enum):
    EASY = "Easy"
    MEDIUM = "Medium"
    HARD = "Hard"

class AttemptStatus(str, enum.Enum):
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    ABANDONED = "abandoned"

class Language(str, enum.Enum):
    PYTHON = "python"
    JAVA = "java"
    CPP = "cpp"
    JAVASCRIPT = "javascript"
    GO = "go"
    C = "c"

class Question(Base):
    __tablename__ = "questions"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    difficulty = Column(SQLEnum(Difficulty), nullable=False)
    category = Column(String(100), nullable=False)
    neetcode_number = Column(Integer, unique=True, nullable=False)
    python_template = Column(Text)
    java_template = Column(Text)
    cpp_template = Column(Text)
    javascript_template = Column(Text)
    go_template = Column(Text)
    c_template = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)

class Contest(Base):
    __tablename__ = "contests"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    question1_id = Column(Integer, ForeignKey("questions.id"))
    question2_id = Column(Integer, ForeignKey("questions.id"))
    question3_id = Column(Integer, ForeignKey("questions.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    
    question1 = relationship("Question", foreign_keys=[question1_id])
    question2 = relationship("Question", foreign_keys=[question2_id])
    question3 = relationship("Question", foreign_keys=[question3_id])

class Attempt(Base):
    __tablename__ = "attempts"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    contest_id = Column(Integer, ForeignKey("contests.id"), nullable=False)
    started_at = Column(DateTime, default=datetime.utcnow)
    completed_at = Column(DateTime)
    duration_seconds = Column(Integer)
    status = Column(SQLEnum(AttemptStatus), default=AttemptStatus.IN_PROGRESS)
    question1_code = Column(Text)
    question1_language = Column(SQLEnum(Language))
    question2_code = Column(Text)
    question2_language = Column(SQLEnum(Language))
    question3_code = Column(Text)
    question3_language = Column(SQLEnum(Language))
    created_at = Column(DateTime, default=datetime.utcnow)
    
    contest = relationship("Contest")

