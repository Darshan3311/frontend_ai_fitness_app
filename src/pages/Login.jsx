import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/AuthLayout';

export default function Login() {
  const { login, loading, error, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard', { replace: true });
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    const payload = { email: form.email.trim(), password: form.password };
    if (!payload.email || !payload.password) {
      setFormError('Email and password are required');
      return;
    }
    try {
      await login(payload);
      navigate('/dashboard', { replace: true });
    } catch (_) { /* context sets error */ }
  };

  const inputClass = "w-full rounded-md bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 focus:border-brand-600 dark:focus:border-brand-500 focus:ring-2 focus:ring-brand-600/20 dark:focus:ring-brand-500/30 px-3 py-2 text-sm outline-none placeholder:text-neutral-400 dark:placeholder:text-neutral-500 transition-colors";

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to continue tracking your fitness journey"
      footer={<p>Don't have an account? <Link to="/register" className="text-brand-600 dark:text-brand-500 hover:underline">Create one</Link></p>}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {(formError || error) && (
          <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 border border-red-300 dark:border-red-700/50 rounded p-2">
            {formError || error}
          </div>
        )}
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-neutral-800 dark:text-neutral-200">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className={inputClass}
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            disabled={loading}
          />
        </div>
        <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-neutral-800 dark:text-neutral-200">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              className={inputClass}
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              disabled={loading}
            />
        </div>
        <button
          type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-brand-600 hover:bg-brand-500 dark:bg-brand-600 dark:hover:bg-brand-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors px-4 py-2.5 text-sm font-medium text-white"
        >
          {loading && <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin"/>}
          Log In
        </button>
      </form>
    </AuthLayout>
  );
}
