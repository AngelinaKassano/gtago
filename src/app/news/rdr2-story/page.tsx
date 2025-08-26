// src/app/news/rdr2-story/page.tsx
'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Sidebar from '@/app/components/sidebar';

export default function Rdr2StoryNews() {
  useEffect(() => {
    // Сохраняем в "недавно просмотренные"
    const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
    const newItem = {
      title: 'Red Dead Redemption 2: почему эта история до сих пор трогает игроков',
      url: '/news/rdr2-story'
    };

    // Проверяем, есть ли уже такая новость
    const exists = recentlyViewed.some((item: { url: string }) => item.url === newItem.url);
    if (!exists) {
      const newList = [newItem, ...recentlyViewed].slice(0, 3);
      localStorage.setItem('recentlyViewed', JSON.stringify(newList));
    }

    // Увеличиваем счётчик тегов
    const userTags = JSON.parse(localStorage.getItem('userTags') || '{}');
    const tags = ['RDR2', 'Rockstar', 'драма', 'история', 'открытый мир'];
    tags.forEach(tag => {
      userTags[tag] = (userTags[tag] || 0) + 1;
    });
    localStorage.setItem('userTags', JSON.stringify(userTags));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <main className="lg:col-span-2 space-y-8">
        <Link href="/" className="text-purple-500 hover:underline mb-4 inline-block">
          ← Назад к новостям
        </Link>

        <article className="card bg-bg-card rounded-2xl p-8 border border-border shadow-lg">
          <h1 className="text-3xl font-bold mb-4">
            Red Dead Redemption 2: почему эта история до сих пор трогает игроков
          </h1>
          <p className="text-muted-foreground mb-6">
            18 октября 2024 • Автор: Дмитрий Сидоров
          </p>
          <img
            src="/assets/img/news/rdr2.png"
            alt="Red Dead Redemption 2"
            className="w-full h-64 object-cover rounded-xl mb-6"
          />
          <div className="prose prose-invert prose-lg max-w-none space-y-4">
            <p>
              С момента релиза Red Dead Redemption 2 прошло уже 5 лет, но история Артура Моргана продолжает находить отклик в сердцах геймеров по всему миру. Что делает её такой эмоциональной?
            </p>
            <p>
              Rockstar Games создали не просто игру — они соткали настоящую драму о человеке, оказавшемся в эпохе уходящего Дикого Запада. Артур Морган — не герой в классическом смысле. Он грабитель, убийца, но при этом — отец, друг, человек с совестью.
            </p>
            <p>
              Именно внутренний конфликт главного героя стал ключом к успеху. Игрок проживает его путь от верного правой руки Даута до человека, который пытается искупить вину. Каждый побочный квест, каждая встреча с NPC — это шаг к развязке.
            </p>
            <p>
              Графика, музыка, актёрская игра — всё на высоте. Но главное — это сюжет. Он настолько живой, что даже спустя годы вызывает слёзы. Артур стал культовым персонажем, которого сравнивают с лучшими героями кино и литературы.
            </p>
            <p>
              Red Dead Redemption 2 — это не просто экшен. Это история о человечности в мире насилия. И она до сих пор трогает игроков.
            </p>
          </div>
          <div className="tags flex flex-wrap gap-2 mt-6">
            {['RDR2', 'Rockstar', 'драма', 'история', 'открытый мир'].map((tag) => (
              <span
                key={tag}
                className="tag bg-purple-500/15 text-foreground px-3 py-1 rounded-full text-xs font-semibold border border-purple-500/30 cursor-pointer hover:scale-110 transition"
                onClick={() => {
                  const userTags = JSON.parse(localStorage.getItem('userTags') || '{}');
                  userTags[tag] = (userTags[tag] || 0) + 1;
                  localStorage.setItem('userTags', JSON.stringify(userTags));
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