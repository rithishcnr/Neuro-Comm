/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B82F6',
          dark: '#2563EB',
        },
        secondary: {
          DEFAULT: '#10B981',
          dark: '#059669',
        },
        background: {
          primary: '#121212',
          secondary: '#1A1A1A',
          tertiary: '#2A2A2A',
        }
      }
    },
  },
  plugins: [],
} 