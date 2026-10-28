import api from './client';

export const authApi = {
  login: (username, password) => api.post('/auth/login', { username, password }),
  refresh: (refreshToken) => api.post('/auth/refresh', { refreshToken })
};

export const usersApi = {
  criar: (payload) => api.post('/users', payload)
};

export const feedbacksApi = {
  listarMeus: () => api.get('/feedbacks/me'),
  listarTodos: () => api.get('/feedbacks'),
  buscarComFiltros: (params) => api.get('/feedbacks/admin/search', { params }),
  criar: (payload) => api.post('/feedbacks', payload),
  responder: (id, answer) => api.put(`/feedbacks/admin/${id}/reply`, { answer }),
};