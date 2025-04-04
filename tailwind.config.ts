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
        "carbon": "#0A0A0A",
        "silver": "#D5D5D5 ",
        "emerald-flash": "#0DA612",
        "carbon-light": ''
      },
      borderWidth: {
        1: '1px',
      },
    },
  },
  plugins: [],
} satisfies Config

