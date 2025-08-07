# TimedContest Platform

A comprehensive 1-hour timed contest platform featuring 50 carefully curated contests from the Neetcode 150 list. Each contest contains 3 balanced questions across different difficulty levels.

## 🚀 Features

- **50 Balanced Contests**: Each contest contains 3 questions with balanced difficulty distribution
- **Multi-language Support**: Python, Java, C++, and JavaScript with syntax highlighting
- **1-Hour Timer**: Automatic timer with notifications at 30 minutes and 5 minutes remaining
- **Attempt History**: Track all attempts with detailed review capabilities
- **Code Editor**: Clean, distraction-free code editor based on Monaco Editor
- **Minimalist UI**: Beautiful, modern interface built with React and Tailwind CSS
- **RESTful API**: Comprehensive FastAPI backend with full CRUD operations

## 🛠 Tech Stack

### Backend
- **FastAPI**: Modern, fast web framework for Python
- **PostgreSQL**: Robust relational database
- **SQLAlchemy**: Python SQL toolkit and ORM
- **Pydantic**: Data validation using Python type annotations

### Frontend
- **React 18**: Modern React with hooks
- **TypeScript**: Type-safe JavaScript
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Monaco Editor**: VS Code editor in the browser
- **React Router**: Client-side routing

### DevOps
- **Docker**: Containerized deployment
- **Docker Compose**: Multi-container orchestration

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose
- Git

### 1. Clone the Repository
```bash
git clone <repository-url>
cd TimedContest
```

### 2. Start the Application
```bash
docker-compose up --build
```

This will start:
- Frontend at http://localhost:3000
- Backend API at http://localhost:8000
- PostgreSQL database at localhost:5432

### 3. Access the Application
Open your browser and navigate to http://localhost:3000

## 📝 API Documentation

The API documentation is automatically generated and available at:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

### Key Endpoints

#### Contests
- `GET /contests` - List all contests with attempt status
- `GET /contests/{id}` - Get contest details with questions
- `GET /contests/{id}/templates` - Get template code for all languages
- `GET /contests/{id}/attempts` - Get all attempts for a contest

#### Attempts
- `POST /attempts` - Start a new contest attempt
- `GET /attempts/{id}` - Get attempt details
- `PUT /attempts/{id}` - Update attempt with code submissions
- `DELETE /attempts/{id}` - Delete an attempt
- `GET /attempts` - List attempts with filtering

#### Questions
- `GET /questions` - List questions with filtering
- `GET /questions/{id}` - Get question details

#### Stats
- `GET /stats/overview` - Get platform statistics

## 🏗 Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │   Database      │
│   (React)       │◄──►│   (FastAPI)     │◄──►│  (PostgreSQL)   │
│   Port 3000     │    │   Port 8000     │    │   Port 5432     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Database Schema

#### Questions
- Stores all 150 Neetcode questions with templates for 4 languages
- Includes difficulty, category, and problem descriptions

#### Contests
- 50 pre-generated contests with balanced question selection
- Each contest references 3 questions

#### Attempts
- Tracks user attempts with timestamps and code submissions
- Supports multiple programming languages per question
- Stores attempt status (in_progress, completed, abandoned)

## 🎮 How to Use

### Starting a Contest
1. Browse the contest list on the homepage
2. Click "Start Contest" on any contest
3. This creates a new attempt and starts the 1-hour timer

### During the Contest
1. Navigate between questions using the Q1, Q2, Q3 buttons
2. Select your preferred programming language
3. Write code in the Monaco editor
4. Code is automatically saved as you type
5. Timer shows notifications at 30 minutes and 5 minutes remaining

### Completing a Contest
1. Click "Finish" to complete early, or wait for the timer to expire
2. Review your submission in the review page
3. View detailed attempt history

### Managing Attempts
1. View all attempts in the History page
2. Resume in-progress attempts
3. Review completed attempts
4. Delete unwanted attempts

## 🧪 Testing

### Backend Tests
```bash
cd backend
python run_tests.py
```

### Manual Testing
1. Start the application with Docker Compose
2. Test the complete workflow:
   - View contests
   - Start an attempt
   - Submit code
   - Complete contest
   - Review attempt

## 🔧 Development

### Backend Development
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend Development
```bash
cd frontend
npm install
npm run dev
```

### Database Management
```bash
# Access PostgreSQL
docker-compose exec postgres psql -U postgres -d timedcontest

# View logs
docker-compose logs postgres
docker-compose logs backend
docker-compose logs frontend
```

## 📊 Contest Structure

Each contest is carefully balanced with:
- **Easy**: Foundation problems (arrays, strings, basic algorithms)
- **Medium**: Intermediate challenges (dynamic programming, trees, graphs)
- **Hard**: Advanced problems (complex algorithms, optimization)

The 50 contests are distributed across categories:
- Arrays & Hashing
- Two Pointers
- Sliding Window
- Stack
- Binary Search
- Linked List
- Trees
- Tries
- Heap/Priority Queue
- Backtracking
- Graphs
- Dynamic Programming
- Greedy
- Intervals
- Math & Geometry
- Bit Manipulation

## 🎯 Key Features in Detail

### Timer System
- Precise 1-hour countdown
- Visual progress bar
- Color-coded warnings (green → orange → red)
- Audio-free notifications via toast messages
- Automatic contest completion when time expires

### Code Editor
- Syntax highlighting for 4 languages
- No autocomplete (intentionally simple "notepad" style)
- Automatic code saving
- Language-specific templates
- Read-only mode for reviews

### Attempt Management
- Multiple attempts per contest allowed
- Resume in-progress attempts
- Detailed attempt history
- Code diff/review capabilities
- Attempt deletion with confirmation

### Responsive Design
- Works on desktop, tablet, and mobile
- Modern, clean interface
- Accessible color schemes
- Fast loading and smooth interactions

## 🚀 Deployment

The application is designed to be easily deployable with Docker:

```bash
# Production deployment
docker-compose -f docker-compose.yml up -d

# With custom environment
cp .env.example .env
# Edit .env with your settings
docker-compose --env-file .env up -d
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run the test suite
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Questions curated from the excellent [Neetcode 150](https://neetcode.io/) list
- UI inspiration from modern coding platforms
- Built with love for the competitive programming community

