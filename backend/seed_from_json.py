#!/usr/bin/env python3
"""
Script to seed the database with questions and contests from leetcode_data.json
"""

import json
from typing import Dict, List, Optional
from database import SessionLocal
from models import Question, Contest, Difficulty, Attempt
from sqlalchemy.orm import Session


def add_leetcode_link(title_slug: str) -> str:
    """
    Add LeetCode problem link to the description
    """
    return f"\n\n<strong>LeetCode Problem:</strong> <a href=\"https://leetcode.com/problems/{title_slug}/\" target=\"_blank\">https://leetcode.com/problems/{title_slug}/</a>"

def generate_basic_template(language: str, title: str) -> str:
    """
    Generate basic template code for Go and C when not available in LeetCode data
    """
    if language == "go":
        # Convert title to function name (e.g., "Two Sum" -> "twoSum")
        function_name = "".join(word.lower() if i == 0 else word.title() for i, word in enumerate(title.split()))
        return f"""func {function_name}() {{
    // TODO: Implement your solution here
    return
}}"""
    elif language == "c":
        # Convert title to function name (e.g., "Two Sum" -> "twoSum")
        function_name = "".join(word.lower() if i == 0 else word.title() for i, word in enumerate(title.split()))
        return f"""int* {function_name}() {{
    // TODO: Implement your solution here
    return NULL;
}}"""
    return ""

def extract_code_snippet(code_snippets: List[Dict], language: str) -> Optional[str]:
    """
    Extract code snippet for a specific language
    """
    if not code_snippets:
        return None
    
    # Map our language names to leetcode language slugs
    language_map = {
        "python": "python3",
        "java": "java", 
        "cpp": "cpp",
        "javascript": "javascript",
        "go": "golang",
        "c": "c"
    }
    
    target_lang = language_map.get(language, language)
    
    for snippet in code_snippets:
        if snippet.get("langSlug") == target_lang:
            return snippet.get("code", "")
    
    return None

def seed_questions_from_json(db: Session) -> Dict[str, int]:
    """
    Seed questions from leetcode_data.json
    Returns a mapping of title_slug to question_id
    """
    print("Loading leetcode_data.json...")
    
    try:
        with open('leetcode_data.json', 'r', encoding='utf-8') as f:
            data = json.load(f)
    except FileNotFoundError:
        print("❌ leetcode_data.json not found. Skipping seeding.")
        return {}
    except json.JSONDecodeError as e:
        print(f"❌ Error parsing leetcode_data.json: {e}")
        return {}
    except Exception as e:
        print(f"❌ Error reading leetcode_data.json: {e}")
        return {}
    
    print(f"Found {len(data)} questions in leetcode_data.json")
    
    title_to_id = {}
    question_number = 1
    
    for title_slug, question_data in data.items():
        try:
            # Extract required fields
            title = question_data.get("title", "")
            content = question_data.get("content", "")
            difficulty = question_data.get("difficulty", "Medium")
            code_snippets = question_data.get("codeSnippets", [])
            
            # Clean the content
            description = content if content else ''
            
            # Add LeetCode problem link
            description += add_leetcode_link(title_slug)
            
            # Extract code templates
            python_template = extract_code_snippet(code_snippets, "python")
            java_template = extract_code_snippet(code_snippets, "java")
            cpp_template = extract_code_snippet(code_snippets, "cpp")
            javascript_template = extract_code_snippet(code_snippets, "javascript")
            go_template = extract_code_snippet(code_snippets, "go") or generate_basic_template("go", title)
            c_template = extract_code_snippet(code_snippets, "c") or generate_basic_template("c", title)
            
            # Map difficulty - use string values that match the database constraint
            difficulty_enum = "Medium"
            if difficulty.lower() == "easy":
                difficulty_enum = "Easy"
            elif difficulty.lower() == "hard":
                difficulty_enum = "Hard"
            
            # Create question
            question = Question(
                title=title,
                description=description,
                difficulty=difficulty_enum,
                category="General",  # Default category
                neetcode_number=question_number,
                python_template=python_template,
                java_template=java_template,
                cpp_template=cpp_template,
                javascript_template=javascript_template,
                go_template=go_template,
                c_template=c_template
            )
            
            db.add(question)
            db.flush()  # Get the ID
            
            title_to_id[title_slug] = question.id
            print(f"✅ Created question {question_number}: {title}")
            
            question_number += 1
            
        except Exception as e:
            print(f"❌ Error creating question {title_slug}: {e}")
            continue
    
    db.commit()
    print(f"Successfully created {len(title_to_id)} questions!")
    return title_to_id

def create_contests(db: Session, title_to_id: Dict[str, int], questions_per_contest: int = 3) -> None:
    """
    Create contests with various difficulty combinations while ensuring all problems are used
    Distribution patterns:
    - (Easy, Easy, Easy)
    - (Easy, Medium, Medium) 
    - (Easy, Easy, Medium)
    - (Easy, Medium, Hard)
    - (Medium, Medium, Medium)
    """
    print("Creating contests with balanced difficulty distribution...")
    
    # Get all questions grouped by difficulty
    easy_questions = []
    medium_questions = []
    hard_questions = []
    
    for title_slug, question_id in title_to_id.items():
        question = db.query(Question).filter(Question.id == question_id).first()
        if question:
            question_data = {
                'id': question.id,
                'difficulty': question.difficulty,
                'title': question.title
            }
            
            if question.difficulty == 'Easy':
                easy_questions.append(question_data)
            elif question.difficulty == 'Medium':
                medium_questions.append(question_data)
            elif question.difficulty == 'Hard':
                hard_questions.append(question_data)
    
    print(f"Found {len(easy_questions)} Easy, {len(medium_questions)} Medium, {len(hard_questions)} Hard questions")
    
    # Define contest patterns with their difficulty combinations
    contest_patterns = [
        ('Easy', 'Easy', 'Easy'),           # Pattern 1: All Easy
        ('Easy', 'Medium', 'Medium'),       # Pattern 2: Easy + 2 Medium
        ('Easy', 'Easy', 'Medium'),         # Pattern 3: 2 Easy + Medium
        ('Easy', 'Medium', 'Hard'),         # Pattern 4: One of each
        ('Medium', 'Medium', 'Medium'),     # Pattern 5: All Medium
        ('Medium', 'Medium', 'Hard'),       # Pattern 6: 2 Medium + Hard
        ('Medium', 'Hard', 'Hard'),         # Pattern 7: Medium + 2 Hard
        ('Hard', 'Hard', 'Hard'),           # Pattern 8: All Hard
    ]
    
    # Initialize question indices for each difficulty
    easy_idx = 0
    medium_idx = 0
    hard_idx = 0
    
    contests_created = 0
    max_contests = 50
    
    # Create contests using the patterns
    pattern_idx = 0
    while contests_created < max_contests:
        pattern = contest_patterns[pattern_idx % len(contest_patterns)]
        
        # Check if we have enough questions for this pattern
        easy_needed = pattern.count('Easy')
        medium_needed = pattern.count('Medium')
        hard_needed = pattern.count('Hard')
        
        if (easy_idx + easy_needed > len(easy_questions) or 
            medium_idx + medium_needed > len(medium_questions) or 
            hard_needed > 0 and hard_idx + hard_needed > len(hard_questions)):
            
            # If we can't create more contests with current pattern, try next pattern
            pattern_idx += 1
            if pattern_idx >= len(contest_patterns) * 2:  # Try each pattern twice before giving up
                print(f"⚠️  Cannot create more contests with available questions")
                break
            continue
        
        try:
            # Select questions based on the pattern
            contest_questions = []
            
            for difficulty in pattern:
                if difficulty == 'Easy':
                    contest_questions.append(easy_questions[easy_idx])
                    easy_idx += 1
                elif difficulty == 'Medium':
                    contest_questions.append(medium_questions[medium_idx])
                    medium_idx += 1
                elif difficulty == 'Hard':
                    contest_questions.append(hard_questions[hard_idx])
                    hard_idx += 1
            
            contest = Contest(
                name=f"Contest {contests_created + 1}",
                question1_id=contest_questions[0]['id'],
                question2_id=contest_questions[1]['id'] if len(contest_questions) > 1 else None,
                question3_id=contest_questions[2]['id'] if len(contest_questions) > 2 else None
            )
            
            db.add(contest)
            print(f"✅ Created Contest {contests_created + 1} with pattern {pattern}:")
            for i, q in enumerate(contest_questions):
                print(f"   - {pattern[i]}: {q['title'][:30]}...")
            
            contests_created += 1
            
        except Exception as e:
            print(f"❌ Error creating contest {contests_created + 1}: {e}")
            pattern_idx += 1
            continue
    
    db.commit()
    print(f"Successfully created {contests_created} contests!")
    print(f"Questions used: {easy_idx} Easy, {medium_idx} Medium, {hard_idx} Hard")
    print(f"Questions remaining: {len(easy_questions) - easy_idx} Easy, {len(medium_questions) - medium_idx} Medium, {len(hard_questions) - hard_idx} Hard")

def is_database_empty(db: Session) -> bool:
    """
    Check if the database is empty (no questions or contests)
    """
    question_count = db.query(Question).count()
    contest_count = db.query(Contest).count()
    return question_count == 0 and contest_count == 0


def seed_database_if_empty():
    """
    Seed the database only if it's empty
    """
    db = SessionLocal()
    try:
        if is_database_empty(db):
            print("🚀 Database is empty. Starting automatic seeding...")
            
            # Seed questions
            title_to_id = seed_questions_from_json(db)
            
            if title_to_id:
                # Create contests
                create_contests(db, title_to_id)
                
                print("🎉 Automatic database seeding completed successfully!")
                
                # Print summary
                total_questions = db.query(Question).count()
                total_contests = db.query(Contest).count()
                print(f"📊 Summary: {total_questions} questions, {total_contests} contests")
            else:
                print("⚠️  No questions were seeded. Check if leetcode_data.json exists and is valid.")
        else:
            print("✅ Database already contains data. Skipping seeding.")
            
    except Exception as e:
        print(f"❌ Error during automatic seeding: {e}")
        db.rollback()
    finally:
        db.close()


def main():
    """
    Main seeding function
    """
    db = SessionLocal()
    try:
        print("🚀 Starting database seeding from leetcode_data.json...")
        
        # Check if questions already exist
        existing_questions = db.query(Question).count()
        if existing_questions > 0:
            print(f"⚠️  Database already has {existing_questions} questions. Clearing...")
            # Clear attempts first to avoid foreign key constraint violations
            db.query(Attempt).delete()
            # Clear contests before clearing questions
            db.query(Contest).delete()
            db.query(Question).delete()
            db.commit()
        
        # Seed questions
        title_to_id = seed_questions_from_json(db)
        
        # Create contests
        create_contests(db, title_to_id)
        
        print("🎉 Database seeding completed successfully!")
        
        # Print summary
        total_questions = db.query(Question).count()
        total_contests = db.query(Contest).count()
        print(f"📊 Summary: {total_questions} questions, {total_contests} contests")
        
    except Exception as e:
        print(f"❌ Error during seeding: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    main()
