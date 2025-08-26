// src/app/videos/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/app/components/sidebar';

export default function VideosPage() {
  const [recentlyViewed, setRecentlyViewed] = useState<{ title: string; url: string }[]>([]);
  const [userTags, setUserTags] = useState<Record<string, number>>({});

  useEffect(() => {
    const saved = localStorage.getItem('recentlyViewed');
    if (saved) setRecentlyViewed(JSON.parse(saved));

    const tags = localStorage.getItem('userTags');
    if (tags) setUserTags(JSON.parse(tags));
  }, []);

  const videos = [
    {
      id: 'frostpunk-2-trailer',
      title: 'Трейлер Frostpunk 2 — официальный',
      author: 'StopGame',
      date: '15 октября 2024',
      image: 'https://cdn.akamai.steamstatic.com/steam/apps/2438840/header.jpg?t=1727639136',
      views: '1.2M',
      duration: '3:45',
      tags: ['трейлер', 'стратегия', 'Frostpunk 2'],
    },
    {
      id: 'gta-6-gameplay',
      title: 'GTA 6 — первый геймплей (4K)',
      author: 'StopGame',
      date: '14 октября 2024',
      image: 'https://media.contentapi.ea.com/content/dam/apex-legends/common/apex-legends-global-launch/launch-news-header.jpg',
      views: '4.5M',
      duration: '8:12',
      tags: ['геймплей', 'экшен', 'GTA 6'],
    },
    {
      id: 'hollow-knight-silksong',
      title: 'Hollow Knight: Silksong — геймплей',
      author: 'StopGame',
      date: '13 октября 2024',
      image: 'https://cdn.akamai.steamstatic.com/steam/apps/1677740/header.jpg?t=1727639136',
      views: '890K',
      duration: '5:33',
      tags: ['геймплей', 'метроидвания', 'Hollow Knight'],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <main className="lg:col-span-2 space-y-8">
        <h1 className="text-3xl font-bold mb-8">Видео</h1>
        {videos.map((video) => (
          <article key={video.id} className="card bg-bg-card rounded-2xl p-6 border border-border shadow-lg">
            <div className="flex gap-6 items-center">
              <Link href={`/videos/${video.id}`}>
                <div className="relative">
                  <img
                    src={video.image}
                    alt={video.title}
                    width={218}
                    height={124}
                    className="rounded-xl object-cover shadow"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-black/60 rounded-full flex items-center justify-center text-white text-lg font-bold">
                      ▶
                    </div>
                  </div>
                </div>
              </Link>
              <div>
                <h2 className="text-xl font-bold mb-2">
                  <Link href={`/videos/${video.id}`} className="hover:text-accent transition">
                    {video.title}
                  </Link>
                </h2>
                <p className="text-muted-foreground text-sm mb-2">
                  {video.date} • {video.views} просмотров • {video.duration}
                </p>
                <div className="tags flex flex-wrap gap-2">
                  {video.tags.map((tag) => (
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