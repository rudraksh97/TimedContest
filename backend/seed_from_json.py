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
    
    with open('leetcode_data.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
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
            
            # Map difficulty
            difficulty_enum = Difficulty.MEDIUM
            if difficulty.lower() == "easy":
                difficulty_enum = Difficulty.EASY
            elif difficulty.lower() == "hard":
                difficulty_enum = Difficulty.HARD
            
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
    Create 50 balanced contests with questions ordered from low to high difficulty
    """
    print("Creating 50 balanced contests...")
    
    # Get all questions with their difficulty levels
    questions = []
    for title_slug, question_id in title_to_id.items():
        question = db.query(Question).filter(Question.id == question_id).first()
        if question:
            questions.append({
                'id': question.id,
                'difficulty': question.difficulty,
                'title': question.title
            })
    
    # Sort questions by difficulty (Easy -> Medium -> Hard)
    difficulty_order = {'Easy': 1, 'Medium': 2, 'Hard': 3}
    questions.sort(key=lambda x: difficulty_order[x['difficulty']])
    
    total_questions = len(questions)
    target_contests = 50
    
    if total_questions < target_contests * questions_per_contest:
        print(f"❌ Not enough questions ({total_questions}) to create {target_contests} contests with {questions_per_contest} questions each")
        return
    
    # Create exactly 50 contests
    for contest_number in range(1, target_contests + 1):
        try:
            # Calculate question indices for this contest
            start_idx = (contest_number - 1) * questions_per_contest
            end_idx = start_idx + questions_per_contest
            
            if end_idx > total_questions:
                print(f"❌ Not enough questions for contest {contest_number}")
                break
            
            # Get questions for this contest (already sorted by difficulty)
            contest_questions = questions[start_idx:end_idx]
            
            contest = Contest(
                name=f"Contest {contest_number}",
                question1_id=contest_questions[0]['id'],
                question2_id=contest_questions[1]['id'] if len(contest_questions) > 1 else None,
                question3_id=contest_questions[2]['id'] if len(contest_questions) > 2 else None
            )
            
            db.add(contest)
            print(f"✅ Created Contest {contest_number} with questions: {[q['title'][:30] + '...' for q in contest_questions]}")
            
        except Exception as e:
            print(f"❌ Error creating contest {contest_number}: {e}")
            continue
    
    db.commit()
    print(f"Successfully created {target_contests} contests!")

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
