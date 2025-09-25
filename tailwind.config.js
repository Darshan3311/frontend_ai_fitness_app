/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff5f5',
          100: '#ffe3e3',
          500: '#ef4444', // red-500
          600: '#dc2626', // red-600
          700: '#b91c1c'  // red-700
        }
      },
      boxShadow: {
        'brand-glow': '0 8px 24px -6px rgba(185,28,28,0.45), 0 2px 8px -2px rgba(220,38,38,0.35)'
      }
    },
  },
  plugins: [],
}
