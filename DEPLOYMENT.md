# Deployment Guide

This guide covers deploying the TimedContest platform in various environments.

## 🚀 Quick Deployment (Recommended)

### Prerequisites
- Docker 20.0+
- Docker Compose 2.0+
- 4GB+ RAM
- 10GB+ disk space

### 1. Clone and Deploy
```bash
git clone <repository-url>
cd TimedContest
make dev-setup
```

This will:
- Build all containers
- Start all services
- Seed the database with 150 questions and 50 contests
- Make the app available at http://localhost:3000

## 🏗 Manual Docker Deployment

### Step-by-step Setup

1. **Clone Repository**
```bash
git clone <repository-url>
cd TimedContest
```

2. **Build Containers**
```bash
docker-compose build
```

3. **Start Services**
```bash
docker-compose up -d
```

4. **Verify Deployment**
```bash
# Check service status
docker-compose ps

# Check logs
docker-compose logs

# Test the API
curl http://localhost:8000/health
```

## 🐳 Production Deployment

### Environment Configuration

1. **Create Environment File**
```bash
cp .env.example .env
```

2. **Edit Environment Variables**
```bash
# Database (use strong passwords in production)
POSTGRES_DB=timedcontest_prod
POSTGRES_USER=tc_user
POSTGRES_PASSWORD=your_secure_password

# API Configuration
VITE_API_URL=https://your-domain.com/api

# Environment
ENVIRONMENT=production
DEBUG=false
```

### Production Docker Compose

Create `docker-compose.prod.yml`:
```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: ${POSTGRES_DB}
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./backend/init.sql:/docker-entrypoint-initdb.d/init.sql
    restart: unless-stopped
    networks:
      - timedcontest-network

  backend:
    build: ./backend
    environment:
      - DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:5432/${POSTGRES_DB}
    depends_on:
      - postgres
    restart: unless-stopped
    networks:
      - timedcontest-network

  frontend:
    build: ./frontend
    environment:
      - VITE_API_URL=${VITE_API_URL}
    restart: unless-stopped
    networks:
      - timedcontest-network

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - frontend
      - backend
    restart: unless-stopped
    networks:
      - timedcontest-network

volumes:
  postgres_data:

networks:
  timedcontest-network:
    driver: bridge
```

### Nginx Configuration

Create `nginx.conf`:
```nginx
events {
    worker_connections 1024;
}

http {
    upstream backend {
        server backend:8000;
    }

    upstream frontend {
        server frontend:3000;
    }

    server {
        listen 80;
        server_name your-domain.com;
        
        # Redirect HTTP to HTTPS
        return 301 https://$server_name$request_uri;
    }

    server {
        listen 443 ssl;
        server_name your-domain.com;

        ssl_certificate /etc/nginx/ssl/cert.pem;
        ssl_certificate_key /etc/nginx/ssl/key.pem;

        # API routes
        location /api/ {
            proxy_pass http://backend/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # Frontend routes
        location / {
            proxy_pass http://frontend/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
```

### Deploy to Production
```bash
# Deploy with production configuration
docker-compose -f docker-compose.prod.yml --env-file .env up -d

# Monitor deployment
docker-compose -f docker-compose.prod.yml logs -f
```

## ☁️ Cloud Deployment

### AWS ECS Deployment

1. **Create Task Definition**
```json
{
  "family": "timedcontest",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "1024",
  "memory": "2048",
  "executionRoleArn": "arn:aws:iam::account:role/ecsTaskExecutionRole",
  "containerDefinitions": [
    {
      "name": "backend",
      "image": "your-account.dkr.ecr.region.amazonaws.com/timedcontest-backend",
      "portMappings": [{"containerPort": 8000}],
      "environment": [
        {"name": "DATABASE_URL", "value": "postgresql://..."}
      ]
    },
    {
      "name": "frontend",
      "image": "your-account.dkr.ecr.region.amazonaws.com/timedcontest-frontend",
      "portMappings": [{"containerPort": 3000}]
    }
  ]
}
```

2. **Create Service**
```bash
aws ecs create-service \
  --cluster timedcontest-cluster \
  --service-name timedcontest-service \
  --task-definition timedcontest \
  --desired-count 2 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-xxx],securityGroups=[sg-xxx],assignPublicIp=ENABLED}"
```

### Google Cloud Run

1. **Build and Push Images**
```bash
# Backend
docker build -t gcr.io/project-id/timedcontest-backend ./backend
docker push gcr.io/project-id/timedcontest-backend

# Frontend
docker build -t gcr.io/project-id/timedcontest-frontend ./frontend
docker push gcr.io/project-id/timedcontest-frontend
```

2. **Deploy Services**
```bash
# Deploy backend
gcloud run deploy timedcontest-backend \
  --image gcr.io/project-id/timedcontest-backend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated

# Deploy frontend
gcloud run deploy timedcontest-frontend \
  --image gcr.io/project-id/timedcontest-frontend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### Kubernetes Deployment

See `k8s/` directory for Kubernetes manifests:
```bash
# Apply all Kubernetes resources
kubectl apply -f k8s/

# Check deployment status
kubectl get pods
kubectl get services
```

## 🔧 Maintenance

### Database Backup
```bash
# Create backup
docker-compose exec postgres pg_dump -U postgres timedcontest > backup.sql

# Restore backup
docker-compose exec -T postgres psql -U postgres timedcontest < backup.sql
```

### Application Updates
```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
docker-compose build
docker-compose up -d

# Check health
curl http://localhost:8000/health
```

### Monitoring
```bash
# View resource usage
docker stats

# Check logs
docker-compose logs -f

# Database queries
docker-compose exec postgres psql -U postgres -d timedcontest -c "SELECT COUNT(*) FROM attempts;"
```

### Scaling
```bash
# Scale backend services
docker-compose up -d --scale backend=3

# Scale with load balancer (requires nginx)
docker-compose -f docker-compose.prod.yml up -d --scale backend=3
```

## 🚨 Troubleshooting

### Common Issues

**Database Connection Issues**
```bash
# Check database status
docker-compose logs postgres

# Restart database
docker-compose restart postgres

# Reset database
docker-compose down -v
docker-compose up -d
```

**Frontend Build Issues**
```bash
# Clear node modules and rebuild
docker-compose exec frontend rm -rf node_modules
docker-compose restart frontend
```

**Memory Issues**
```bash
# Check memory usage
docker stats

# Increase Docker memory limit
# Docker Desktop -> Settings -> Resources -> Memory
```

### Health Checks
```bash
# API health
curl http://localhost:8000/health

# Frontend health
curl http://localhost:3000

# Database health
docker-compose exec postgres pg_isready -U postgres
```

### Performance Optimization

1. **Database Indexing**
   - Indexes are automatically created during initialization
   - Monitor slow queries with `EXPLAIN ANALYZE`

2. **Frontend Optimization**
   - Static files are served efficiently by Vite
   - Monaco Editor is loaded asynchronously

3. **Caching**
   - Add Redis for session caching (optional)
   - Use CDN for static assets (production)

## 📊 Monitoring and Logging

### Application Metrics
- API response times
- Database query performance
- User session duration
- Contest completion rates

### Recommended Monitoring Stack
- **Prometheus**: Metrics collection
- **Grafana**: Visualization
- **Loki**: Log aggregation
- **AlertManager**: Alerting

### Log Locations
```bash
# Application logs
docker-compose logs backend
docker-compose logs frontend

# Database logs
docker-compose logs postgres

# Nginx logs (production)
docker-compose logs nginx
```

## 🔒 Security Considerations

### Production Security Checklist
- [ ] Use strong database passwords
- [ ] Enable SSL/TLS certificates
- [ ] Configure firewall rules
- [ ] Regular security updates
- [ ] Database backup encryption
- [ ] API rate limiting
- [ ] Input validation
- [ ] CORS configuration

### SSL Certificate Setup
```bash
# Using Let's Encrypt
certbot certonly --webroot -w /var/www/html -d your-domain.com

# Copy certificates to nginx directory
cp /etc/letsencrypt/live/your-domain.com/fullchain.pem ./ssl/cert.pem
cp /etc/letsencrypt/live/your-domain.com/privkey.pem ./ssl/key.pem
```

This deployment guide should cover most scenarios for getting the TimedContest platform running in various environments.

