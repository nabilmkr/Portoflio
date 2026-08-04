/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#111317',
        'bg-surface': '#1A1D24',
        'accent-primary': '#C5A880',
        'accent-secondary': '#4A6B82',
        'text-heading': '#EAEFF5',
        'text-body': '#94A3B8',
      },
      fontFamily: {
        sans: ['Onest', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Syne', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
