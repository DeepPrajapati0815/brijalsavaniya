import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: 'hsl(0 0% 100%)',
          dark: 'hsl(222 47% 7%)',
        },
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.10)',
        softDark: '0 12px 40px rgba(0,0,0,0.35)',
      },
    },
  },
  plugins: [],
};

export default config;
