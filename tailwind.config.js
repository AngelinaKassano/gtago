// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ✅ Правильное определение цветов через функцию theme()
      colors: {
        'bg': 'rgb(var(--bg) / <alpha-value>)',
        'bg-card': 'rgb(var(--bg-card) / <alpha-value>)',
        'text': 'rgb(var(--text) / <alpha-value>)',
        'text-muted': 'rgb(var(--text-muted) / <alpha-value>)',
        'accent': 'rgb(var(--accent) / <alpha-value>)',
        'border': 'rgb(var(--border) / <alpha-value>)',
      },
    },
  },
  plugins: [],
};

export default config;