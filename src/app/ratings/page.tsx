// src/app/ratings/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/app/components/sidebar';

export default function RatingsPage() {
  const [recentlyViewed, setRecentlyViewed] = useState<{ title: string; url: string }[]>([]);
  const [userTags, setUserTags] = useState<Record<string, number>>({});

  useEffect(() => {
    const saved = localStorage.getItem('recentlyViewed');
    if (saved) setRecentlyViewed(JSON.parse(saved));

    const tags = localStorage.getItem('userTags');
    if (tags) setUserTags(JSON.parse(tags));
  }, []);

  const ratings = [
    {
      id: 'top-strategy-2025',
      title: 'Топ-10 стратегий 2025 года',
      author: 'Редакция StopGame',
      date: '15 октября 2024',
      image: 'https://cdn.akamai.steamstatic.com/steam/apps/2438840/header.jpg?t=1727639136',
      excerpt: 'Frostpunk 2, Cities: Skylines II, Total War: Pharaoh — лучшие стратегии года по версии StopGame.',
      tags: ['рейтинг', 'стратегия', '2025'],
    },
    {
      id: 'best-rpg',
      title: 'Лучшие RPG за последние 5 лет',
      author: 'Редакция StopGame',
      date: '14 октября 2024',
      image: 'https://cdn.akamai.steamstatic.com/steam/apps/1086940/header.jpg?t=1727639136',
      excerpt: 'От The Witcher 3 до Baldur\'s Gate 3 — топ-игр, которые определили жанр RPG.',
      tags: ['рейтинг', 'RPG', 'лучшие игры'],
    },
    {
      id: 'ps5-games',
      title: 'Топ-5 игр для PS5',
      author: 'Редакция StopGame',
      date: '13 октября 2024',
      image: 'https://www.playstation.com/content/dam/cdp/store-954/ps-plus/2024/november/ps-plus-nov-2024-hero.jpg',
      excerpt: 'Demon\'s Souls, God of War: Ragnarök, Spider-Man 2 — лучшие эксклюзивы консоли.',
      tags: ['рейтинг', 'PS5', 'эксклюзивы'],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Основной контент */}
      <main className="lg:col-span-2 space-y-8">
        <h1 className="text-3xl font-bold mb-8">Рейтинги</h1>
        {ratings.map((rating) => (
          <article key={rating.id} className="card bg-bg-card rounded-2xl p-6 border border-border shadow-lg">
            <div className="flex gap-6 items-center">
              <Link href={`/ratings/${rating.id}`}>
                <img
                  src={rating.image}
                  alt={rating.title}
                  width={218}
                  height={124}
                  className="rounded-xl object-cover shadow"
                />
              </Link>
              <div>
                <h2 className="text-xl font-bold mb-2">
                  <Link href={`/ratings/${rating.id}`} className="hover:text-accent transition">
                    {rating.title}
                  </Link>
                </h2>
                <p className="text-muted-foreground text-sm mb-2">
                  {rating.date} • Автор: {rating.author}
                </p>
                <p className="text-muted-foreground line-clamp-3 text-sm mb-3">
                  {rating.excerpt}
                </p>
                <div className="tags flex flex-wrap gap-2">
                  {rating.tags.map((tag) => (
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
              </div>
            </div>
          </article>
        ))}
      </main>

      {/* Сайдбар */}
      <Sidebar />
    </div>
  );
}