// src/app/components/notification-banner.tsx
'use client';

import { useEffect, useState } from 'react';

export default function NotificationBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Проверяем, прошло ли 2 часа с последнего показа
    const lastShown = localStorage.getItem('notificationLastShown');
    const now = Date.now();
    const twoHours = 2 * 60 * 60 * 1000; // 2 часа в миллисекундах

    if (!lastShown || now - parseInt(lastShown) > twoHours) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('notificationLastShown', Date.now().toString());
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm w-full">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl p-6 border border-border shadow-xl animate-slide-up">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-bold text-lg mb-2">⚠️ Тестирование сайта</h4>
            <p className="text-sm opacity-90">
              Сайт находится в активной разработке. Возможны баги, ошибки и сбои. 
              Мы работаем над улучшением UX/UI и контентом.
            </p>
          </div>
          <button 
            onClick={handleClose}
            className="text-white hover:text-red-300 transition text-xl"
            aria-label="Закрыть"
          >
            ✕
          </button>
        </div>
        <div className="mt-4 text-xs opacity-75">
          
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}