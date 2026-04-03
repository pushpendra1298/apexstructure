/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        nero: '#0a0c14',
        slate: '#1f2937',
        steel: '#3d4c59',
        'steel-light': '#5f7082',
        accent: '#f97316',
        'accent-soft': '#fba94c',
      },
      boxShadow: {
        soft: '0 20px 40px rgba(8, 16, 30, 0.35)',
        glow: '0 0 45px rgba(249, 115, 22, 0.32)',
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'Arial', 'sans-serif'],
        body: ['Poppins', 'system-ui', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
