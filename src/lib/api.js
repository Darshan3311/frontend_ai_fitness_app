const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081/api';

async function request(path, { method = 'GET', body, auth = false } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (auth) {
    const token = localStorage.getItem('token');
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let data;
  try { data = text ? JSON.parse(text) : null; } catch { data = text; }
  if (!res.ok) {
    throw new Error(data?.error || data?.message || 'Request failed');
  }
  return data;
}

export const api = {
  login: (credentials) => request('/auth/login', { method: 'POST', body: credentials }),
  register: (payload) => request('/auth/register', { method: 'POST', body: payload }),
  // Added workout & diet generation endpoints
  generateWorkout: (payload) => request('/workout/generate', { method: 'POST', body: payload, auth: true }),
  generateDiet: (payload) => request('/diet/generate', { method: 'POST', body: payload, auth: true }),
  // New: yoga plan generation
  generateYogaPlan: (payload) => request('/yoga/generate', { method: 'POST', body: payload, auth: true }),
  // New: running plan generation
  generateRunningPlan: (payload) => request('/running/generate', { method: 'POST', body: payload, auth: true }),
};
