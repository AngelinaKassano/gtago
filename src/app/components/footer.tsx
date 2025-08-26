// src/components/footer.tsx
'use client';

import Link from 'next/link';
import { FaBeer } from 'react-icons/fa';
import { PiTelegramLogo } from "react-icons/pi";
import { SiVk } from "react-icons/si";

export default function Footer() {
  // 🟩 Функция для создания эффекта вспышки
  const handleClickEffect = (e: React.MouseEvent) => {
    const effect = document.createElement('div');
    effect.className = 'click-effect';
    effect.style.left = `${e.pageX}px`;
    effect.style.top = `${e.pageY}px`;
    document.body.appendChild(effect);
    setTimeout(() => effect.remove(), 600);
  };

  return (
    <footer className="border-t border-border py-12 text-muted-foreground">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        
        {/* Основной блок */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xl font-bold text-foreground">GtaGo</h3>
          <p className="text-sm leading-relaxed">
            Ваш главный источник новостей, обзоров и гайдов по GTA и другим экшен-играм. 
            Актуальные трейлеры, релизы и аналитика — всё в одном месте.
          </p>
          <div className="flex space-x-4 text-sm">
            <Link 
              href="/privacy" 
              className="hover:text-accent transition"
              onClick={handleClickEffect}
            >
              Политика конфиденциальности
            </Link>
            <Link 
              href="/terms" 
              className="hover:text-accent transition"
              onClick={handleClickEffect}
            >
              Условия использования
            </Link>
          </div>

          {/* Социальные сети */}
          <div className="flex space-x-4 mt-6">
            {[
              { href: 'https://t.me/gtago', label: 'Telegram', icon: <PiTelegramLogo /> },
              { href: 'https://vk.com/gtago', label: 'ВКонтакте', icon: <SiVk /> },
            ].map((social) => (
              <Link
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition transform hover:scale-110"
                aria-label={social.label}
                onClick={handleClickEffect}
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>

        {/* Разделы */}
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Навигация</h4>
          <ul className="space-y-2 text-sm">
            {[
              { href: '/news', label: 'Новости' },
              { href: '/reviews', label: 'Обзоры' },
              { href: '/guides', label: 'Гайды' },
              { href: '/videos', label: 'Видео' },
              { href: '/ratings', label: 'Рейтинги' },
            ].map((item) => (
              <li key={item.href}>
                <Link 
                  href={item.href} 
                  className="text-muted-foreground hover:text-accent block transition"
                  onClick={handleClickEffect}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Поддержка */}
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Поддержка</h4>
          <ul className="space-y-2 text-sm">
            {[
              { href: '/help', label: 'Помощь по сайту' },
              { href: '/faq', label: 'Вопросы и ответы' },
              { href: '/contact', label: 'Обратная связь' },
              { href: '/advertising', label: 'Реклама на сайте' },
            ].map((item) => (
              <li key={item.href}>
                <Link 
                  href={item.href} 
                  className="text-muted-foreground hover:text-accent block transition"
                  onClick={handleClickEffect}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Для блогеров */}
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Блогерам</h4>
          <ul className="space-y-2 text-sm">
            {[
              { href: '/bloggers', label: 'Сотрудничество' },
              { href: '/press-kit', label: 'Пресс-кит' },
              { href: '/api', label: 'API сайта' },
              { href: '/guidelines', label: 'Правила контента' },
            ].map((item) => (
              <li key={item.href}>
                <Link 
                  href={item.href} 
                  className="text-muted-foreground hover:text-accent block transition"
                  onClick={handleClickEffect}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Нижняя полоса */}
      <div className="max-w-6xl mx-auto px-4 mt-8 pt-6 border-t border-border text-center text-sm">
        &copy; {new Date().getFullYear()} GtaGo — Всё о видеоиграх, особенно о GTA. 
      </div>
    </footer>
  );
}