// src/app/not-found.tsx
'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

  
  



export default function NotFoundPage() {
  useEffect(() => {
    const container = document.createElement('div');
    container.className = 'game-bg';
    document.body.appendChild(container);

    // Создаём 20 частиц
    for (let i = 0; i < 20; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.left = Math.random() * 100 + 'vw';
      p.style.top = Math.random() * 100 + 'vh';
      p.style.width = Math.random() * 3 + 'px';
      p.style.height = Math.random() * 3 + 'px';
      p.style.opacity = Math.random() * 0.8 + 0.2;
      p.style.animation = `float ${Math.random() * 10 + 5}s infinite linear`;
      p.style.backgroundColor = '#a855f7';
      container.appendChild(p);
    }

    return () => {
      container.remove();
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg text-text px-4 relative overflow-hidden">
      {/* Фон и частицы создаются через JS */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }

        .game-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: -2;
          background: 
            radial-gradient(circle at 15% 50%, rgba(168, 85, 247, 0.05), transparent 30%),
            radial-gradient(circle at 85% 20%, rgba(59, 130, 246, 0.05), transparent 30%);
          background-size: 40px 40px;
          opacity: 0.3;
        }

        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 50% 50%, rgba(26, 26, 31, 0.8), rgba(10, 10, 15, 0.95));
          z-index: -1;
        }
      `}</style>
      <div className="overlay"></div>

      {/* Основной контент */}
      <div className="text-center space-y-8 max-w-2xl mx-auto z-10 px-4">
        {/* 404 с иконкой */}
        <div className="flex justify-center items-center space-x-4 text-8xl font-bold">
          <div className="animate-pulse">4</div>
          <div className="text-6xl transform -translate-y-4">
            🎮
          </div>
          <div className="animate-pulse">4</div>
        </div>

        {/* Заголовок */}
        <h1 className="text-5xl font-bold bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
          Страница не найдена
        </h1>

        {/* Описание */}
        <p className="text-xl text-muted-foreground leading-relaxed">
          Похоже, вы зашли слишком глубоко в Зону...<br />
          Эта страница не существует или была перемещена.
        </p>

        {/* Кнопка */}
        <div className="pt-4">
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-blue-700 transition transform hover:scale-105 shadow-lg"
          >
            Вернуться на главную
          </Link>
        </div>

        {/* Подсказка */}
        <p className="text-sm text-muted-foreground">
          Или используйте поиск в шапке сайта, чтобы найти нужное.
        </p>
      </div>
    </div>
    
  );
  
}