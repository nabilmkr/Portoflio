/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0d0d0c',
        'bg-surface': '#141412',
        'bg-surface-alt': '#1c1b18',
        'accent-primary': '#E8613A',
        'accent-soft': 'rgba(232, 97, 58, 0.12)',
        border: 'rgba(255, 255, 255, 0.08)',
        'text-heading': '#f4f0e8',
        'text-body': 'rgba(244, 240, 232, 0.7)',
      },
      fontFamily: {
        sans: ['Onest', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Syne', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
