/** @type {import('tailwindcss').Config} */
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
  plugins: [
	require('tailwind-scrollbar'),
  ],
}