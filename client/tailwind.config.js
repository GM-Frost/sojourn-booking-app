/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: '#605bcf',
        secondary: '#6366f1',//#a093ff '#8076ef'
        neutral:'#0a1616',
      }
    },
  },
  plugins: [],
}

