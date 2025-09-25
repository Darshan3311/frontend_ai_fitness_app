import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { api } from '../lib/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return;
    // Decode token payload for quick user info if present (non-secure, just UI convenience)
    try {
      const payload = JSON.parse(atob(token.split('.')[1] || ''));
      setUser({
        userId: payload.userId || payload.sub,
        username: payload.username || payload.sub,
        email: payload.email,
        roles: payload.roles || [],
      });
    } catch (_) {
      // ignore decoding errors
    }
  }, [token]);

  const login = useCallback(async (credentials) => {
    setLoading(true); setError(null);
    try {
      const data = await api.login(credentials);
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setUser({
        userId: data.userId,
        username: data.username,
        email: data.email,
        roles: data.roles || []
      });
      return data;
    } catch (e) {
      setError(e.message);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (payload) => {
    setLoading(true); setError(null);
    try {
      const data = await api.register(payload);
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setUser({
        userId: data.userId,
        username: data.username,
        email: data.email,
        roles: data.roles || []
      });
      return data;
    } catch (e) {
      setError(e.message);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  }, []);

  const value = { user, token, loading, error, login, register, logout, isAuthenticated: !!token };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

