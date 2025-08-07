.PHONY: help build up down logs test clean seed

# Default target
help:
	@echo "TimedContest Platform - Available Commands:"
	@echo ""
	@echo "  build     - Build all Docker containers"
	@echo "  up        - Start all services"
	@echo "  down      - Stop all services"
	@echo "  logs      - View logs from all services"
	@echo "  test      - Run backend tests"
	@echo "  clean     - Clean up containers, volumes, and images"
	@echo "  seed      - Seed database with sample data"
	@echo "  backend   - Start only backend services (postgres + api)"
	@echo "  frontend  - Start only frontend (requires backend running)"
	@echo ""

# Build all containers
build:
	docker-compose build

# Start all services
up:
	docker-compose up -d
	@echo "🚀 Application started!"
	@echo "📱 Frontend: http://localhost:3000"
	@echo "🔧 Backend API: http://localhost:8000"
	@echo "📚 API Docs: http://localhost:8000/docs"

# Start services with logs
up-logs:
	docker-compose up

# Stop all services
down:
	docker-compose down

# View logs
logs:
	docker-compose logs -f

# View logs for specific service
logs-backend:
	docker-compose logs -f backend

logs-frontend:
	docker-compose logs -f frontend

logs-db:
	docker-compose logs -f postgres

# Run backend tests
test:
	docker-compose exec backend python run_tests.py

# Run tests with coverage
test-coverage:
	docker-compose exec backend python -m pytest test_main.py --cov=. --cov-report=html

# Seed database (happens automatically on startup)
seed:
	docker-compose exec backend python seed_data.py

# Clean up everything
clean:
	docker-compose down -v --rmi all --remove-orphans
	docker system prune -f

# Clean up containers and volumes only
clean-containers:
	docker-compose down -v --remove-orphans

# Start only backend services
backend:
	docker-compose up -d postgres backend
	@echo "🔧 Backend services started!"
	@echo "🔧 API: http://localhost:8000"
	@echo "📚 Docs: http://localhost:8000/docs"

# Start only frontend (requires backend to be running)
frontend:
	docker-compose up -d frontend
	@echo "📱 Frontend started: http://localhost:3000"

# Database shell
db-shell:
	docker-compose exec postgres psql -U postgres -d timedcontest

# Backend shell
backend-shell:
	docker-compose exec backend /bin/bash

# Frontend shell
frontend-shell:
	docker-compose exec frontend /bin/sh

# Restart specific service
restart-backend:
	docker-compose restart backend

restart-frontend:
	docker-compose restart frontend

restart-db:
	docker-compose restart postgres

# Development setup
dev-setup: build up
	@echo "⚡ Development environment ready!"
	@echo "📱 Frontend: http://localhost:3000"
	@echo "🔧 Backend: http://localhost:8000"
	@echo ""
	@echo "🧪 Run 'make test' to verify everything works"

# Production setup
prod-setup:
	@echo "🚀 Setting up production environment..."
	docker-compose -f docker-compose.yml up -d --build
	@echo "✅ Production environment started!"

# Show status
status:
	docker-compose ps

# Monitor resources
monitor:
	docker stats

