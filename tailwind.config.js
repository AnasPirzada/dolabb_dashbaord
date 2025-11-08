/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'saudi-green': '#006747',
        'rich-sand': '#E8D4B0',
        'deep-charcoal': '#333333',
        'off-white': '#F9F9F9',
        'desert-gold': '#FFD700',
        'coral-red': '#FF6F61',
        'royal-blue': '#0066CC',
      },
    },
  },
  plugins: [],
}

