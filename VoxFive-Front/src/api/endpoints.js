import axios from 'axios';
import api from './client';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const authApi = {
  login: (username, password) =>
    axios.post(`${baseURL}/auth/login`, { username, password }),
  refresh: (refreshToken) =>
    axios.post(`${baseURL}/auth/refresh`, { refreshToken }),
};

export const usersApi = {
  create: (payload) => api.post('/users', payload),
  createAdmin: (payload) => api.post('/users/admin', payload),
  listAll: () => api.get('/users'),
  findById: (id) => api.get('/users/id', { params: { id } }),
  findByUsername: (username) => api.get('/users/name', { params: { username } }),
  findByEmail: (email) => api.get('/users/email', { params: { email } }),
  update: (id, payload) => api.put(`/users/${id}`, payload),
  delete: (id) => api.delete(`/users/${id}`),
};

export const feedbacksApi = {
  create: (payload) => api.post('/feedbacks', payload),
  listMine: () => api.get('/feedbacks/me'),
  listAll: () => api.get('/feedbacks'),
  findById: (id) => api.get('/feedbacks/id', { params: { id } }),
  findByUsername: (username) => api.get('/feedbacks/name', { params: { username } }),
  findByType: (type) => api.get('/feedbacks/type', { params: { type } }),
  findByStatus: (status) => api.get('/feedbacks/status', { params: { status } }),
  update: (id, payload) => api.put(`/feedbacks/${id}`, payload),
  answer: (id, answer) => api.put(`/feedbacks/admin/${id}/reply`, { answer }),
  delete: (id) => api.delete(`/feedbacks/${id}`),
};