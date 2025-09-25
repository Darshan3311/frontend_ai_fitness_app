import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';
import ThemeToggle from '../components/ThemeToggle';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [workoutForm, setWorkoutForm] = useState({ targetMuscle: 'chest', durationInMinutes: 30, fitnessLevel: 'beginner' });
  const [dietForm, setDietForm] = useState({ dietaryPreference: 'omnivore', fitnessGoal: 'maintenance', dailyCalories: 2000, allergies: '' });
  // New forms
  const [yogaForm, setYogaForm] = useState({ goal: 'Stress Relief', durationInMinutes: 20 });
  const [runningForm, setRunningForm] = useState({ goal: 'Run a 5k', timeframe: '8 weeks', fitnessLevel: 'beginner' });

  const [workoutLoading, setWorkoutLoading] = useState(false);
  const [dietLoading, setDietLoading] = useState(false);
  const [yogaLoading, setYogaLoading] = useState(false);
  const [runningLoading, setRunningLoading] = useState(false);

  const [workoutError, setWorkoutError] = useState(null);
  const [dietError, setDietError] = useState(null);
  const [yogaError, setYogaError] = useState(null);
  const [runningError, setRunningError] = useState(null);

  const [workoutResult, setWorkoutResult] = useState(null);
  const [dietResult, setDietResult] = useState(null);
  const [yogaResult, setYogaResult] = useState(null);
  const [runningResult, setRunningResult] = useState(null);

  const handleWorkoutChange = (e) => {
    const { name, value } = e.target;
    setWorkoutForm(f => ({ ...f, [name]: name === 'durationInMinutes' ? Number(value) : value }));
  };

  const handleDietChange = (e) => {
    const { name, value } = e.target;
    setDietForm(f => ({ ...f, [name]: name === 'dailyCalories' ? Number(value) : value }));
  };

  const handleYogaChange = (e) => {
    const { name, value } = e.target;
    setYogaForm(f => ({ ...f, [name]: name === 'durationInMinutes' ? Number(value) : value }));
  };

  const handleRunningChange = (e) => {
    const { name, value } = e.target;
    setRunningForm(f => ({ ...f, [name]: value }));
  };

  const submitWorkout = async (e) => {
    e.preventDefault();
    setWorkoutError(null);
    setWorkoutLoading(true);
    try {
      const data = await api.generateWorkout(workoutForm);
      setWorkoutResult(data);
    } catch (err) {
      setWorkoutError(err.message);
    } finally {
      setWorkoutLoading(false);
    }
  };

  const submitDiet = async (e) => {
    e.preventDefault();
    setDietError(null);
    setDietLoading(true);
    try {
      const data = await api.generateDiet(dietForm);
      setDietResult(data);
    } catch (err) {
      setDietError(err.message);
    } finally {
      setDietLoading(false);
    }
  };

  const submitYoga = async (e) => {
    e.preventDefault();
    setYogaError(null); setYogaLoading(true);
    try { const data = await api.generateYogaPlan(yogaForm); setYogaResult(data); } catch (err) { setYogaError(err.message); } finally { setYogaLoading(false); }
  };

  const submitRunning = async (e) => {
    e.preventDefault();
    setRunningError(null); setRunningLoading(true);
    try { const data = await api.generateRunningPlan(runningForm); setRunningResult(data); } catch (err) { setRunningError(err.message); } finally { setRunningLoading(false); }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-neutral-50 to-brand-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-brand-700/20 transition-colors">
      <header className="flex items-center justify-between px-6 h-16 border-b border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/60 backdrop-blur">
        <div className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-white">Fit<span className="text-brand-600 dark:text-brand-500">Track</span></div>
        <div className="flex items-center gap-4 text-sm">
          <ThemeToggle />
          <span className="text-neutral-600 dark:text-neutral-400 hidden sm:inline">{user?.email}</span>
          <button onClick={logout} className="px-3 py-1.5 rounded-md bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-xs font-medium transition-colors">Logout</button>
        </div>
      </header>
      <main className="flex-1 px-6 py-8 space-y-10 max-w-7xl w-full mx-auto">
        <section>
          <h1 className="text-2xl font-semibold mb-2 text-neutral-900 dark:text-white">Welcome, {user?.username || 'User'}</h1>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm max-w-prose">Generate AI-powered workout routines and diet plans below. Adjust parameters and submit to fetch personalized results.</p>
        </section>
        <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
          {/* Workout Generator */}
          <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/60 backdrop-blur flex flex-col">
            <h2 className="text-lg font-medium mb-4 text-neutral-900 dark:text-white">Workout Generator</h2>
            <form onSubmit={submitWorkout} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wide text-neutral-600 dark:text-neutral-400">Target Muscle</label>
                  <select name="targetMuscle" value={workoutForm.targetMuscle} onChange={handleWorkoutChange} className="w-full bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-md px-2 py-2 text-sm focus:border-brand-600 dark:focus:border-brand-500 focus:outline-none">
                    {['chest','back','legs','arms','shoulders','core','full body'].map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wide text-neutral-600 dark:text-neutral-400">Duration (min)</label>
                  <input type="number" name="durationInMinutes" min={10} max={180} value={workoutForm.durationInMinutes} onChange={handleWorkoutChange} className="w-full bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-md px-2 py-2 text-sm focus:border-brand-600 dark:focus:border-brand-500 focus:outline-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wide text-neutral-600 dark:text-neutral-400">Fitness Level</label>
                  <select name="fitnessLevel" value={workoutForm.fitnessLevel} onChange={handleWorkoutChange} className="w-full bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-md px-2 py-2 text-sm focus:border-brand-600 dark:focus:border-brand-500 focus:outline-none">
                    {['beginner','intermediate','advanced'].map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
              </div>
              {workoutError && <div className="text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 border border-red-300 dark:border-red-700/40 rounded p-2">{workoutError}</div>}
              <button disabled={workoutLoading} className="inline-flex items-center gap-2 rounded-md bg-brand-600 hover:bg-brand-500 disabled:opacity-50 px-4 py-2 text-sm font-medium text-white transition-colors">
                {workoutLoading && <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin"/>}
                Generate Workout
              </button>
            </form>
            {workoutResult?.exercises && (
              <div className="mt-6 space-y-3 overflow-y-auto max-h-80 pr-1">
                <h3 className="text-sm font-medium text-neutral-800 dark:text-neutral-300">Exercises</h3>
                {workoutResult.exercises.map((ex,i) => (
                  <div key={i} className="p-3 rounded-lg bg-white/70 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/60">
                    <div className="flex justify-between text-sm font-medium text-neutral-900 dark:text-white"><span>{ex.name}</span><span className="text-brand-600 dark:text-brand-500">{ex.sets} x {ex.reps}</span></div>
                    {ex.description && <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">{ex.description}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Diet Planner */}
          <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/60 backdrop-blur flex flex-col">
            <h2 className="text-lg font-medium mb-4 text-neutral-900 dark:text-white">Diet Planner</h2>
            <form onSubmit={submitDiet} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wide text-neutral-600 dark:text-neutral-400">Preference</label>
                  <select name="dietaryPreference" value={dietForm.dietaryPreference} onChange={handleDietChange} className="w-full bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-md px-2 py-2 text-sm focus:border-brand-600 dark:focus:border-brand-500 focus:outline-none">
                    {['omnivore','vegetarian','vegan','keto','paleo','high protein'].map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wide text-neutral-600 dark:text-neutral-400">Goal</label>
                  <select name="fitnessGoal" value={dietForm.fitnessGoal} onChange={handleDietChange} className="w-full bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-md px-2 py-2 text-sm focus:border-brand-600 dark:focus:border-brand-500 focus:outline-none">
                    {['weight loss','muscle gain','maintenance'].map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wide text-neutral-600 dark:text-neutral-400">Daily Calories</label>
                  <input type="number" name="dailyCalories" min={1000} max={5000} value={dietForm.dailyCalories} onChange={handleDietChange} className="w-full bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-md px-2 py-2 text-sm focus:border-brand-600 dark:focus:border-brand-500 focus:outline-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wide text-neutral-600 dark:text-neutral-400">Allergies</label>
                  <input type="text" name="allergies" placeholder="e.g. nuts, dairy" value={dietForm.allergies} onChange={handleDietChange} className="w-full bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-md px-2 py-2 text-sm focus:border-brand-600 dark:focus:border-brand-500 focus:outline-none" />
                </div>
              </div>
              {dietError && <div className="text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 border border-red-300 dark:border-red-700/40 rounded p-2">{dietError}</div>}
              <button disabled={dietLoading} className="inline-flex items-center gap-2 rounded-md bg-brand-600 hover:bg-brand-500 disabled:opacity-50 px-4 py-2 text-sm font-medium text-white transition-colors">
                {dietLoading && <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin"/>}
                Generate Diet Plan
              </button>
            </form>
            {dietResult?.meals && (
              <div className="mt-6 space-y-3 overflow-y-auto max-h-80 pr-1">
                <h3 className="text-sm font-medium text-neutral-800 dark:text-neutral-300">Meals</h3>
                {dietResult.meals.map((m,i) => (
                  <div key={i} className="p-3 rounded-lg bg-white/70 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/60">
                    <div className="text-sm font-medium text-neutral-900 dark:text-white">{m.name}</div>
                    {m.ingredients && <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400"><span className="text-neutral-500 dark:text-neutral-500">Ingredients:</span> {m.ingredients}</p>}
                    <div className="mt-1 flex justify-between text-xs text-neutral-500 dark:text-neutral-500"><span>{m.calories} kcal</span></div>
                    {m.description && <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">{m.description}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Yoga Plan */}
          <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/60 backdrop-blur flex flex-col">
            <h2 className="text-lg font-medium mb-4 text-neutral-900 dark:text-white">Yoga Plan</h2>
            <form onSubmit={submitYoga} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs uppercase tracking-wide text-neutral-600 dark:text-neutral-400">Goal</label>
                  <select name="goal" value={yogaForm.goal} onChange={handleYogaChange} className="w-full bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-md px-2 py-2 text-sm focus:border-brand-600 dark:focus:border-brand-500 focus:outline-none">
                    {['Stress Relief','Morning Energy','Flexibility','Balance Focus','Relaxation'].map(g=> <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wide text-neutral-600 dark:text-neutral-400">Duration (min)</label>
                  <input type="number" name="durationInMinutes" min={5} max={90} value={yogaForm.durationInMinutes} onChange={handleYogaChange} className="w-full bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-md px-2 py-2 text-sm focus:border-brand-600 dark:focus:border-brand-500 focus:outline-none" />
                </div>
              </div>
              {yogaError && <div className="text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 border border-red-300 dark:border-red-700/40 rounded p-2">{yogaError}</div>}
              <button disabled={yogaLoading} className="inline-flex items-center gap-2 rounded-md bg-brand-600 hover:bg-brand-500 disabled:opacity-50 px-4 py-2 text-sm font-medium text-white transition-colors">
                {yogaLoading && <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin"/>}
                Generate Yoga Flow
              </button>
            </form>
            {yogaResult?.poses && (
              <div className="mt-6 space-y-3 overflow-y-auto max-h-80 pr-1">
                <h3 className="text-sm font-medium text-neutral-800 dark:text-neutral-300">Poses</h3>
                {yogaResult.poses.map((p,i) => (
                  <div key={i} className="p-3 rounded-lg bg-white/70 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/60">
                    <div className="flex justify-between text-sm font-medium text-neutral-900 dark:text-white"><span>{p.name}</span><span className="text-brand-600 dark:text-brand-500">{p.hold}</span></div>
                    {p.description && <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">{p.description}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Running Plan */}
          <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/60 backdrop-blur flex flex-col">
            <h2 className="text-lg font-medium mb-4 text-neutral-900 dark:text-white">Running Plan</h2>
            <form onSubmit={submitRunning} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs uppercase tracking-wide text-neutral-600 dark:text-neutral-400">Goal</label>
                  <select name="goal" value={runningForm.goal} onChange={handleRunningChange} className="w-full bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-md px-2 py-2 text-sm focus:border-brand-600 dark:focus:border-brand-500 focus:outline-none">
                    {['Run a 5k','Improve my pace','Increase endurance','Run a 10k'].map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wide text-neutral-600 dark:text-neutral-400">Timeframe</label>
                  <select name="timeframe" value={runningForm.timeframe} onChange={handleRunningChange} className="w-full bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-md px-2 py-2 text-sm focus:border-brand-600 dark:focus:border-brand-500 focus:outline-none">
                    {['4 weeks','6 weeks','8 weeks','10 weeks','12 weeks'].map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wide text-neutral-600 dark:text-neutral-400">Fitness Level</label>
                  <select name="fitnessLevel" value={runningForm.fitnessLevel} onChange={handleRunningChange} className="w-full bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-md px-2 py-2 text-sm focus:border-brand-600 dark:focus:border-brand-500 focus:outline-none">
                    {['beginner','intermediate','advanced'].map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
              </div>
              {runningError && <div className="text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 border border-red-300 dark:border-red-700/40 rounded p-2">{runningError}</div>}
              <button disabled={runningLoading} className="inline-flex items-center gap-2 rounded-md bg-brand-600 hover:bg-brand-500 disabled:opacity-50 px-4 py-2 text-sm font-medium text-white transition-colors">
                {runningLoading && <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin"/>}
                Generate Running Plan
              </button>
            </form>
            {runningResult?.weeks && (
              <div className="mt-6 space-y-4 overflow-y-auto max-h-80 pr-1">
                <h3 className="text-sm font-medium text-neutral-800 dark:text-neutral-300">Weeks</h3>
                {runningResult.weeks.map((w,i) => (
                  <div key={i} className="p-3 rounded-lg bg-white/70 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/60 space-y-2">
                    <div className="text-sm font-semibold text-neutral-900 dark:text-white">Week {w.weekNumber}</div>
                    <div className="space-y-1">
                      {w.sessions.map((s,si) => (
                        <div key={si} className="text-xs flex justify-between gap-4 text-neutral-700 dark:text-neutral-300">
                          <span className="font-medium min-w-[2.5rem]">{s.day}</span>
                          <span className="flex-1">{s.type}</span>
                          <span className="text-brand-600 dark:text-brand-500 min-w-[3rem] text-right">{s.distance}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <footer className="py-6 text-center text-xs text-neutral-500 dark:text-neutral-600 border-t border-neutral-200 dark:border-neutral-800">© {new Date().getFullYear()} FitTrack</footer>
    </div>
  );
}
