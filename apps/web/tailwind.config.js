/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Space Grotesk"', 'Inter', 'Plus Jakarta Sans', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
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
