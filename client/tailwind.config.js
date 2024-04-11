/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      height: {
        '100vh-menu': 'calc(100vh - 76px)',
      },
    },
  },
  plugins: [],
}