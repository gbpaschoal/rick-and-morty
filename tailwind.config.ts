import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
    extend: {
      zIndex: {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
      },
      colors: {
        primary: {
          100: 'hsl(122, 92%, 42%)',
          300: 'hsl(122, 90%, 38%)',
        },
        secondary: {
          100: 'hsl(228, 22%, 12%)',
          200: 'hsl(228, 22%, 8%)',
          300: 'hsl(228, 22%, 4%)',
          400: 'hsl(228, 22%, 2%)',
        },
        gray: {
          100: 'hsl(0, 0%, 36%)',
          200: 'hsl(0, 0%, 32%)',
          300: 'hsl(0, 0%, 28%)',
          400: 'hsl(0, 0%, 24%)',
          500: 'hsl(0, 0%, 20%)',
          600: 'hsl(0, 0%, 16%)',
          700: 'hsl(0, 0%, 12%)',
          800: 'hsl(0, 0%, 8%)',
          900: 'hsl(0, 0%, 4%)',
          950: 'hsl(0, 0%, 2%)',
        },
        light: {
          100: 'hsl(0, 0%, 96%)',
          200: 'hsl(0, 0%, 92%)',
          300: 'hsl(0, 0%, 88%)',
        },
        red: '#C91515',
      },
      borderWidth: {
        1: '1px',
      },
    },
  },
  plugins: [],
} satisfies Config

