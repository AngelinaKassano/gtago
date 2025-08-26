// src/lib/theme.tsx
'use client'; // ✅ Обязательно: в самое начало файла

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
type ThemeContextType = {
  theme: Theme | null;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  // Определяем начальную тему
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(saved === 'light' || saved === 'dark' ? saved : prefersDark ? 'dark' : 'light');
  }, []);

  // Применяем тему к <html>
  useEffect(() => {
    if (!theme) return;
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}