// src/app/news/hollow-knight-silksong/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/app/components/sidebar';

export default function HollowKnightSilksongNews() {
  const [recentlyViewed, setRecentlyViewed] = useState<{ title: string; url: string }[]>([]);
  const [userTags, setUserTags] = useState<Record<string, number>>({});

  useEffect(() => {
    const saved = localStorage.getItem('recentlyViewed');
    if (saved) setRecentlyViewed(JSON.parse(saved));

    const tags = localStorage.getItem('userTags');
    if (tags) setUserTags(JSON.parse(tags));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <main className="lg:col-span-2 space-y-8">
        <Link href="/" className="text-purple-500 hover:underline mb-4 inline-block">
          ← Назад к новостям
        </Link>

        <article className="card bg-bg-card rounded-2xl p-8 border border-border shadow-lg">
          <h1 className="text-3xl font-bold mb-4">Hollow Knight: Silksong наконец-то получила релиз-дату</h1>
          <p className="text-muted-foreground mb-6">
            13 октября 2024 • Автор: Дмитрий Сидоров
          </p>
          <img
            src="/assets/img/news/holl.png"
            alt="Hollow Knight: Silksong"
            className="w-full h-64 object-cover rounded-xl mb-6"
          />
          <div className="prose prose-invert prose-lg max-w-none">
            <p>
              Разработчики Team Cherry объявили, что Hollow Knight: Silksong выйдет 25 марта 2025 года. Игра появится на всех платформах, включая Switch и ПК. Поклонники ждали анонса более 5 лет.
            </p>
            <p>
              Главной героиней станет Хорнит — сестра Монарха. В этот раз игроки окажутся в новом королевстве — Дейтоду. Игра сохранит фирменный стиль метроидвании: сложные боссы, скрытые пещеры, минималистичный сюжет и потрясающая музыка.
            </p>
            <p>
              В Silksong добавлены новые способности, комбо с ядовитыми шипами, лазание по паутине и сражения с гигантскими насекомыми. Боевая система стала глубже, а уровень детализации — впечатляет.
            </p>
            <p>
              Hollow Knight была культовой игрой 2017 года. Silksong может повторить успех — или даже превзойти его. После всех отсрочек и слухов, фанаты наконец-то получат продолжение.
            </p>
          </div>
          <div className="tags flex flex-wrap gap-2 mt-6">
            {['метроидвания', 'Team Cherry', '2D платформер', 'Hollow Knight'].map((tag) => (
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