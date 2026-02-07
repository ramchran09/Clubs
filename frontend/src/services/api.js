import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  signup: (userData) => api.post('/auth/signup', userData),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me'),
};

// Club APIs
export const clubAPI = {
  getClub: (id) => api.get(`/clubs/${id}`),
  updateClub: (id, data) => api.patch(`/clubs/${id}`, data),
  getEvents: (id) => api.get(`/clubs/${id}/events`),
  addEvent: (id, data) => api.post(`/clubs/${id}/events`, data),
  updateEvent: (clubId, eventId, data) => api.patch(`/clubs/${clubId}/events/${eventId}`, data),
  deleteEvent: (clubId, eventId) => api.delete(`/clubs/${clubId}/events/${eventId}`),
  getPosts: (id) => api.get(`/clubs/${id}/posts`),
  addPost: (id, data) => api.post(`/clubs/${id}/posts`, data),
  deletePost: (clubId, postId) => api.delete(`/clubs/${clubId}/posts/${postId}`),
  getMembers: (id) => api.get(`/clubs/${id}/members`),
  addMember: (id, data) => api.post(`/clubs/${id}/members`, data),
  updateMember: (clubId, memberId, data) => api.patch(`/clubs/${clubId}/members/${memberId}`, data),
  deleteMember: (clubId, memberId) => api.delete(`/clubs/${clubId}/members/${memberId}`),
  getContact: (id) => api.get(`/clubs/${id}/contact`),
  updateContact: (id, data) => api.patch(`/clubs/${id}/contact`, data),
};

export default api;

