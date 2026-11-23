import api from './client';

export const authApi = {
  login: (username, password) => api.post('/auth/login', { username, password }),
  refresh: (refreshToken) => api.post('/auth/refresh', { refreshToken }),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, newPassword) => api.post('/auth/reset-password', { token, newPassword })
};

export const usersApi = {
  criar: (payload) => api.post('/users', payload),
  criarAdmin: (payload) => api.post('/users/admin', payload)
};

export const feedbacksApi = {
  listarMeus: () => api.get('/feedbacks/me'),
  listarTodos: () => api.get('/feedbacks'),
  buscarComFiltros: (params) => api.get('/feedbacks/admin/search', { params }),
  criar: (payload) => api.post('/feedbacks', payload),
  responder: (id, answer) => api.put(`/feedbacks/admin/${id}/reply`, { answer }),
  deletar: (id) => api.delete(`/feedbacks/${id}`),
};

export const auditApi = {
  listar: () => api.get('/audit-logs')
};