/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./pages/**/*.{vue,js,ts,jsx,tsx}",
    "./renderer/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'rgba(94,77,108,255)',
        secondary: 'rgb(138,129,144)',
        accent: 'rgb(198,215,81)',
      },
    },
  },
  plugins: [],
}
