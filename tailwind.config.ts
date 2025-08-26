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
      colors: {
        'bg': 'var(--bg)',
        'bg-card': 'var(--bg-card)',
        'text': 'var(--text)',
        'text-muted': 'var(--text-muted)',
        'accent': 'var(--accent)',
        'border': 'var(--border)',
      },
      boxShadow: {
        'default': 'var(--shadow)',
        'hover': 'var(--shadow-hover)',
      },
      backgroundImage: {
        'gradient-accent': 'var(--gradient-accent)',
      },
    },
  },
  plugins: [],
};

export default config;