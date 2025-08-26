// src/app/components/header.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import SearchBar from './search-bar';
import ThemeToggle from './theme-toggle';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '/news', label: 'Новости' },
    { href: '/reviews', label: 'Обзоры' },
    { href: '/guides', label: 'Гайды' },
    { href: '/videos', label: 'Видео' },
    { href: '/ratings', label: 'Рейтинги' },
    { href: '/advertising', label: 'Реклама' },
    { href: '/support', label: 'Поддержать' },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-opacity-90 border-b border-border flex justify-between items-center p-4 mb-8">
      {/* Логотип */}
      <Link 
        href="/" 
        className="logo text-2xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent cursor-pointer"
        onClick={() => setIsMenuOpen(false)}
      >
        GtaGo
      </Link>

      {/* Навигация для десктопа */}
      <nav className="hidden md:flex space-x-6">
        {navLinks.map((link) => (
          <Link 
            key={link.href} 
            href={link.href}
            className="text-muted-foreground hover:text-accent transition"
            onClick={() => setIsMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Поиск и тема */}
      <div className="hidden md:flex items-center gap-4">
        <SearchBar />
        <ThemeToggle />
      </div>

      {/* Бургер-меню для мобильных */}
      <div className="md:hidden flex items-center gap-4">
        <ThemeToggle />
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-muted-foreground hover:text-accent transition text-2xl"
          aria-label="Меню"
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </div>

    {/* Мобильное меню в стиле сайта */}
{isMenuOpen && (
  <div className="md:hidden fixed inset-0 top-16 bg-bg z-40 flex flex-col p-4 space-y-4 border-t border-border animate-slide-down">
    <div className="bg-bg-card rounded-2xl p-4 border border-border">
      <SearchBar />
    </div>
    <nav className="bg-bg-card rounded-2xl p-4 border border-border space-y-2">
      {navLinks.map((link) => (
        <Link 
          key={link.href} 
          href={link.href}
          className="block text-muted-foreground hover:text-accent py-3 px-4 rounded-lg transition"
          onClick={() => setIsMenuOpen(false)}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  </div>
)}

      <style jsx>{`
        @keyframes slide-down {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
    </header>
  );
}