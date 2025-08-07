#!/usr/bin/env python3
"""
Script to update existing questions in the database to decode HTML entities
"""

import html
from database import SessionLocal
from models import Question

def update_html_entities():
    """
    Update existing questions to decode HTML entities in their descriptions
    """
    db = SessionLocal()
    try:
        print("🔍 Finding questions with HTML entities...")
        
        # Get all questions
        questions = db.query(Question).all()
        updated_count = 0
        
        for question in questions:
            if question.description:
                # Check if the description contains HTML entities
                original_description = question.description
                decoded_description = html.unescape(original_description)
                
                # Only update if there were HTML entities
                if decoded_description != original_description:
                    question.description = decoded_description
                    updated_count += 1
                    print(f"✅ Updated question {question.id}: {question.title}")
        
        if updated_count > 0:
            db.commit()
            print(f"🎉 Successfully updated {updated_count} questions!")
        else:
            print("ℹ️  No questions needed updating.")
            
    except Exception as e:
        print(f"❌ Error updating questions: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    update_html_entities()
