// src/app/videos/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import ParticleBackground from '@/app/components/particle-background';

const videoData: Record<string, {
  title: string;
  author: string;
  date: string;
  image: string;
  duration: string;
  views: string;
  description: string;
  tags: string[];
}> = {
  'frostpunk-2-trailer': {
    title: 'Трейлер Frostpunk 2 — официальный',
    author: 'StopGame',
    date: '15 октября 2024',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/2438840/header.jpg?t=1727639136',
    duration: '3:45',
    views: '1.2M',
    description: 'Официальный трейлер Frostpunk 2. Показаны новые механики, город, погода и вызовы.',
    tags: ['трейлер', 'стратегия', 'Frostpunk 2'],
  },
  'gta-6-gameplay': {
    title: 'GTA 6 — первый геймплей (4K)',
    author: 'StopGame',
    date: '14 октября 2024',
    image: 'https://media.contentapi.ea.com/content/dam/apex-legends/common/apex-legends-global-launch/launch-news-header.jpg',
    duration: '8:12',
    views: '4.5M',
    description: 'Полный геймплей GTA 6 в 4K. Вайс-Сити, новые герои, NPC, диалоги и экшен.',
    tags: ['геймплей', 'экшен', 'GTA 6'],
  },
  'hollow-knight-silksong': {
    title: 'Hollow Knight: Silksong — геймплей',
    author: 'StopGame',
    date: '13 октября 2024',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1677740/header.jpg?t=1727639136',
    duration: '5:33',
    views: '890K',
    description: 'Геймплей Hollow Knight: Silksong. Новые локации, враги, боссы и музыка.',
    tags: ['геймплей', 'метроидвания', 'Hollow Knight'],
  },
};

export default function VideoDetail() {
  const pathname = usePathname();
  const id = pathname.split('/').pop()!;
  const video = videoData[id];

  const [recentlyViewed, setRecentlyViewed] = useState<{ title: string; url: string }[]>([]);

  useEffect(() => {
    if (!video) return;

    const saved = localStorage.getItem('recentlyViewed');
    const list = saved ? JSON.parse(saved) : [];

    const exists = list.some((item: { url: string }) => item.url === pathname);
    if (!exists) {
      const newList = [{ title: video.title, url: pathname }, ...list].slice(0, 3);
      setRecentlyViewed(newList);
      localStorage.setItem('recentlyViewed', JSON.stringify(newList));
    } else {
      setRecentlyViewed(list);
    }
  }, [pathname, video]);

  if (!video) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold">Видео не найдено</h1>
        <Link href="/videos" className="text-purple-500 hover:underline mt-4 inline-block">
          ← Вернуться к видео
        </Link>
      </div>
    );
  }

  return (
    <>
      <ParticleBackground />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link href="/videos" className="text-purple-500 hover:underline mb-4 inline-block">
          ← Назад к видео
        </Link>
        <article>
          <h1 className="text-3xl font-bold mb-2">{video.title}</h1>
          <p className="text-muted-foreground mb-6">
            {video.date} • {video.views} просмотров • {video.duration}
          </p>
          <div className="relative w-full pb-[56.25%] bg-black rounded-xl mb-6">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center text-white text-3xl font-bold cursor-pointer hover:scale-105 transition">
                ▶
              </div>
            </div>
          </div>
          <p className="text-muted-foreground mb-6">{video.description}</p>
          <div className="tags flex flex-wrap gap-2">
            {video.tags.map((tag) => (
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