// src/app/epic/far-cry-6/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/app/components/sidebar';

export default function FarCry6Page() {
  const [recentlyViewed, setRecentlyViewed] = useState<{ title: string; url: string }[]>([]);
  const [userTags, setUserTags] = useState<Record<string, number>>({});

  useEffect(() => {
    const saved = localStorage.getItem('recentlyViewed');
    if (saved) setRecentlyViewed(JSON.parse(saved));

    const tags = localStorage.getItem('userTags');
    if (tags) setUserTags(JSON.parse(tags));
  }, []);

  const news = {
    id: 'far-cry-6',
    title: 'Far Cry 6 — бесплатно до 5 апреля',
    excerpt: 'Ubisoft объявила, что Far Cry 6 будет доступна бесплатно до 5 апреля. Игра появится на всех платформах, включая PC и консоли...',
    content: `Ubisoft объявила, что Far Cry 6 будет доступна бесплатно до 5 апреля. Игра появится на всех платформах, включая PC и консоли. Поклонники ждали анонса более 3 лет.

Far Cry 6 перенесёт игроков в новое королевство — Йара. Главной героиней станет Дани Ромеро, революционер, который борется за свободу острова. Игра сохранит фирменный стиль шутера: сложные боссы, скрытые пещеры, минималистичный сюжет и потрясающая музыка.

Разработчики показали геймплей: новые способности, комбо с ядовитыми шипами, лазание по паутине и сражения с гигантскими насекомыми. Боевая система стала глубже, а уровень детализации — впечатляет.

Far Cry 6 была культовой игрой 2021 года. Теперь её можно получить бесплатно — или даже превзойти его.`,
    author: 'Анна Петрова',
    date: '16 октября 2024',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1690060/header.jpg?t=1727639136',
    tags: ['экшен', 'Ubisoft', 'открытый мир'],
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <main className="lg:col-span-2 space-y-8">
        <Link href="/" className="text-purple-500 hover:underline mb-4 inline-block">
          ← Назад к новостям
        </Link>

        <article className="card bg-bg-card rounded-2xl p-8 border border-border shadow-lg">
          <h1 className="text-3xl font-bold mb-4">{news.title}</h1>
          <p className="text-muted-foreground mb-6">
            {news.date} • Автор: {news.author}
          </p>
          <img
            src={news.image}
            alt={news.title}
            className="w-full h-64 object-cover rounded-xl mb-6"
          />
          <div className="prose prose-invert prose-lg max-w-none">
            {news.content.split('\n\n').map((p, i) => (
              <p key={i} className="mb-4 text-muted-foreground leading-relaxed">
                {p}
              </p>
            ))}
          </div>
          <div className="tags flex flex-wrap gap-2 mt-6">
            {news.tags.map((tag) => (
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