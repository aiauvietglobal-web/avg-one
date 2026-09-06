/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        odoo: {
          purple: '#714B67',
          darkPurple: '#2C1D29',
          bg: '#F8F9FA',
          border: '#E9ECEF',
          text: '#333333'
        }
      }
    },
  },
  plugins: [],
}
