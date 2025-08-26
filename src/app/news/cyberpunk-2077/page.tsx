// src/app/news/cyberpunk-2077/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/app/components/sidebar';

export default function Cyberpunk2077News() {
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
       <h1 className="text-3xl font-bold mb-4">Cyberpunk 2077 получает DLC «Phantom Liberty» — новый трейлер</h1>
         <p className="text-muted-foreground mb-6">
    10 октября 2024 • Автор: Артём Лебедев
  </p>
  <img
    src="/assets/img/news/cyber.png"
    alt="Cyberpunk 2077 — Phantom Liberty"
    className="w-full h-64 object-cover rounded-xl mb-6"
  />
  <div className="prose prose-invert prose-lg max-w-none">
            <p>
              CD Projekt RED официально представила новый трейлер дополнения «Phantom Liberty» для Cyberpunk 2077. DLC выйдет 25 сентября 2024 года и принесёт игрокам новые миссии, персонажей и улучшения геймплея.
            </p>
            <p>
              Главной особенностью станет Икхан — загадочный агент, чьи действия ставят под угрозу весь Найт-Сити. Игрокам предстоит разгадать его истинные мотивы и принять решение, которое повлияет на судьбу города.
            </p>
            <p>
              Также в DLC добавлены улучшенные системы боёв, хакинга и диалогов. Новые NPC будут реагировать на действия игрока, а их поведение станет более динамичным и непредсказуемым.
            </p>
            <p>
              Phantom Liberty — это не просто продолжение, а новый этап в жизни Cyberpunk 2077. После провального старта игра прошла путь к реабилитации, и теперь кажется, что она действительно может стать культовой.
            </p>
          </div>
          <div className="tags flex flex-wrap gap-2 mt-6">
            {['RPG', 'CD Projekt', 'Phantom Liberty', 'киберпанк'].map((tag) => (
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