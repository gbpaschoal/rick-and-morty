import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        gray: {
          '100': 'var(--gray-100)',
          '200': 'var(--gray-200)',
          '400': 'var(--gray-400)',
          '700': 'var(--gray-700)',
          '800': 'var(--gray-800)',
          '900': 'var(--gray-900)',
        }
      },
      screens: {
        xs: "20rem",
        sm: '30rem',
        md: '48rem',
        lg: '64rem',
        xl: '80rem',
        '2xl': '96rem',
      },
      zIndex: {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
      },
      borderWidth: {
        1: '1px',
      },
    },
  },
  plugins: [],
} satisfies Config

