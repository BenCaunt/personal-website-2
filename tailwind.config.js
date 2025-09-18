/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', '"Plus Jakarta Sans"', 'sans-serif'],
      },
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
        midnight: '#0f172a',
        aurora: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#d8ccfd',
          300: '#bba2fb',
          400: '#9b7af5',
          500: '#7c53ed',
          600: '#643bd3',
          700: '#522fb0',
          800: '#442a8c',
          900: '#3a2870',
        },
      },
      boxShadow: {
        glow: '0 20px 45px -20px rgba(37, 99, 235, 0.45)',
        'inner-glow': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.35)',
      },
      dropShadow: {
        aurora: '0 8px 24px rgba(59, 130, 246, 0.35)',
      },
      backgroundImage: {
        'radial-spot': 'radial-gradient(circle at 20% 20%, rgba(124, 83, 237, 0.18), transparent 55%)',
        'radial-spot-2': 'radial-gradient(circle at 80% 0%, rgba(14, 165, 233, 0.22), transparent 55%)',
        'grid-overlay': 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 0), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 0)',
      },
    },
  },
  plugins: [],
};
