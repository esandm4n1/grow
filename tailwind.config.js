/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Kings theme
        kings: {
          bg: '#0A0A0A',
          card: '#1A1A1A',
          cardAlt: '#141414',
          border: '#222222',
          bone: '#F5F1E8',
          boneDim: '#A8A49D',
          red: '#D32027',
          redBright: '#FF2938',
          redDark: '#8B0F15',
          gold: '#FFB800',
        },
        // Backwards compat names (mapped to Kings palette)
        primary: {
          50: '#2a1013',
          100: '#3a1015',
          500: '#D32027',
          600: '#B01C22',
          700: '#8B0F15',
        },
        accent: {
          500: '#FFB800',
          600: '#E6A700',
          100: '#4a3a10',
        },
        success: {
          500: '#34C759',
          600: '#2BA047',
          50: '#0a1f12',
          100: '#0f2f18',
          200: '#1a4a27',
        },
        danger: {
          500: '#FF3B30',
          600: '#DC2626',
        },
      },
      fontFamily: {
        sans: ['Noto Sans JP', 'Hiragino Sans', 'Yu Gothic', 'Meiryo', 'sans-serif'],
        display: ['Oswald', 'Impact', 'sans-serif'],
        num: ['Bebas Neue', 'Impact', 'sans-serif'],
        jersey: ['Staatliches', 'Impact', 'sans-serif'],
      },
      fontSize: {
        'kid-base': '18px',
        'kid-lg': '20px',
        'kid-xl': '24px',
      },
    },
  },
  plugins: [],
}
