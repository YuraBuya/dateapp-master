/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF5C8A',
          50: '#FFF1F4',
          100: '#FFE4EA',
          200: '#FFCDD6',
          300: '#FFA1B5',
          400: '#FF6B8E',
          500: '#FF5C8A',
          600: '#EF2853',
          700: '#D11A3D',
          800: '#B01A37',
          900: '#951B34',
        },
        secondary: {
          DEFAULT: '#6C5CE7',
          50: '#F4F3FF',
          100: '#EBE9FF',
          200: '#D9D6FF',
          300: '#BFB8FF',
          400: '#A193FF',
          500: '#6C5CE7',
          600: '#5B4AE5',
          700: '#4C3DCF',
          800: '#3F33AA',
          900: '#352E87',
        },
        accent: {
          DEFAULT: '#00D1B2',
          50: '#F0FFFE',
          100: '#CCFFF7',
          200: '#99FFF0',
          300: '#5CFFE7',
          400: '#1DFDD8',
          500: '#00D1B2',
          600: '#00A896',
          700: '#008577',
          800: '#006A5F',
          900: '#00574F',
        },
      },
      fontFamily: {
        sans: [
          "Pretendard Variable", 
          "Pretendard", 
          "-apple-system", 
          "BlinkMacSystemFont", 
          "Apple SD Gothic Neo", 
          "Malgun Gothic", 
          "Noto Sans KR", 
          "Segoe UI", 
          "Roboto", 
          "sans-serif"
        ],
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'card': '0 6px 20px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 10px 30px rgba(0, 0, 0, 0.12)',
        'button': '0 4px 14px rgba(255, 92, 138, 0.25)',
        'glass': '0 8px 32px rgba(31, 38, 135, 0.37)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.4s ease-out',
        'scale-up': 'scaleUp 0.3s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleUp: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },
    },
  },
  plugins: [],
}
