import pytest
import asyncio
from httpx import AsyncClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from main import app, get_db
from database import Base
from models import Question, Contest, Attempt, Difficulty, AttemptStatus, Language
from datetime import datetime
import uuid

# Test database
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

@pytest.fixture(scope="module")
def setup_database():
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)

@pytest.fixture
def db_session():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

@pytest.fixture
async def client():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        yield ac

@pytest.fixture
def sample_questions(db_session):
    questions = [
        Question(
            title="Two Sum",
            description="Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
            difficulty=Difficulty.EASY,
            category="Arrays & Hashing",
            neetcode_number=1,
            python_template="def twoSum(nums, target):\n    pass",
            java_template="public int[] twoSum(int[] nums, int target) {\n    \n}",
            cpp_template="vector<int> twoSum(vector<int>& nums, int target) {\n    \n}",
            javascript_template="var twoSum = function(nums, target) {\n    \n};"
        ),
        Question(
            title="Valid Parentheses",
            description="Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
            difficulty=Difficulty.EASY,
            category="Stack",
            neetcode_number=21,
            python_template="def isValid(s):\n    pass",
            java_template="public boolean isValid(String s) {\n    \n}",
            cpp_template="bool isValid(string s) {\n    \n}",
            javascript_template="var isValid = function(s) {\n    \n};"
        ),
        Question(
            title="Longest Substring Without Repeating Characters",
            description="Given a string s, find the length of the longest substring without repeating characters.",
            difficulty=Difficulty.MEDIUM,
            category="Sliding Window",
            neetcode_number=17,
            python_template="def lengthOfLongestSubstring(s):\n    pass",
            java_template="public int lengthOfLongestSubstring(String s) {\n    \n}",
            cpp_template="int lengthOfLongestSubstring(string s) {\n    \n}",
            javascript_template="var lengthOfLongestSubstring = function(s) {\n    \n};"
        )
    ]
    
    for question in questions:
        db_session.add(question)
    db_session.commit()
    
    for question in questions:
        db_session.refresh(question)
    
    return questions

@pytest.fixture
def sample_contest(db_session, sample_questions):
    contest = Contest(
        name="Test Contest 1",
        question1_id=sample_questions[0].id,
        question2_id=sample_questions[1].id,
        question3_id=sample_questions[2].id
    )
    db_session.add(contest)
    db_session.commit()
    db_session.refresh(contest)
    return contest

class TestHealthEndpoints:
    @pytest.mark.asyncio
    async def test_root_endpoint(self, client: AsyncClient, setup_database):
        response = await client.get("/")
        assert response.status_code == 200
        assert response.json() == {"message": "Timed Contest API is running"}

    @pytest.mark.asyncio
    async def test_health_check(self, client: AsyncClient, setup_database):
        response = await client.get("/health")
        assert response.status_code == 200
        data = response.json()
        assert "status" in data
        assert "timestamp" in data
        assert data["status"] == "healthy"

class TestContestEndpoints:
    @pytest.mark.asyncio
    async def test_get_contests_empty(self, client: AsyncClient, setup_database):
        response = await client.get("/contests")
        assert response.status_code == 200
        assert response.json() == []

    @pytest.mark.asyncio
    async def test_get_contests_with_data(self, client: AsyncClient, sample_contest):
        response = await client.get("/contests")
        assert response.status_code == 200
        data = response.json()
        assert len(data) == 1
        assert data[0]["name"] == "Test Contest 1"
        assert data[0]["has_attempts"] == False

    @pytest.mark.asyncio
    async def test_get_contest_by_id(self, client: AsyncClient, sample_contest):
        response = await client.get(f"/contests/{sample_contest.id}")
        assert response.status_code == 200
        data = response.json()
        assert data["name"] == "Test Contest 1"
        assert "question1" in data
        assert "question2" in data
        assert "question3" in data

    @pytest.mark.asyncio
    async def test_get_contest_not_found(self, client: AsyncClient, setup_database):
        response = await client.get("/contests/999")
        assert response.status_code == 404

    @pytest.mark.asyncio
    async def test_get_contest_templates(self, client: AsyncClient, sample_contest):
        response = await client.get(f"/contests/{sample_contest.id}/templates")
        assert response.status_code == 200
        data = response.json()
        assert "question1" in data
        assert "question2" in data
        assert "question3" in data
        
        # Check that templates contain all languages
        for q in ["question1", "question2", "question3"]:
            assert "templates" in data[q]
            assert "python" in data[q]["templates"]
            assert "java" in data[q]["templates"]
            assert "cpp" in data[q]["templates"]
            assert "javascript" in data[q]["templates"]

class TestAttemptEndpoints:
    @pytest.mark.asyncio
    async def test_create_attempt(self, client: AsyncClient, sample_contest):
        attempt_data = {"contest_id": sample_contest.id}
        response = await client.post("/attempts", json=attempt_data)
        assert response.status_code == 200
        data = response.json()
        assert "id" in data
        assert data["contest_id"] == sample_contest.id
        assert data["status"] == "in_progress"

    @pytest.mark.asyncio
    async def test_create_attempt_invalid_contest(self, client: AsyncClient, setup_database):
        attempt_data = {"contest_id": 999}
        response = await client.post("/attempts", json=attempt_data)
        assert response.status_code == 404

    @pytest.mark.asyncio
    async def test_get_attempt_by_id(self, client: AsyncClient, sample_contest):
        # Create attempt first
        attempt_data = {"contest_id": sample_contest.id}
        create_response = await client.post("/attempts", json=attempt_data)
        attempt_id = create_response.json()["id"]
        
        # Get attempt
        response = await client.get(f"/attempts/{attempt_id}")
        assert response.status_code == 200
        data = response.json()
        assert data["id"] == attempt_id

    @pytest.mark.asyncio
    async def test_update_attempt(self, client: AsyncClient, sample_contest):
        # Create attempt first
        attempt_data = {"contest_id": sample_contest.id}
        create_response = await client.post("/attempts", json=attempt_data)
        attempt_id = create_response.json()["id"]
        
        # Update attempt
        update_data = {
            "question1_code": "def twoSum(nums, target):\n    return [0, 1]",
            "question1_language": "python"
        }
        response = await client.put(f"/attempts/{attempt_id}", json=update_data)
        assert response.status_code == 200
        data = response.json()
        assert data["question1_code"] == update_data["question1_code"]
        assert data["question1_language"] == update_data["question1_language"]

    @pytest.mark.asyncio
    async def test_complete_attempt(self, client: AsyncClient, sample_contest):
        # Create attempt first
        attempt_data = {"contest_id": sample_contest.id}
        create_response = await client.post("/attempts", json=attempt_data)
        attempt_id = create_response.json()["id"]
        
        # Complete attempt
        update_data = {
            "status": "completed",
            "completed_at": datetime.utcnow().isoformat()
        }
        response = await client.put(f"/attempts/{attempt_id}", json=update_data)
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "completed"
        assert data["completed_at"] is not None
        assert data["duration_seconds"] is not None

    @pytest.mark.asyncio
    async def test_delete_attempt(self, client: AsyncClient, sample_contest):
        # Create attempt first
        attempt_data = {"contest_id": sample_contest.id}
        create_response = await client.post("/attempts", json=attempt_data)
        attempt_id = create_response.json()["id"]
        
        # Delete attempt
        response = await client.delete(f"/attempts/{attempt_id}")
        assert response.status_code == 200
        
        # Verify deletion
        get_response = await client.get(f"/attempts/{attempt_id}")
        assert get_response.status_code == 404

    @pytest.mark.asyncio
    async def test_get_contest_attempts(self, client: AsyncClient, sample_contest):
        # Create multiple attempts
        for _ in range(3):
            attempt_data = {"contest_id": sample_contest.id}
            await client.post("/attempts", json=attempt_data)
        
        response = await client.get(f"/contests/{sample_contest.id}/attempts")
        assert response.status_code == 200
        data = response.json()
        assert len(data) == 3

class TestQuestionEndpoints:
    @pytest.mark.asyncio
    async def test_get_questions(self, client: AsyncClient, sample_questions):
        response = await client.get("/questions")
        assert response.status_code == 200
        data = response.json()
        assert len(data) == 3

    @pytest.mark.asyncio
    async def test_get_question_by_id(self, client: AsyncClient, sample_questions):
        question_id = sample_questions[0].id
        response = await client.get(f"/questions/{question_id}")
        assert response.status_code == 200
        data = response.json()
        assert data["title"] == "Two Sum"

    @pytest.mark.asyncio
    async def test_filter_questions_by_difficulty(self, client: AsyncClient, sample_questions):
        response = await client.get("/questions?difficulty=Easy")
        assert response.status_code == 200
        data = response.json()
        assert len(data) == 2  # Two Sum and Valid Parentheses

    @pytest.mark.asyncio
    async def test_filter_questions_by_category(self, client: AsyncClient, sample_questions):
        response = await client.get("/questions?category=Stack")
        assert response.status_code == 200
        data = response.json()
        assert len(data) == 1
        assert data[0]["title"] == "Valid Parentheses"

class TestStatsEndpoints:
    @pytest.mark.asyncio
    async def test_stats_overview_empty(self, client: AsyncClient, setup_database):
        response = await client.get("/stats/overview")
        assert response.status_code == 200
        data = response.json()
        assert data["total_contests"] == 0
        assert data["total_attempts"] == 0
        assert data["completed_attempts"] == 0
        assert data["in_progress_attempts"] == 0
        assert data["completion_rate"] == 0

    @pytest.mark.asyncio
    async def test_stats_overview_with_data(self, client: AsyncClient, sample_contest):
        # Create some attempts
        attempt_data = {"contest_id": sample_contest.id}
        
        # Create and complete one attempt
        create_response = await client.post("/attempts", json=attempt_data)
        attempt_id = create_response.json()["id"]
        await client.put(f"/attempts/{attempt_id}", json={"status": "completed"})
        
        # Create an in-progress attempt
        await client.post("/attempts", json=attempt_data)
        
        response = await client.get("/stats/overview")
        assert response.status_code == 200
        data = response.json()
        assert data["total_contests"] == 1
        assert data["total_attempts"] == 2
        assert data["completed_attempts"] == 1
        assert data["in_progress_attempts"] == 1
        assert data["completion_rate"] == 0.5

class TestIntegrationWorkflow:
    @pytest.mark.asyncio
    async def test_complete_contest_workflow(self, client: AsyncClient, sample_contest):
        """Test the complete workflow from start to finish"""
        
        # 1. Get contest list
        response = await client.get("/contests")
        assert response.status_code == 200
        contests = response.json()
        assert len(contests) == 1
        
        # 2. Get contest details
        contest_id = contests[0]["id"]
        response = await client.get(f"/contests/{contest_id}")
        assert response.status_code == 200
        
        # 3. Get contest templates
        response = await client.get(f"/contests/{contest_id}/templates")
        assert response.status_code == 200
        templates = response.json()
        
        # 4. Start attempt
        attempt_data = {"contest_id": contest_id}
        response = await client.post("/attempts", json=attempt_data)
        assert response.status_code == 200
        attempt = response.json()
        attempt_id = attempt["id"]
        
        # 5. Submit code for each question
        for i in range(1, 4):
            update_data = {
                f"question{i}_code": f"# Solution for question {i}\npass",
                f"question{i}_language": "python"
            }
            response = await client.put(f"/attempts/{attempt_id}", json=update_data)
            assert response.status_code == 200
        
        # 6. Complete the attempt
        response = await client.put(f"/attempts/{attempt_id}", json={"status": "completed"})
        assert response.status_code == 200
        
        # 7. Verify completion
        response = await client.get(f"/attempts/{attempt_id}")
        assert response.status_code == 200
        final_attempt = response.json()
        assert final_attempt["status"] == "completed"
        assert final_attempt["question1_code"] is not None
        assert final_attempt["question2_code"] is not None
        assert final_attempt["question3_code"] is not None
        
        # 8. Check contest now shows as attempted
        response = await client.get("/contests")
        assert response.status_code == 200
        contests = response.json()
        assert contests[0]["has_attempts"] == True
        assert contests[0]["last_attempt_status"] == "completed"

if __name__ == "__main__":
    pytest.main([__file__, "-v"])

