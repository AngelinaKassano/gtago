// src/app/steam/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/app/components/sidebar';

export default function SteamDealsPage() {
  const [recentlyViewed, setRecentlyViewed] = useState<{ title: string; url: string }[]>([]);
  const [userTags, setUserTags] = useState<Record<string, number>>({});

  useEffect(() => {
    const saved = localStorage.getItem('recentlyViewed');
    if (saved) setRecentlyViewed(JSON.parse(saved));

    const tags = localStorage.getItem('userTags');
    if (tags) setUserTags(JSON.parse(tags));
  }, []);

  const steamDeals = [
    {
      id: 'frostpunk-2',
      title: 'Frostpunk 2 — скидка 50%',
      excerpt: 'Ух, 11 bit studios снова выпускают игру в моём любимом жанре «цейтнот». Снова везде не хватает рук, ресурсов, нервов у жителей базы и у игрока самого...',
      content: `Ух, 11 bit studios снова выпускают игру в моём любимом жанре «цейтнот». Снова везде не хватает рук, ресурсов, нервов у жителей базы и у игрока самого. Но до чего же кайфово! Лет десять назад, когда в Steam каждый день выходил очередной выживач в раннем доступе, я всё никак не мог найти тот самый проект, который закроет все мои хотелки. Но сейчас, похоже, можно уже сказать, что лично для меня он уже вышел.

Конечно, это развитие механик Frostpunk, но с упором на конкретных персонажей. Да, и раньше были эвенты с разными «именными» героями, но теперь у NPC столько общего с главным героем, что крики в экран «этот чел буквально я» неизбежны.

Пока что всё нравится, но я бы сделал систему управления базой одной мышкой, а не на своих двоих — уж слишком часто приходится переставлять комнаты для уюта и эргономики. В остальном — очередной претендент на награды в конце года! Буду продолжать играть, обновлю отзыв ближе к концу игры.`,
      author: 'Иван Иванов',
      date: '15 октября 2024',
      image: 'https://cdn.akamai.steamstatic.com/steam/apps/2438840/header.jpg?t=1727639136',
      tags: ['стратегия', '11 bit studios', 'постапокалипсис'],
    },
    {
      id: 'gta-5',
      title: 'GTA 5 — бесплатно до конца недели',
      excerpt: 'Вчера состоялась долгожданная презентация геймплея Grand Theft Auto VI. На видео показали Вайс-Сити, новых героев и систему взаимодействия с NPC...',
      content: `Вчера состоялась долгожданная презентация геймплея Grand Theft Auto VI. На видео показали Вайс-Сити, новых героев и систему взаимодействия с NPC. Игра выйдет зимой 2025 года на PS5 и Xbox Series X|S.

Видео длилось более 8 минут и демонстрировало как уличную жизнь мегаполиса, так и напряжённые перестрелки, погони и диалоги. Героиня, предположительно — Луна, ведёт себя харизматично, а её напарник явно не доверяет ей. Сюжет обещает быть напряжённым.

Rockstar впервые сделала акцент на двойном протагонисте, и это может стать ключевой фишкой игры. Также заметно улучшение графики, физики и анимаций персонажей.

GTA 6 — одна из самых ожидаемых игр десятилетия. И, судя по геймплею, она оправдывает ожидания.`,
      author: 'Анна Петрова',
      date: '14 октября 2024',
      image: 'https://media.contentapi.ea.com/content/dam/apex-legends/common/apex-legends-global-launch/launch-news-header.jpg',
      tags: ['экшен', 'Rockstar', 'открытый мир'],
    },
    {
      id: 'cyberpunk-2077',
      title: 'Cyberpunk 2077 — скидка 70%',
      excerpt: 'Разработчики Team Cherry объявили, что Hollow Knight: Silksong выйдет 25 марта 2025 года. Игра появится на всех платформах, включая Switch и ПК...',
      content: `Разработчики Team Cherry объявили, что Hollow Knight: Silksong выйдет 25 марта 2025 года. Игра появится на всех платформах, включая Switch и ПК. Поклонники ждали анонса более 5 лет.

Silksong перенесёт игроков в новое королевство — Дейтоду. Главной героиней станет Хорнит, сестра Монарха. Игра сохранит фирменный стиль метроидвании: сложные боссы, скрытые пещеры, минималистичный сюжет и потрясающая музыка.

Разработчики показали геймплей: новые способности, комбо с ядовитыми шипами, лазание по паутине и сражения с гигантскими насекомыми. Боевая система стала глубже, а уровень детализации — впечатляет.

Hollow Knight была культовой игрой 2017 года. Silksong может повторить успех — или даже превзойти его.`,
      author: 'Дмитрий Сидоров',
      date: '13 октября 2024',
      image: 'https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg?t=1727639136',
      tags: ['RPG', 'CD Projekt', 'Phantom Liberty', 'киберпанк'],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <main className="lg:col-span-2 space-y-8">
        <h1 className="text-3xl font-bold mb-8">🎮 Раздачи игр Steam</h1>
        {steamDeals.map((news) => (
          <article key={news.id} className="card bg-bg-card rounded-2xl p-6 border border-border shadow-lg">
            <div className="flex gap-6 items-center">
              <Link href={`/steam/${news.id}`}>
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
                  <Link href={`/steam/${news.id}`} className="hover:text-accent transition">
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