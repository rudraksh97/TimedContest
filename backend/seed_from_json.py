#!/usr/bin/env python3
"""
Script to seed the database with questions and contests from leetcode_data.json
"""

import json
import re
import html
from typing import Dict, List, Optional
from database import SessionLocal
from models import Question, Contest, Difficulty
from sqlalchemy.orm import Session

def clean_html_content(content: str) -> str:
    """
    Clean HTML content and convert to plain text with proper formatting
    """
    if not content:
        return ""
    
    # Decode HTML entities first (like &nbsp;, &amp;, etc.)
    content = html.unescape(content)
    
    # Remove HTML tags but preserve structure
    content = re.sub(r'<[^>]+>', '', content)
    
    # Clean up extra whitespace
    content = re.sub(r'\n\s*\n', '\n\n', content)
    content = content.strip()
    
    return content

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
        "javascript": "javascript"
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
            description = clean_html_content(content)
            
            # Extract code templates
            python_template = extract_code_snippet(code_snippets, "python")
            java_template = extract_code_snippet(code_snippets, "java")
            cpp_template = extract_code_snippet(code_snippets, "cpp")
            javascript_template = extract_code_snippet(code_snippets, "javascript")
            
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
                javascript_template=javascript_template
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
    Create contests with random questions
    """
    print("Creating contests...")
    
    question_ids = list(title_to_id.values())
    total_questions = len(question_ids)
    
    if total_questions < questions_per_contest:
        print(f"❌ Not enough questions ({total_questions}) to create contests with {questions_per_contest} questions each")
        return
    
    # Create contests
    contest_number = 1
    for i in range(0, total_questions - questions_per_contest + 1, questions_per_contest):
        try:
            # Get questions for this contest
            contest_questions = question_ids[i:i + questions_per_contest]
            
            if len(contest_questions) < questions_per_contest:
                break
            
            contest = Contest(
                name=f"Contest {contest_number}",
                question1_id=contest_questions[0],
                question2_id=contest_questions[1] if len(contest_questions) > 1 else None,
                question3_id=contest_questions[2] if len(contest_questions) > 2 else None
            )
            
            db.add(contest)
            print(f"✅ Created Contest {contest_number} with {len(contest_questions)} questions")
            
            contest_number += 1
            
        except Exception as e:
            print(f"❌ Error creating contest {contest_number}: {e}")
            continue
    
    db.commit()
    print(f"Successfully created {contest_number - 1} contests!")

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
            db.query(Question).delete()
            db.query(Contest).delete()
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
