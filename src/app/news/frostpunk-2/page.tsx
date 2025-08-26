// src/app/news/frostpunk-2/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/app/components/sidebar';

export default function Frostpunk2News() {
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
          <h1 className="text-3xl font-bold mb-4">Frostpunk 2 получила дату релиза и новый трейлер</h1>
          <p className="text-muted-foreground mb-6">
            15 октября 2024 • Автор: Иван Иванов
          </p>
          <img
            src="/assets/img/news/frostpunk2.png"
            alt="Frostpunk 2"
            className="w-full h-64 object-cover rounded-xl mb-6"
          />
          <div className="prose prose-invert prose-lg max-w-none">
            <p>
              Ух, 11 bit studios снова выпускают игру в моём любимом жанре «цейтнот». Снова везде не хватает рук, ресурсов, нервов у жителей базы и у игрока самого. Но до чего же кайфово! Лет десять назад, когда в Steam каждый день выходил очередной выживач в раннем доступе, я всё никак не мог найти тот самый проект, который закроет все мои хотелки. Но сейчас, похоже, можно уже сказать, что лично для меня он уже вышел.
            </p>
            <p>
              Конечно, это развитие механик Frostpunk, но с упором на конкретных персонажей. Да, и раньше были эвенты с разными «именными» героями, но теперь у NPC столько общего с главным героем, что крики в экран «этот чел буквально я» неизбежны.
            </p>
            <p>
              Пока что всё нравится, но я бы сделал систему управления базой одной мышкой, а не на своих двоих — уж слишком часто приходится переставлять комнаты для уюта и эргономики. В остальном — очередной претендент на награды в конце года! Буду продолжать играть, обновлю отзыв ближе к концу игры.
            </p>
          </div>
          <div className="tags flex flex-wrap gap-2 mt-6">
            {['стратегия', '11 bit studios', 'постапокалипсис'].map((tag) => (
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