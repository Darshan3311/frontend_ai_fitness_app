import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={`group inline-flex items-center gap-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white/70 dark:bg-neutral-800/70 hover:border-brand-600/60 dark:hover:border-brand-500/60 px-3 py-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-200 shadow-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600/50 ${className}`}
    >
      {isDark ? (
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-active:scale-90">
          <path d="M7.5 1.5a6 6 0 0 0 0 12 6.5 6.5 0 0 0 6.2-4.6A5 5 0 0 1 7.5 1.5Z" />
        </svg>
      ) : (
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-active:scale-90">
          <circle cx="8" cy="8" r="3" />
          <path d="M8 1.5v1.5M8 13v1.5M1.5 8H3m10 0h1.5M3.8 3.8l1 .9m6.4 6.5 1 .9m0-8.2-1 .9M4.8 11.2l-1 .9" />
        </svg>
      )}
      <span className="hidden sm:inline">{isDark ? 'Dark' : 'Light'}</span>
    </button>
  );
}

