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
    if existing_count >= 50:
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
    
    print(f"Question distribution: Easy: {len(easy_questions)}, Medium: {len(medium_questions)}, Hard: {len(hard_questions)}")
    
    # Shuffle for randomness
    random.shuffle(easy_questions)
    random.shuffle(medium_questions)
    random.shuffle(hard_questions)
    
    # Create a pool of all questions for round-robin distribution
    all_questions = questions.copy()
    random.shuffle(all_questions)
    
    contests_created = 0
    
    # Create 50 contests with simple round-robin approach
    for i in range(50):
        # Take 3 consecutive questions from the shuffled pool
        start_idx = (i * 3) % len(all_questions)
        contest_questions = []
        
        for j in range(3):
            question_idx = (start_idx + j) % len(all_questions)
            contest_questions.append(all_questions[question_idx])
        
        contest = Contest(
            name=f"Contest {i + 1}",
            question1_id=contest_questions[0].id,
            question2_id=contest_questions[1].id,
            question3_id=contest_questions[2].id
        )
        
        db.add(contest)
        contests_created += 1
    
    db.commit()
    print(f"Created {contests_created} contests")

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
