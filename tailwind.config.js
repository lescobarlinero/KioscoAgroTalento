/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#079646',
        secondary: '#0F5AA3',
      },
      fontFamily: {
        // use poppins from google fonts
        'sans': ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

