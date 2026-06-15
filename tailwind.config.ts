/** @type {import('tailwindcss').Config} */
export default {
  content: ['./entrypoints/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        harvest: { 50: '#f0fdf4', 500: '#22c55e', 600: '#16a34a', 700: '#15803d', 900: '#14532d' },
      },
    },
  },
  plugins: [],
};
