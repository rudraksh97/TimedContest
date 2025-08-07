import axios from 'axios';
import { Contest, ContestSummary, Attempt, AttemptCreate, AttemptUpdate, Question, ContestTemplates } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Contest APIs
export const contestAPI = {
  getAll: (): Promise<ContestSummary[]> => 
    api.get('/contests').then(res => res.data),
  
  getById: (id: number): Promise<Contest> => 
    api.get(`/contests/${id}`).then(res => res.data),
  
  getTemplates: (id: number): Promise<ContestTemplates> => 
    api.get(`/contests/${id}/templates`).then(res => res.data),
  
  getAttempts: (id: number): Promise<Attempt[]> => 
    api.get(`/contests/${id}/attempts`).then(res => res.data),
};

// Attempt APIs
export const attemptAPI = {
  create: (attempt: AttemptCreate): Promise<Attempt> => 
    api.post('/attempts', attempt).then(res => res.data),
  
  getById: (id: string): Promise<Attempt> => 
    api.get(`/attempts/${id}`).then(res => res.data),
  
  update: (id: string, update: AttemptUpdate): Promise<Attempt> => 
    api.put(`/attempts/${id}`, update).then(res => res.data),
  
  delete: (id: string): Promise<{ message: string }> => 
    api.delete(`/attempts/${id}`).then(res => res.data),
  
  getAll: (params?: { contest_id?: number; status?: string; limit?: number }): Promise<Attempt[]> => 
    api.get('/attempts', { params }).then(res => res.data),
};

// Question APIs
export const questionAPI = {
  getById: (id: number): Promise<Question> => 
    api.get(`/questions/${id}`).then(res => res.data),
  
  getAll: (params?: { category?: string; difficulty?: string; limit?: number }): Promise<Question[]> => 
    api.get('/questions', { params }).then(res => res.data),
};

// Stats APIs
export const statsAPI = {
  getOverview: (): Promise<{
    total_contests: number;
    total_attempts: number;
    completed_attempts: number;
    in_progress_attempts: number;
    completion_rate: number;
  }> => api.get('/stats/overview').then(res => res.data),
};

export default api;

