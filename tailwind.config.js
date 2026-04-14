/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
      },
      colors: {
        bg: '#F5F4F0',
        ink: '#1A1A1A',
        muted: '#888888',
        accent: '#C8A882',
      },
    },
  },
  plugins: [],
}
