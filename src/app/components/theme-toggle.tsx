// src/components/theme-toggle.tsx
'use client';

import { useTheme } from '@/lib/theme';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const handleClick = (e: React.MouseEvent) => {
    const effect = document.createElement('div');
    effect.className = 'click-effect';
    effect.style.left = `${e.pageX}px`;
    effect.style.top = `${e.pageY}px`;
    document.body.appendChild(effect);
    setTimeout(() => effect.remove(), 600);
    toggleTheme();
  };

  if (!theme) return null;

  return (
    <button
      onClick={handleClick}
      className="text-muted-foreground hover:text-accent transition-transform hover:scale-110 ml-4"
      aria-label="Сменить тему"
    >
      {theme === 'dark' ? '🌞' : '🌙'}
    </button>
  );
}