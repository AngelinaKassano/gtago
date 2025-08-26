// src/app/steam/cyberpunk-2077/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/app/components/sidebar';

export default function Cyberpunk2077SteamPage() {
  const [recentlyViewed, setRecentlyViewed] = useState<{ title: string; url: string }[]>([]);
  const [userTags, setUserTags] = useState<Record<string, number>>({});

  useEffect(() => {
    const saved = localStorage.getItem('recentlyViewed');
    if (saved) setRecentlyViewed(JSON.parse(saved));

    const tags = localStorage.getItem('userTags');
    if (tags) setUserTags(JSON.parse(tags));
  }, []);

  const news = {
    id: 'cyberpunk-2077',
    title: 'Cyberpunk 2077 — скидка 70%',
    excerpt: 'Разработчики Team Cherry объявили, что Hollow Knight: Silksong выйдет 25 марта 2025 года. Игра появится на всех платформах, включая Switch и ПК...',
    content: `Разработчики Team Cherry объявили, что Hollow Knight: Silksong выйдет 25 марта 2025 года. Игра появится на всех платформах, включая Switch и ПК. Поклонники ждали анонса более 5 лет.

Silksong перенесёт игроков в новое королевство — Дейтоду. Главной героиней станет Хорнит, сестра Монарха. Игра сохранит фирменный стиль метроидвании: сложные боссы, скрытые пещеры, минималистичный сюжет и потрясающая музыка.

Разработчики показали геймплей: новые способности, комбо с ядовитыми шипами, лазание по паутине и сражения с гигантскими насекомыми. Боевая система стала глубже, а уровень детализации — впечатляет.

Hollow Knight была культовой игрой 2017 года. Silksong может повторить успех — или даже превзойти его.`,
    author: 'Дмитрий Сидоров',
    date: '13 октября 2024',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg?t=1727639136',
    tags: ['RPG', 'CD Projekt', 'Phantom Liberty', 'киберпанк'],
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