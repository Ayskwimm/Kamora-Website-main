/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'kamora-orange': '#FF6B35',
        'kamora-red': '#C73E1D',
        'kamora-cream': '#FFF8E1',
        'kamora-brown': '#8B4513',
        'kamora-dark': '#2C1810',
      },
       fontFamily: {
        'sans': ['Abraham', 'Inter', 'system-ui', 'sans-serif'],
        'display': ['Abraham', 'Inter', 'system-ui', 'sans-serif'],
        'heading': ['Abraham', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
