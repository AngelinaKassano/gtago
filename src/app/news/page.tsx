// src/app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/app/components/sidebar';
import { allNews } from '@/data/news';

export default function Home() {
  const [recentlyViewed, setRecentlyViewed] = useState<{ title: string; url: string }[]>([]);
  const [userTags, setUserTags] = useState<Record<string, number>>({});

  useEffect(() => {
    const saved = localStorage.getItem('recentlyViewed');
    if (saved) setRecentlyViewed(JSON.parse(saved));

    const tags = localStorage.getItem('userTags');
    if (tags) setUserTags(JSON.parse(tags));
  }, []);

  // 🔥 Добавляем новость про Cyberpunk 2077
  const cyberpunkNews = {
    id: 'cyberpunk-2077',
    title: 'Cyberpunk 2077 получает DLC «Phantom Liberty» — новый трейлер',
    excerpt: 'CD Projekt Red показала новый трейлер дополнения «Phantom Liberty» с Икханом и новыми миссиями в стиле шпионского триллера.',
    content: `CD Projekt Red показала новый трейлер дополнения «Phantom Liberty» с Икханом и новыми миссиями в стиле шпионского триллера. DLC выйдет 25 сентября 2024 года и принесёт игрокам новые миссии, персонажей и улучшения геймплея. Главной особенностью станет Икхан — загадочный агент, чьи действия ставят под угрозу весь Найт-Сити. Игрокам предстоит разгадать его истинные мотивы и принять решение, которое повлияет на судьбу города. Также в DLC добавлены улучшенные системы боёв, хакинга и диалогов. Новые NPC будут реагировать на действия игрока, а их поведение станет более динамичным и непредсказуемым. Технология уже тестируется в проектах от Ubisoft и CD Projekt.`,
    author: 'Артём Лебедев',
    date: '10 октября 2024',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg?t=1727639136',
    tags: ['RPG', 'CD Projekt', 'Phantom Liberty', 'киберпанк'],
  };

  // 🔄 Формируем список новостей: Cyberpunk + все остальные (без дубликатов)
  const newsWithCyberpunk = [
    cyberpunkNews,
    ...allNews.filter(n => n.id !== 'cyberpunk-2077')
  ];

  // Главная новость (Frostpunk 2)
  const featuredNews = allNews.find(n => n.id === 'frostpunk-2') || allNews[0];

  // 🔥 Специальная новость — Cyberpunk 2077 (вместо Sony PS+)
  const cyberpunkSpotlight = {
    id: 'cyberpunk-2077',
    title: 'Cyberpunk 2077 получит DLC «Phantom Liberty» — новый трейлер',
    excerpt: 'CD Projekt Red показала новый трейлер дополнения «Phantom Liberty» с Икханом и новыми миссиями в стиле шпионского триллера.',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg?t=1727639136',
    date: '10 октября 2024',
    author: 'Артём Лебедев',
  };

  // 🔄 Формируем три карточки: [1] GTA 6, [2] Hollow Knight, [3] Cyberpunk
  const sideNews = [
    allNews.find(n => n.id === 'gta-6'),
    allNews.find(n => n.id === 'hollow-knight-silksong'),
    cyberpunkSpotlight,
  ].filter(Boolean); // Убираем undefined

  return (
    <div className="space-y-8">
      {/* === Главный баннер (1280x430) === */}
      <section className="max-w-6xl mx-auto px-4">
        <Link href={`/news/${featuredNews.id}`}>
          <div
            className="w-full h-[430px] bg-cover bg-center rounded-2xl overflow-hidden relative group cursor-pointer"
            style={{ backgroundImage: `url(${featuredNews.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <div className="absolute bottom-8 left-8 text-white max-w-2xl">
              <span className="text-sm uppercase font-semibold text-purple-300">Главная новость</span>
              <h2 className="text-3xl font-bold mt-2">{featuredNews.title}</h2>
              <p className="text-lg opacity-90 mt-2 line-clamp-2">{featuredNews.excerpt}</p>
              <div className="text-sm opacity-75 mt-4">
                {featuredNews.date} • {featuredNews.author}
              </div>
            </div>
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition"></div>
          </div>
        </Link>
      </section>

      {/* === Три карточки (384x220) — Cyberpunk рядом с Hollow Knight === */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sideNews.map((news: any) => (
            <Link key={news.id} href={`/news/${news.id}`} className="block group">
              <div className="relative rounded-xl overflow-hidden shadow-md h-[220px]">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${news.image})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-bold line-clamp-2">{news.title}</h3>
                  <p className="text-sm opacity-80 mt-1">{news.date}</p>
                </div>
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-20 transition"></div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* === Основная лента новостей === */}
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <h1 className="text-3xl font-bold mb-8">Последние новости</h1>
          {newsWithCyberpunk.map((news) => (
            <article key={news.id} className="card bg-bg-card rounded-2xl p-6 border border-border shadow-lg">
              <div className="flex gap-6 items-center">
                <Link href={`/news/${news.id}`}>
                  <img
                    src={news.image}
                    alt={news.title}
                    width={218}
                    height={124}
                    className="rounded-xl object-cover shadow"
                  />
                </Link>
                <div>
                  <h2 className="text-xl font-bold mb-2">
                    <Link href={`/news/${news.id}`} className="hover:text-accent transition">
                      {news.title}
                    </Link>
                  </h2>
                  <p className="text-muted-foreground text-sm mb-2">
                    {news.date} • Автор: {news.author}
                  </p>
                  <p className="text-muted-foreground line-clamp-3 text-sm mb-3">
                    {news.excerpt}
                  </p>
                  <div className="tags flex flex-wrap gap-2">
                    {news.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="tag bg-purple-500/15 text-foreground px-3 py-1 rounded-full text-xs font-semibold border border-purple-500/30 cursor-pointer hover:scale-110 transition"
                        onClick={(e) => {
                          e.preventDefault();
                          const newTags = { ...userTags, [tag]: (userTags[tag] || 0) + 1 };
                          setUserTags(newTags);
                          localStorage.setItem('userTags', JSON.stringify(newTags));
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
        <Sidebar />
      </div>
    </div>
  );
}