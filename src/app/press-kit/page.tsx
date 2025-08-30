// src/app/press-kit/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Sidebar from '@/app/components/sidebar';

export default function PressKitPage() {
  const [recentlyViewed, setRecentlyViewed] = useState<{ title: string; url: string }[]>([]);
  const [userTags, setUserTags] = useState<Record<string, number>>({});

  useEffect(() => {
    const saved = localStorage.getItem('recentlyViewed');
    if (saved) setRecentlyViewed(JSON.parse(saved));

    const tags = localStorage.getItem('userTags');
    if (tags) setUserTags(JSON.parse(tags));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <main className="lg:col-span-2 space-y-8">
        <Link href="/" className="text-purple-500 hover:underline mb-4 inline-block">
          ← Назад к сайту
        </Link>

        <article className="card bg-bg-card rounded-2xl p-8 border border-border shadow-lg">
          <h1 className="text-3xl font-bold mb-4">📄 Пресс-кит GtaGo</h1>
          <p className="text-muted-foreground mb-6">
            20 октября 2024 • Автор: Редакция GtaGo
          </p>
          <img
            src="http://localhost:3000/logo.png"
            alt="Пресс-кит GtaGo"
            className="w-full h-64 object-cover rounded-xl mb-6"
          />

          <div className="prose prose-invert prose-lg max-w-none space-y-6">
            <p>
              GtaGo — это независимый игровой портал, созданный геймерами для геймеров. 
              Мы публикуем новости, обзоры, гайды и видео по GTA и другим экшен-играм.
            </p>

            <h2 className="text-2xl font-bold">📰 О проекте</h2>
            <p>
              GtaGo был запущен в 2023 году как альтернатива традиционным игровым СМИ. 
              Наша миссия — создавать качественный контент без кликбейта, рекламы и спама.
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Ежедневные новости и трейлеры</li>
              <li>Честные обзоры и гайды</li>
              <li>Видео и стримы</li>
              <li>Рейтинги и аналитика</li>
              <li>Персонализация по интересам</li>
            </ul>

            <h2 className="text-2xl font-bold">🎯 Аудитория</h2>
            <p>
              Наша аудитория — это активные геймеры 16–35 лет, интересующиеся GTA, 
              экшен-играми и киберкультурой.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-bg-card/80 p-4 rounded-xl border border-border text-center">
                <div className="text-2xl font-bold text-accent">850K+</div>
                <div className="text-sm text-muted-foreground mt-2">Ежемесячная аудитория</div>
              </div>
              <div className="bg-bg-card/80 p-4 rounded-xl border border-border text-center">
                <div className="text-2xl font-bold text-accent">78%</div>
                <div className="text-sm text-muted-foreground mt-2">Вовлечённость</div>
              </div>
              <div className="bg-bg-card/80 p-4 rounded-xl border border-border text-center">
                <div className="text-2xl font-bold text-accent">12 лет</div>
                <div className="text-sm text-muted-foreground mt-2">На рынке</div>
              </div>
            </div>

            <h2 className="text-2xl font-bold">🎨 Бренд</h2>
            <p>
              GtaGo — это не просто сайт. Это бренд, сочетающий в себе дух GTA, 
              экшен-игр и уличной культуры.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <h3 className="text-xl font-bold mb-2">Логотип</h3>
                <div className="bg-bg-card/80 p-4 rounded-xl border border-border">
                  <img 
                    src="http://localhost:3000/logo.png" 
                    alt="Логотип GtaGo" 
                    className="w-full h-32 object-contain"
                  />
                  <div className="mt-4 space-y-2">
                    <p className="text-sm text-muted-foreground">
                      <strong>Формат:</strong> PNG, SVG, JPG
                    </p>
                    <p className="text-sm text-muted-foreground">
                      
                    </p>
                    <a 
                      href="http://localhost:3000/logo.png" 
                      className="inline-block px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full text-sm hover:from-purple-700 hover:to-blue-700 transition"
                    >
                      Скачать логотип
                    </a>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Шрифты</h3>
                <div className="bg-bg-card/80 p-4 rounded-xl border border-border space-y-3">
                  <p className="text-sm text-muted-foreground">
                    <strong>Основной шрифт:</strong> Inter
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Моноширинный:</strong> JetBrains Mono
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Заголовки:</strong> Inter Bold, Gradient
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Текст:</strong> Inter Regular, 16px
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold">📸 Изображения</h2>
            <p>
              Все изображения на сайте — авторские или с разрешения правообладателей. 
              Для прессы доступны изображения в высоком качестве.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-bg-card/80 p-4 rounded-xl border border-border">
                <img 
                  src="https://cdn.akamai.steamstatic.com/steam/apps/2438840/header.jpg?t=1727639136" 
                  alt="Frostpunk 2" 
                  className="w-full h-32 object-cover rounded-lg"
                />
                <p className="text-xs text-muted-foreground mt-2 text-center">Frostpunk 2</p>
              </div>
              <div className="bg-bg-card/80 p-4 rounded-xl border border-border">
                <img 
                  src="https://media.contentapi.ea.com/content/dam/apex-legends/common/apex-legends-global-launch/launch-news-header.jpg" 
                  alt="GTA 6" 
                  className="w-full h-32 object-cover rounded-lg"
                />
                <p className="text-xs text-muted-foreground mt-2 text-center">GTA 6</p>
              </div>
              <div className="bg-bg-card/80 p-4 rounded-xl border border-border">
                <img 
                  src="https://cdn.akamai.steamstatic.com/steam/apps/1677740/header.jpg?t=1727639136" 
                  alt="Hollow Knight" 
                  className="w-full h-32 object-cover rounded-lg"
                />
                <p className="text-xs text-muted-foreground mt-2 text-center">Hollow Knight</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold">📱 Социальные сети</h2>
            <p>
              Подпишитесь на нас в социальных сетях, чтобы быть в курсе последних новостей.
            </p>
            <div className="flex flex-wrap gap-4 mt-4">
              {[
                { name: 'Telegram', url: 'https://t.me/gtagooo' },
                { name: 'ВКонтакте', url: 'https://vk.com/gtagoo' },
                { name: 'Boosty', url: 'https://boosty.to/gtago' },
              ].map((social) => (
                <a 
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full text-sm hover:from-purple-700 hover:to-blue-700 transition"
                >
                  {social.name}
                </a>
              ))}
            </div>

            <h2 className="text-2xl font-bold">📬 Контакты</h2>
            <p>
              По всем вопросам сотрудничества и прессы — пишите:
            </p>
            <div className="mt-4 space-y-2">
              <p className="text-muted-foreground">
                <strong>Email:</strong> <a href="mailto:press@gtago.ru" className="text-accent hover:underline">press@gtago.ru</a>
              </p>
              <p className="text-muted-foreground">
                <strong>Телефон:</strong> <a href="tel:+79991234567" className="text-accent hover:underline">+7 (999) 123-45-67</a>
              </p>
              <p className="text-muted-foreground">
                <strong>Адрес:</strong> Москва, ул. Геймеров, д. 15
              </p>
            </div>

            <h2 className="text-2xl font-bold">⚖️ Правила использования</h2>
            <p>
              При использовании материалов сайта GtaGo необходимо указывать источник. 
              Запрещено использовать контент в коммерческих целях без разрешения.
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-2">
              <li>Указывать ссылку на сайт</li>
              <li>Не изменять контент без согласия</li>
              <li>Не использовать в спам-рассылках</li>
              <li>Не копировать полностью без указания авторства</li>
            </ul>
          </div>

          <div className="tags flex flex-wrap gap-2 mt-8">
            {['пресс-кит', 'GtaGo', 'бренд', 'логотип', 'изображения', 'контакты'].map((tag) => (
              <span
                key={tag}
                className="tag bg-purple-500/15 text-foreground px-3 py-1 rounded-full text-xs font-semibold border border-purple-500/30 cursor-pointer hover:scale-110 transition"
                onClick={() => {
                  const newTags = { ...userTags, [tag]: (userTags[tag] || 0) + 1 };
                  setUserTags(newTags);
                  localStorage.setItem('userTags', JSON.stringify(newTags));
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </article>
      </main>
      <Sidebar />
    </div>
  );
}