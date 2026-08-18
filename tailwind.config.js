/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
      },
      colors: {
        brand: {
          bg: '#090c12',
          card: '#111520',
          'card-hover': '#181e2e',
          accent: '#60a5fa',
          primary: '#3b82f6',
          green: '#10b981',
        }
      }
    },
  },
  plugins: [],
}
