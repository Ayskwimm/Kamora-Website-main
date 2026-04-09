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
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
