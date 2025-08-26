// src/app/ratings/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import ParticleBackground from '@/app/components/particle-background';

const ratingData: Record<string, {
  title: string;
  author: string;
  date: string;
  image: string;
  content: string;
  tags: string[];
}> = {
  'top-strategy-2025': {
    title: 'Топ-10 стратегий 2025 года',
    author: 'Редакция StopGame',
    date: '15 октября 2024',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/2438840/header.jpg?t=1727639136',
    content: 'Frostpunk 2, Cities: Skylines II, Total War: Pharaoh — лучшие стратегии года по версии StopGame.',
    tags: ['рейтинг', 'стратегия', '2025'],
  },
  'best-rpg': {
    title: 'Лучшие RPG за последние 5 лет',
    author: 'Редакция StopGame',
    date: '14 октября 2024',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1086940/header.jpg?t=1727639136',
    content: 'От The Witcher 3 до Baldur\'s Gate 3 — топ-игр, которые определили жанр RPG.',
    tags: ['рейтинг', 'RPG', 'лучшие игры'],
  },
  'ps5-games': {
    title: 'Топ-5 игр для PS5',
    author: 'Редакция StopGame',
    date: '13 октября 2024',
    image: 'https://www.playstation.com/content/dam/cdp/store-954/ps-plus/2024/november/ps-plus-nov-2024-hero.jpg',
    content: 'Demon\'s Souls, God of War: Ragnarök, Spider-Man 2 — лучшие эксклюзивы консоли.',
    tags: ['рейтинг', 'PS5', 'эксклюзивы'],
  },
};

export default function RatingDetail() {
  const pathname = usePathname();
  const id = pathname.split('/').pop()!;
  const rating = ratingData[id];

  const [recentlyViewed, setRecentlyViewed] = useState<{ title: string; url: string }[]>([]);

  useEffect(() => {
    if (!rating) return;

    const saved = localStorage.getItem('recentlyViewed');
    const list = saved ? JSON.parse(saved) : [];

    const exists = list.some((item: { url: string }) => item.url === pathname);
    if (!exists) {
      const newList = [{ title: rating.title, url: pathname }, ...list].slice(0, 3);
      setRecentlyViewed(newList);
      localStorage.setItem('recentlyViewed', JSON.stringify(newList));
    } else {
      setRecentlyViewed(list);
    }
  }, [pathname, rating]);

  if (!rating) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold">Рейтинг не найден</h1>
        <Link href="/ratings" className="text-purple-500 hover:underline mt-4 inline-block">
          ← Вернуться к рейтингам
        </Link>
      </div>
    );
  }

  return (
    <>
      <ParticleBackground />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link href="/ratings" className="text-purple-500 hover:underline mb-4 inline-block">
          ← Назад к рейтингам
        </Link>
        <article>
          <h1 className="text-3xl font-bold mb-2">{rating.title}</h1>
          <p className="text-muted-foreground mb-6">
            {rating.date} • Автор: {rating.author}
          </p>
          <img
            src={rating.image}
            alt={rating.title}
            className="w-full h-64 object-cover rounded-xl mb-6"
          />
          <p className="text-muted-foreground mb-6">{rating.content}</p>
          <div className="tags flex flex-wrap gap-2">
            {rating.tags.map((tag) => (
              <span
                key={tag}
                className="tag bg-purple-500/15 text-foreground px-3 py-1 rounded-full text-sm font-semibold border border-purple-500/30"
              >
                {tag}
              </span>
            ))}
          </div>
        </article>
      </div>
    </>
  );
}