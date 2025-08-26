// src/app/steam/gta-5/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/app/components/sidebar';

export default function Gta5SteamPage() {
  const [recentlyViewed, setRecentlyViewed] = useState<{ title: string; url: string }[]>([]);
  const [userTags, setUserTags] = useState<Record<string, number>>({});

  useEffect(() => {
    const saved = localStorage.getItem('recentlyViewed');
    if (saved) setRecentlyViewed(JSON.parse(saved));

    const tags = localStorage.getItem('userTags');
    if (tags) setUserTags(JSON.parse(tags));
  }, []);

  const news = {
    id: 'gta-5',
    title: 'GTA 5 — бесплатно до конца недели',
    excerpt: 'Вчера состоялась долгожданная презентация геймплея Grand Theft Auto VI. На видео показали Вайс-Сити, новых героев и систему взаимодействия с NPC...',
    content: `Вчера состоялась долгожданная презентация геймплея Grand Theft Auto VI. На видео показали Вайс-Сити, новых героев и систему взаимодействия с NPC. Игра выйдет зимой 2025 года на PS5 и Xbox Series X|S.

Видео длилось более 8 минут и демонстрировало как уличную жизнь мегаполиса, так и напряжённые перестрелки, погони и диалоги. Героиня, предположительно — Луна, ведёт себя харизматично, а её напарник явно не доверяет ей. Сюжет обещает быть напряжённым.

Rockstar впервые сделала акцент на двойном протагонисте, и это может стать ключевой фишкой игры. Также заметно улучшение графики, физики и анимаций персонажей.

GTA 6 — одна из самых ожидаемых игр десятилетия. И, судя по геймплею, она оправдывает ожидания.`,
    author: 'Анна Петрова',
    date: '14 октября 2024',
    image: 'https://media.contentapi.ea.com/content/dam/apex-legends/common/apex-legends-global-launch/launch-news-header.jpg',
    tags: ['экшен', 'Rockstar', 'открытый мир'],
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