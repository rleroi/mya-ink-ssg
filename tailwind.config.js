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
        ink: '#161514',
        paper: '#F5F4F1',
        plum: '#5E4D6C',
        lilac: '#C9BBD6',
        stone: '#E3DFD9',
        line: '#D9D5CF',
        muted: '#5F5B57',
        body: '#3F3C39',
        fog: '#CFCAC3',
        danger: '#9B2C2C',
      },
      fontFamily: {
        display: ['"Bodoni Moda"', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        site: '1280px',
      },
    },
  },
  plugins: [],
}
