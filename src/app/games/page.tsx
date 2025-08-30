// src/app/games/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/app/components/sidebar';

export default function GamesPage() {
  const [recentlyViewed, setRecentlyViewed] = useState<{ title: string; url: string }[]>([]);
  const [userTags, setUserTags] = useState<Record<string, number>>({});

  useEffect(() => {
    const saved = localStorage.getItem('recentlyViewed');
    if (saved) setRecentlyViewed(JSON.parse(saved));

    const tags = localStorage.getItem('userTags');
    if (tags) setUserTags(JSON.parse(tags));
  }, []);

  const games = [
    {
      id: 'tic-tac-toe',
      title: 'Крестики-нолики',
      description: 'Классическая игра с 5 уровнями сложности. Сможете победить ИИ на максимальном уровне?',
      image: 'https://cdn.akamai.steamstatic.com/steam/apps/2438840/header.jpg?t=1727639136',
      difficulty: '5 уровней',
      genre: 'Логическая',
      release: '15 октября 2024',
      developer: 'GtaGo Studio',
      tags: ['логика', 'GtaGo', '2D', 'мини-игра'],
    },
    // ✅ Добавлен Марио-платформер
    {
      id: 'platformer',
      title: 'Марио-платформер',
      description: 'Классическая 2D-игра, в которой игрок управляет персонажем, прыгающим по платформам, собирающим монетки и избегающим врагов.',
      image: 'https://cdn.akamai.steamstatic.com/steam/apps/1677740/header.jpg?t=1727639136',
      difficulty: 'Средняя',
      genre: 'Платформер',
      release: '20 октября 2024',
      developer: 'GtaGo Studio',
      tags: ['платформер', 'GtaGo', '2D', 'Mario', 'игры'],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <main className="lg:col-span-2 space-y-8">
        <h1 className="text-3xl font-bold mb-8">🎮 Игры от GtaGo</h1>
        <p className="text-muted-foreground mb-12">
          Наши собственные мини-игры, созданные с любовью к геймплею. Играйте, отдыхайте, побеждайте!
        </p>

        {/* Список игр */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {games.map((game) => (
            <Link key={game.id} href={`/games/${game.id}`} className="block group">
              <div className="card bg-bg-card rounded-2xl p-6 border border-border shadow-lg hover:shadow-xl transition transform hover:scale-105">
                <div className="relative rounded-xl overflow-hidden h-48 mb-6">
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${game.image})` }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold line-clamp-2">{game.title}</h3>
                  </div>
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-20 transition"></div>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm mb-4">
                    {game.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs bg-purple-500/15 text-foreground px-3 py-1 rounded-full font-semibold border border-purple-500/30">
                      {game.difficulty}
                    </span>
                    <span className="text-xs bg-purple-500/15 text-foreground px-3 py-1 rounded-full font-semibold border border-purple-500/30">
                      {game.genre}
                    </span>
                  </div>
                  <div className="tags flex flex-wrap gap-2 mt-4">
                    {game.tags.map((tag) => (
                      <span
                        key={tag}
                        className="tag bg-purple-500/15 text-foreground px-3 py-1 rounded-full text-xs font-semibold border border-purple-500/30 cursor-pointer hover:scale-110 transition"
                        onClick={(e) => {
                          e.preventDefault();
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
            </Link>
          ))}
        </div>
      </main>
      <Sidebar />
    </div>
  );
}