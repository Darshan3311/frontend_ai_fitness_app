# Fitness App Frontend (Auth Module)

React + Vite + Tailwind CSS implementation focused on authentication (login, register, protected dashboard shell).

## Features Implemented
- Vite + React 19
- Tailwind CSS (utility-first styling)
- Responsive auth pages (Login, Register)
- Protected dashboard route with token gate
- Auth context with JWT storage (localStorage)
- API abstraction (configurable base URL via env)
- Basic form validation + loading + error states

## Project Structure (Relevant Parts)
```
src/
  context/AuthContext.jsx   # Auth state, login/register/logout
  lib/api.js                # Fetch wrapper + auth endpoints
  pages/Login.jsx           # Login form
  pages/Register.jsx        # Registration form
  pages/Dashboard.jsx       # Protected demo page
  components/ProtectedRoute # Route guard
  components/AuthLayout     # Shared auth layout shell
```

## Environment Setup
Copy the example env file and adjust if backend host differs:
```
cp .env.example .env
```
Default expects backend at: `http://localhost:8080/api`

Variable:
- `VITE_API_BASE_URL` (no trailing slash after `/api`)

## Install & Run
```
npm install
npm run dev
```
Open: http://localhost:5173

## Build Production Bundle
```
npm run build
npm run preview
```

## Auth Flow
1. User registers (POST /api/auth/register) → backend returns token + user info.
2. Token stored in localStorage (`token`).
3. Protected routes require token (client-side guard).
4. Logout clears token + user state.

## Tailwind
- Config: `tailwind.config.js`
- Directives: `src/index.css`
- Scan paths: `index.html`, `src/**/*.{js,jsx,ts,tsx}`

## Customization Tips
- Extend design: edit `tailwind.config.js` under `theme.extend`.
- Add protected pages: place under `pages/` and nest inside `<ProtectedRoute />` in `App.jsx`.
- Add API calls: extend `src/lib/api.js` with more endpoints.

## Next Suggested Enhancements
- Persist decoded user metadata with a `/me` endpoint refresh.
- Token refresh / expiration handling.
- Form accessibility improvements & ARIA live regions.
- Error boundary + toast notifications.
- Dark/light theme toggle.

## Notes
JWT is only stored and minimally decoded client-side for UI; server must still validate on protected resources.
