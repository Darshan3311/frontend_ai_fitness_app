import { Link, NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

export default function AuthLayout({ children, title, subtitle, footer }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-neutral-50 to-brand-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-brand-700/20 relative transition-colors">
      {/* decorative radial glow (dark only) */}
      <div className="pointer-events-none absolute inset-0 dark:[background:radial-gradient(circle_at_30%_20%,rgba(239,68,68,0.15),transparent_60%)]" />
      <header className="px-6 py-4 flex items-center justify-between relative z-10">
        <Link to="/" className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-white">
          Fit<span className="text-brand-600 dark:text-brand-500">Track</span>
        </Link>
        <div className="flex items-center gap-6">
          <nav className="flex gap-4 text-sm text-neutral-600 dark:text-neutral-300">
            <NavLink to="/login" className={({isActive}) => isActive ? 'text-neutral-900 dark:text-white font-medium after:block after:h-0.5 after:bg-brand-600 dark:after:bg-brand-500 after:rounded-sm' : 'hover:text-neutral-900 dark:hover:text-white hover:after:block relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:bg-brand-600/40 dark:after:bg-brand-500/40 after:rounded-sm after:transition-opacity after:opacity-0 hover:after:opacity-100'}>Login</NavLink>
            <NavLink to="/register" className={({isActive}) => isActive ? 'text-neutral-900 dark:text-white font-medium after:block after:h-0.5 after:bg-brand-600 dark:after:bg-brand-500 after:rounded-sm' : 'hover:text-neutral-900 dark:hover:text-white hover:after:block relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:bg-brand-600/40 dark:after:bg-brand-500/40 after:rounded-sm after:transition-opacity after:opacity-0 hover:after:opacity-100'}>Register</NavLink>
          </nav>
          <ThemeToggle />
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center px-4 relative z-10">
        <div className="w-full max-w-md">
          <div className="backdrop-blur-sm bg-white/80 dark:bg-neutral-900/80 shadow-xl shadow-brand-900/10 rounded-2xl border border-neutral-200 dark:border-neutral-800 hover:border-brand-600/40 transition-colors p-8 ring-1 ring-black/5 dark:ring-white/5">
            {title && <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-1 tracking-tight">{title}</h1>}
            {subtitle && <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">{subtitle}</p>}
            {children}
          </div>
          {footer && <div className="mt-4 text-center text-xs text-neutral-500 dark:text-neutral-500">{footer}</div>}
        </div>
      </main>
      <footer className="py-6 text-center text-xs text-neutral-500 dark:text-neutral-500 relative z-10">
        © {new Date().getFullYear()} <span className="font-medium text-neutral-800 dark:text-white/80">Fit<span className="text-brand-600 dark:text-brand-500">Track</span></span>. All rights reserved.
      </footer>
    </div>
  );
}
