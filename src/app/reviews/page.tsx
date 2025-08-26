// src/app/reviews/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/app/components/sidebar';

export default function ReviewsPage() {
  const [recentlyViewed, setRecentlyViewed] = useState<{ title: string; url: string }[]>([]);
  const [userTags, setUserTags] = useState<Record<string, number>>({});

  useEffect(() => {
    const saved = localStorage.getItem('recentlyViewed');
    if (saved) setRecentlyViewed(JSON.parse(saved));

    const tags = localStorage.getItem('userTags');
    if (tags) setUserTags(JSON.parse(tags));
  }, []);

  const reviews = [
    {
      id: 'frostpunk-2',
      title: 'Frostpunk 2 — цейтнот нового поколения',
      author: 'Мария Смирнова',
      date: '16 октября 2024',
      image: 'https://cdn.akamai.steamstatic.com/steam/apps/2438840/header.jpg?t=1727639136',
      excerpt: 'Frostpunk 2 — это не просто продолжение, а эволюция жанра «выживание в условиях апокалипсиса». 11 bit studios снова доказывают, что могут сочетать глубокую механику, моральные дилеммы и мощную атмосферу.',
      score: 9,
      tags: ['стратегия', '11 bit studios', 'обзор'],
    },
    {
      id: 'baldurs-gate-3',
      title: 'Baldur\'s Gate 3 — почему это лучшая RPG десятилетия',
      author: 'Алексей Кузнецов',
      date: '15 октября 2024',
      image: 'https://cdn.akamai.steamstatic.com/steam/apps/1086940/header.jpg?t=1727639136',
      excerpt: 'Baldur\'s Gate 3 — это не просто RPG, а целый мир. Глубокий сюжет, свобода выбора, потрясающая реализация D&D — всё это делает игру достойной звания «Игра года».',
      score: 10,
      tags: ['RPG', 'обзор', 'Larian Studios'],
    },
    {
      id: 'starfield',
      title: 'Starfield — что пошло не так и как это исправить',
      author: 'Дмитрий Соколов',
      date: '14 октября 2024',
      image: 'https://cdn.akamai.steamstatic.com/steam/apps/1716740/header.jpg?t=1727639136',
      excerpt: 'Starfield — амбициозный проект Bethesda, но в итоге получилась игра с потенциалом, который не раскрыт. Разберём, где пошли не туда и как Bethesda может это исправить.',
      score: 6,
      tags: ['RPG', 'обзор', 'Bethesda'],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <main className="lg:col-span-2 space-y-8">
        <h1 className="text-3xl font-bold mb-8">Обзоры</h1>
        {reviews.map((review) => (
          <article key={review.id} className="card bg-bg-card rounded-2xl p-6 border border-border shadow-lg">
            <div className="flex gap-6 items-center">
              <Link href={`/reviews/${review.id}`}>
                <img
                  src={review.image}
                  alt={review.title}
                  width={218}
                  height={124}
                  className="rounded-xl object-cover shadow"
                />
              </Link>
              <div>
                <h2 className="text-xl font-bold mb-2">
                  <Link href={`/reviews/${review.id}`} className="hover:text-accent transition">
                    {review.title}
                  </Link>
                </h2>
                <p className="text-muted-foreground text-sm mb-2">
                  {review.date} • Автор: {review.author} • <span className="text-green-400 font-bold">{review.score}/10</span>
                </p>
                <p className="text-muted-foreground line-clamp-3 text-sm mb-3">
                  {review.excerpt}
                </p>
                <div className="tags flex flex-wrap gap-2">
                  {review.tags.map((tag) => (
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
      <Sidebar />
    </div>
  );
}