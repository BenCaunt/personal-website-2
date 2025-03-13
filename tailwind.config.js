/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blue: {
          50: '#f0f7ff',
          100: '#e0f0ff',
          200: '#bae0ff',
          300: '#7cc5ff',
          400: '#36a5ff',
          500: '#0087ff',
          600: '#0068d6',
          700: '#0054ae',
          800: '#00468f',
          900: '#003b76',
        },
        yellow: {
          50: '#fffdf0',
          100: '#fffbe0',
          200: '#fff7c2',
          300: '#fff0a3',
          400: '#ffe566',
          500: '#ffd633',
          600: '#e6c229',
          700: '#cca81f',
          800: '#b38f1a',
          900: '#997517',
        },
      },
    },
  },
  plugins: [],
};
