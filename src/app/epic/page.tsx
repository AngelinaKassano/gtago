// src/app/epic/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/app/components/sidebar';

export default function EpicDealsPage() {
  const [recentlyViewed, setRecentlyViewed] = useState<{ title: string; url: string }[]>([]);
  const [userTags, setUserTags] = useState<Record<string, number>>({});

  useEffect(() => {
    const saved = localStorage.getItem('recentlyViewed');
    if (saved) setRecentlyViewed(JSON.parse(saved));

    const tags = localStorage.getItem('userTags');
    if (tags) setUserTags(JSON.parse(tags));
  }, []);

  const epicDeals = [
    {
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
    },
    {
      id: 'watch-dogs-legion',
      title: 'Watch Dogs: Legion — бесплатно до 12 апреля',
      excerpt: 'Ubisoft объявила, что Watch Dogs: Legion будет доступна бесплатно до 12 апреля. Игра появится на всех платформах, включая PC и консоли...',
      content: `Ubisoft объявила, что Watch Dogs: Legion будет доступна бесплатно до 12 апреля. Игра появится на всех платформах, включая PC и консоли. Поклонники ждали анонса более 4 лет.

Watch Dogs: Legion перенесёт игроков в новое королевство — Лондон. Главной героиней станет Дани Ромеро, революционер, который борется за свободу острова. Игра сохранит фирменный стиль шутера: сложные боссы, скрытые пещеры, минималистичный сюжет и потрясающая музыка.

Разработчики показали геймплей: новые способности, комбо с ядовитыми шипами, лазание по паутине и сражения с гигантскими насекомыми. Боевая система стала глубже, а уровень детализации — впечатляет.

Watch Dogs: Legion была культовой игрой 2020 года. Теперь её можно получить бесплатно — или даже превзойти его.`,
      author: 'Дмитрий Сидоров',
      date: '17 октября 2024',
      image: 'https://cdn.akamai.steamstatic.com/steam/apps/1272850/header.jpg?t=1727639136',
      tags: ['экшен', 'Ubisoft', 'хакинг'],
    },
    {
      id: 'assassins-creed-valhalla',
      title: 'Assassin\'s Creed Valhalla — скидка 60%',
      excerpt: 'Ubisoft объявила, что Assassin\'s Creed Valhalla будет доступна со скидкой 60% до 10 апреля. Игра появится на всех платформах, включая PC и консоли...',
      content: `Ubisoft объявила, что Assassin's Creed Valhalla будет доступна со скидкой 60% до 10 апреля. Игра появится на всех платформах, включая PC и консоли. Поклонники ждали анонса более 4 лет.

Assassin's Creed Valhalla перенесёт игроков в новое королевство — Норвегия. Главной героиней станет Эйвор, викинг, который борется за свободу острова. Игра сохранит фирменный стиль шутера: сложные боссы, скрытые пещеры, минималистичный сюжет и потрясающая музыка.

Разработчики показали геймплей: новые способности, комбо с ядовитыми шипами, лазание по паутине и сражения с гигантскими насекомыми. Боевая система стала глубже, а уровень детализации — впечатляет.

Assassin's Creed Valhalla была культовой игрой 2020 года. Теперь её можно получить со скидкой — или даже превзойти его.`,
      author: 'Елена Козлова',
      date: '18 октября 2024',
      image: 'https://cdn.akamai.steamstatic.com/steam/apps/1532190/header.jpg?t=1727639136',
      tags: ['экшен', 'Ubisoft', 'ассасины'],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <main className="lg:col-span-2 space-y-8">
        <h1 className="text-3xl font-bold mb-8">🎯 Раздачи игр Epic Games</h1>
        {epicDeals.map((news) => (
          <article key={news.id} className="card bg-bg-card rounded-2xl p-6 border border-border shadow-lg">
            <div className="flex gap-6 items-center">
              <Link href={`/epic/${news.id}`}>
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
                  <Link href={`/epic/${news.id}`} className="hover:text-accent transition">
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
              </div>
            </div>
          </article>
        ))}
      </main>
      <Sidebar />
    </div>
  );
}