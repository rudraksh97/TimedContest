from sqlalchemy.orm import Session
from database import SessionLocal, engine
from models import Base, Question, Contest, Difficulty
from neetcode_questions import NEETCODE_QUESTIONS, get_template_for_question
import random

def create_tables():
    Base.metadata.create_all(bind=engine)

def seed_questions(db: Session):
    """Seed the database with Neetcode 150 questions"""
    
    # Check if questions already exist
    existing_count = db.query(Question).count()
    if existing_count > 0:
        print(f"Database already has {existing_count} questions. Skipping seed.")
        return
    
    for q_data in NEETCODE_QUESTIONS:
        # Get templates for all languages
        python_template = get_template_for_question(q_data["title"], "python")
        java_template = get_template_for_question(q_data["title"], "java")
        cpp_template = get_template_for_question(q_data["title"], "cpp")
        javascript_template = get_template_for_question(q_data["title"], "javascript")
        
        question = Question(
            title=q_data["title"],
            description=q_data["description"],
            difficulty=q_data["difficulty"],
            category=q_data["category"],
            neetcode_number=q_data["neetcode_number"],
            python_template=python_template,
            java_template=java_template,
            cpp_template=cpp_template,
            javascript_template=javascript_template
        )
        db.add(question)
    
    db.commit()
    print(f"Seeded {len(NEETCODE_QUESTIONS)} questions")

def create_balanced_contests(db: Session):
    """Create 50 balanced contests from the questions"""
    
    # Check if contests already exist
    existing_count = db.query(Contest).count()
    if existing_count > 0:
        print(f"Database already has {existing_count} contests. Skipping contest creation.")
        return
    
    questions = db.query(Question).all()
    if len(questions) < 150:
        print("Not enough questions to create contests")
        return
    
    # Group questions by difficulty
    easy_questions = [q for q in questions if q.difficulty == Difficulty.EASY]
    medium_questions = [q for q in questions if q.difficulty == Difficulty.MEDIUM]
    hard_questions = [q for q in questions if q.difficulty == Difficulty.HARD]
    
    # Shuffle for randomness
    random.shuffle(easy_questions)
    random.shuffle(medium_questions)
    random.shuffle(hard_questions)
    
    contests_created = 0
    easy_idx = 0
    medium_idx = 0
    hard_idx = 0
    
    # Create 50 contests with balanced difficulty
    for i in range(50):
        contest_questions = []
        
        # Strategy: Mix difficulties for balanced contests
        # Pattern: Easy, Medium, Hard for most contests
        # Some variations: Easy, Easy, Medium or Medium, Medium, Hard
        
        if i % 5 == 0 and easy_idx + 1 < len(easy_questions):
            # Every 5th contest: 2 Easy, 1 Medium
            contest_questions = [
                easy_questions[easy_idx],
                easy_questions[easy_idx + 1],
                medium_questions[medium_idx] if medium_idx < len(medium_questions) else easy_questions[easy_idx + 2]
            ]
            easy_idx += 2
            medium_idx += 1
        elif i % 7 == 0 and medium_idx + 1 < len(medium_questions):
            # Every 7th contest: 2 Medium, 1 Hard
            contest_questions = [
                medium_questions[medium_idx],
                medium_questions[medium_idx + 1],
                hard_questions[hard_idx] if hard_idx < len(hard_questions) else medium_questions[medium_idx + 2]
            ]
            medium_idx += 2
            hard_idx += 1
        else:
            # Standard: 1 Easy, 1 Medium, 1 Hard
            contest_questions = [
                easy_questions[easy_idx] if easy_idx < len(easy_questions) else medium_questions[medium_idx],
                medium_questions[medium_idx] if medium_idx < len(medium_questions) else hard_questions[hard_idx],
                hard_questions[hard_idx] if hard_idx < len(hard_questions) else easy_questions[easy_idx + 1]
            ]
            easy_idx += 1
            medium_idx += 1
            hard_idx += 1
        
        # Ensure we have 3 questions
        while len(contest_questions) < 3:
            if easy_idx < len(easy_questions):
                contest_questions.append(easy_questions[easy_idx])
                easy_idx += 1
            elif medium_idx < len(medium_questions):
                contest_questions.append(medium_questions[medium_idx])
                medium_idx += 1
            elif hard_idx < len(hard_questions):
                contest_questions.append(hard_questions[hard_idx])
                hard_idx += 1
            else:
                break
        
        if len(contest_questions) == 3:
            contest = Contest(
                name=f"Contest {i + 1}",
                question1_id=contest_questions[0].id,
                question2_id=contest_questions[1].id,
                question3_id=contest_questions[2].id
            )
            db.add(contest)
            contests_created += 1
    
    db.commit()
    print(f"Created {contests_created} balanced contests")

def seed_database():
    """Main function to seed the entire database"""
    db = SessionLocal()
    try:
        create_tables()
        seed_questions(db)
        create_balanced_contests(db)
        print("Database seeding completed successfully!")
    except Exception as e:
        print(f"Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
