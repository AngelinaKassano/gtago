// src/app/news/honkai-nexus-anima/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/app/components/sidebar';

export default function HonkaiNexusAnimaNews() {
  const [recentlyViewed, setRecentlyViewed] = useState<{ title: string; url: string }[]>([]);
  const [userTags, setUserTags] = useState<Record<string, number>>({});

  useEffect(() => {
    const saved = localStorage.getItem('recentlyViewed');
    if (saved) setRecentlyViewed(JSON.parse(saved));

    const tags = localStorage.getItem('userTags');
    if (tags) setUserTags(JSON.parse(tags));
  }, []);

  // 🔥 Новость про Honkai: Nexus Anima
  const news = {
    id: 'honkai-nexus-anima',
    title: 'HoYoverse представила своих «Покемонов» — Honkai: Nexus Anima',
    excerpt: 'Компания HoYoverse анонсировала новую игру Honkai: Nexus Anima — стратегию с элементами коллекционирования персонажей. Игра появится на мобильных устройствах и ПК в 2025 году.',
    content: `Компая HoYoverse анонсировала новую игру Honkai: Nexus Anima — стратегию с элементами коллекционирования персонажей. Игра появится на мобильных устройствах и ПК в 2025 году.

Honkai: Nexus Anima — это не просто продолжение серии Honkai. Это **новый жанр** для студии: **пошаговая стратегия с элементами RPG и коллекционирования**. Игроки смогут собирать, развивать и сражаться с помощью уникальных персонажей — "аним".

Каждый аним — это существо с уникальными способностями, стихией и историей. Они делятся на классы: бойцы, маги, танки, поддержка. Игроки могут объединять их в отряды и участвовать в PvE и PvP боях.

Игра использует **новую систему боя** — пошаговые сражения на изометрической карте. Поле боя состоит из клеток, на которых можно размещать анимов. Каждый ход — стратегическое решение: позиция, способности, взаимодействие с окружением.

Смотрите официальный трейлер игры:

[youtube-video]

Система боя вдохновлена классическими JRPG, но с современными визуальными эффектами. Анимации персонажей плавные, а спецэффекты — впечатляющие.

HoYoverse заявила, что игра будет **бесплатной**, но с **платными косметическими элементами**. Также планируется **ежемесячные события**, **гильдейские войны** и **кооперативные миссии**.

Игроки уже отмечают высокий уровень арт-дизайна и потенциал PvE/PvP контента. Многие сравнивают игру с **Pokémon Legends: Arceus**, но с более глубокой стратегией.

Honkai: Nexus Anima может стать **новым хитом** для HoYoverse — или даже **новым жанром** в их портфолио.`,
    author: 'Артём Лебедев',
    date: '21 октября 2024',
    image: '/assets/img/news/anima.png',
    tags: ['стратегия', 'HoYoverse', 'Honkai', 'аниме', 'PvE', 'PvP', 'коллекционирование'],
  };

  // Сохраняем в "недавно просмотренные"
  useEffect(() => {
    const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
    const exists = recentlyViewed.some((item: { url: string }) => item.url === '/news/honkai-nexus-anima');
    if (!exists) {
      const newList = [{ title: news.title, url: '/news/honkai-nexus-anima' }, ...recentlyViewed].slice(0, 3);
      localStorage.setItem('recentlyViewed', JSON.stringify(newList));
    }
  }, []);

  // Разбиваем текст на абзацы и вставляем видео
  const renderContent = () => {
    const paragraphs = news.content.split('\n\n');
    const videoIndex = paragraphs.findIndex(p => p.includes('[youtube-video]'));
    
    if (videoIndex === -1) return paragraphs;

    const beforeVideo = paragraphs.slice(0, videoIndex);
    const afterVideo = paragraphs.slice(videoIndex + 1);

    return [
      ...beforeVideo,
      <div key="video" className="my-8 rounded-2xl overflow-hidden border border-border shadow-lg">
        <iframe
          width="100%"
          height="400"
          src="https://www.youtube.com/embed/dGfTS72aEOs?si=PGCWNGjEE5Kg0HxE"
          title="Honkai: Nexus Anima - Official Trailer"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full"
        ></iframe>
      </div>,
      ...afterVideo
    ];
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <main className="lg:col-span-2 space-y-8">
        <Link href="/" className="text-purple-500 hover:underline mb-4 inline-block">
          ← Назад к новостям
        </Link>

        <article className="card bg-bg-card rounded-2xl p-8 border border-border shadow-lg">
          <h1 className="text-3xl font-bold mb-4">{news.title}</h1>
          <p className="text-muted-foreground mb-6">
            {news.date} • Автор: {news.author}
          </p>
          <img
            src={news.image}
            alt={news.title}
            className="w-full h-64 object-cover rounded-xl mb-6"
          />
          <div className="prose prose-invert prose-lg max-w-none">
            {renderContent().map((item, i) => 
              typeof item === 'string' ? (
                <p key={i} className="mb-4 text-muted-foreground leading-relaxed">
                  {item}
                </p>
              ) : (
                item
              )
            )}
          </div>
          <div className="tags flex flex-wrap gap-2 mt-6">
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
        </article>
      </main>
      <Sidebar />
    </div>
  );
}