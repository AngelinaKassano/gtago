// src/app/guides/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/app/components/sidebar';

export default function GuidesPage() {
  const [recentlyViewed, setRecentlyViewed] = useState<{ title: string; url: string }[]>([]);
  const [userTags, setUserTags] = useState<Record<string, number>>({});

  useEffect(() => {
    const saved = localStorage.getItem('recentlyViewed');
    if (saved) setRecentlyViewed(JSON.parse(saved));

    const tags = localStorage.getItem('userTags');
    if (tags) setUserTags(JSON.parse(tags));
  }, []);

  const guides = [
    {
      id: 'frostpunk-2-survival',
      title: 'Как выжить в Frostpunk 2: первые 10 дней',
      author: 'Алексей Кузнецов',
      date: '17 октября 2024',
      image: 'https://cdn.akamai.steamstatic.com/steam/apps/2438840/header.jpg?t=1727639136',
      excerpt: 'Первые дни в Frostpunk 2 — самые критичные. Разместите генератор по центру, постройте лагерь, откройте шахту угля и не игнорируйте фракции.',
      tags: ['гайд', 'стратегия', 'Frostpunk 2'],
    },
    {
      id: 'baldurs-gate-3-builds',
      title: 'Лучшие билды в Baldur\'s Gate 3',
      author: 'Мария Смирнова',
      date: '16 октября 2024',
      image: 'https://cdn.akamai.steamstatic.com/steam/apps/1086940/header.jpg?t=1727639136',
      excerpt: 'Разбираем топовые билды: Жрец Хаоса, Друид Тотема, Паладин Света и другие. Как создать идеального персонажа в Baldur\'s Gate 3?',
      tags: ['гайд', 'RPG', 'Baldur\'s Gate 3'],
    },
    {
      id: 'stalker-2',
      title: 'Гайд по Stalker 2: оружие и артефакты',
      author: 'Дмитрий Сидоров',
      date: '15 октября 2024',
      image: 'https://media.contentapi.ea.com/content/dam/apex-legends/common/apex-legends-global-launch/launch-news-header.jpg',
      excerpt: 'Советы по выбору оружия, улучшению снаряжения и сбору артефактов в Зоне отчуждения. Как выжить в Stalker 2?',
      tags: ['гайд', 'выживание', 'Stalker 2'],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Основной контент */}
      <main className="lg:col-span-2 space-y-8">
        <h1 className="text-3xl font-bold mb-8">Гайды</h1>
        {guides.map((guide) => (
          <article key={guide.id} className="card bg-bg-card rounded-2xl p-6 border border-border shadow-lg">
            <div className="flex gap-6 items-center">
              <Link href={`/guides/${guide.id}`}>
                <img
                  src={guide.image}
                  alt={guide.title}
                  width={218}
                  height={124}
                  className="rounded-xl object-cover shadow"
                />
              </Link>
              <div>
                <h2 className="text-xl font-bold mb-2">
                  <Link href={`/guides/${guide.id}`} className="hover:text-accent transition">
                    {guide.title}
                  </Link>
                </h2>
                <p className="text-muted-foreground text-sm mb-2">
                  {guide.date} • Автор: {guide.author}
                </p>
                <p className="text-muted-foreground line-clamp-3 text-sm mb-3">
                  {guide.excerpt}
                </p>
                <div className="tags flex flex-wrap gap-2">
                  {guide.tags.map((tag) => (
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