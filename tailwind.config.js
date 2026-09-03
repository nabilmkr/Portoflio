/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#FAFAF8',
        'bg-surface': '#F2F0EC',
        'bg-surface-alt': '#E8E5DF',
        'accent-primary': '#E8613A',
        'accent-soft': 'rgba(232, 97, 58, 0.1)',
        border: '#E0DDD7',
        'text-heading': '#1A1A1A',
        'text-body': '#6B6B6B',
      },
      fontFamily: {
        sans: ['Onest', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Syne', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
