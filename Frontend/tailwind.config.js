/** @type {import('tailwindcss').Config} */
import scrollbar from 'tailwind-scrollbar' 

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      scrollbar: {
        width: '6px',
        thumb: 'white',
        track: 'transparent',
      }
    }
  },
  plugins: [scrollbar],
}