/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens:{
      'sm': {'min': '300px', 'max': '720px' }
    },
    extend: {},
  },
  plugins: [],
}