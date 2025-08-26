// src/app/components/sidebar.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type RecentlyViewed = { title: string; url: string };
type UserTags = Record<string, number>;

const recommendations: Record<string, string[]> = {
  'стратегия': ['Baldur\'s Gate 3', 'Cities: Skylines 2'],
  'экшен': ['GTA 6', 'Cyberpunk 2077'],
  'метроидвания': ['Hollow Knight: Silksong', 'Ori and the Will of the Wisps']
};

const defaultTags = [
  'стратегия',
  'экшен',
  'метроидвания',
  'PS Plus',
  '11 bit studios',
  'Rockstar',
  'открытый мир',
  'технологии',
  'постапокалипсис',
  'RPG'
];

export default function Sidebar() {
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewed[]>([]);
  const [userTags, setUserTags] = useState<UserTags>({});

  useEffect(() => {
    const saved = localStorage.getItem('recentlyViewed');
    if (saved) setRecentlyViewed(JSON.parse(saved));

    const tags = localStorage.getItem('userTags');
    if (tags) setUserTags(JSON.parse(tags));
  }, []);

  const displayedTags = Object.keys(userTags).length > 0
    ? Object.keys(userTags).sort((a, b) => userTags[b] - userTags[a]).slice(0, 8)
    : defaultTags.slice(0, 8);

  const recommended: string[] = [];
  Object.keys(userTags).forEach(tag => {
    if (recommendations[tag] && recommended.length < 4) {
      recommendations[tag].slice(0, 2).forEach(title => {
        if (recommended.length < 4) {
          recommended.push(title);
        }
      });
    }
  });

  return (
    <aside className="space-y-6">
      {/* === Популярные теги === */}
      <div className="card bg-bg-card rounded-2xl p-6 border border-border">
        <h4 className="text-lg font-semibold mb-4">🏷️ Популярные теги</h4>
        <div className="tags flex flex-wrap gap-2">
          {displayedTags.map(tag => (
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

      {/* === 🔥 Топ за неделю === */}
      <div className="card bg-bg-card rounded-2xl p-6 border border-border">
        <h4 className="text-lg font-semibold mb-4">🔥 Топ за неделю</h4>
        <ul className="space-y-3">
          <li>
            <Link href="/news/frostpunk-2" className="text-muted-foreground hover:text-accent block transition">
              Frostpunk 2 — релиз и трейлер
            </Link>
          </li>
          <li>
            <Link href="/news/gta-6" className="text-muted-foreground hover:text-accent block transition">
              GTA 6 — первый геймплей
            </Link>
          </li>
          <li>
            <Link href="/news/hollow-knight-silksong" className="text-muted-foreground hover:text-accent block transition">
              Hollow Knight: Silksong — дата релиза
            </Link>
          </li>
        </ul>
      </div>

      {/* === 🎯 Рекомендации от сайта === */}
      <div className="card bg-bg-card rounded-2xl p-6 border border-border">
        <h4 className="text-lg font-semibold mb-4">🎯 Рекомендации от сайта</h4>
        <ul className="space-y-3">
          <li>
            <Link href="/reviews/baldurs-gate-3" className="text-muted-foreground hover:text-accent block transition">
              Baldur's Gate 3 — почему это лучшая RPG десятилетия
            </Link>
          </li>
          <li>
            <Link href="/guides/stalker-2" className="text-muted-foreground hover:text-accent block transition">
              Гайд по Stalker 2: как выжить в Зоне с первого дня
            </Link>
          </li>
          <li>
            <Link href="/reviews/starfield" className="text-muted-foreground hover:text-accent block transition">
              Starfield — что пошло не так и как это исправить
            </Link>
          </li>
        </ul>
      </div>

      {/* === 🤖 Новости от AI === */}
      <div className="card bg-bg-card rounded-2xl p-6 border border-border ai-block">
        <div className="ai-header flex items-center gap-2 mb-4">
          <span className="text-2xl">🤖</span>
          <h4 className="font-semibold">Новости от AI</h4>
        </div>
        <ul className="text-sm text-muted-foreground space-y-2">
          <li>Игроки всё чаще выбирают <strong>стратегии с моральными дилеммами</strong>.</li>
          <li>Спрос на <strong>ретро-платформеры</strong> растёт на 23% в год.</li>
          <li>ИИ-ассистенты в играх станут стандартом к 2026 году.</li>
          <li>Frostpunk 2 вызывает больше обсуждений, чем Starfield на старте.</li>
        </ul>
        <p className="text-xs text-muted-foreground mt-3 italic">
          ⚠️ Контент сгенерирован ИИ. Не является официальным мнением редакции.
        </p>
      </div>

      {/* === 🎮 Раздачи игр Steam === */}
      <div className="card bg-bg-card rounded-2xl p-6 border border-border">
        <h4 className="text-lg font-semibold mb-4">🎮 Раздачи игр Steam</h4>
        <ul className="space-y-3">
          <li>
            <Link href="/steam/frostpunk-2" className="text-muted-foreground hover:text-accent block transition">
              Frostpunk 2 — скидка 50%
            </Link>
          </li>
          <li>
            <Link href="/steam/gta-5" className="text-muted-foreground hover:text-accent block transition">
              GTA 5 — бесплатно до конца недели
            </Link>
          </li>
          <li>
            <Link href="/steam/cyberpunk-2077" className="text-muted-foreground hover:text-accent block transition">
              Cyberpunk 2077 — скидка 70%
            </Link>
          </li>
          <li>
            <Link href="/steam/hollow-knight" className="text-muted-foreground hover:text-accent block transition">
              Hollow Knight — бесплатно для подписчиков
            </Link>
          </li>
          <li>
            <Link href="/steam/baldurs-gate-3" className="text-muted-foreground hover:text-accent block transition">
              Baldur's Gate 3 — скидка 30%
            </Link>
          </li>
        </ul>
      </div>

      {/* === 🎯 Раздачи игр Epic Games === */}
      <div className="card bg-bg-card rounded-2xl p-6 border border-border">
        <h4 className="text-lg font-semibold mb-4">🎯 Раздачи игр Epic Games</h4>
        <ul className="space-y-3">
          <li>
            <Link href="/epic/far-cry-6" className="text-muted-foreground hover:text-accent block transition">
              Far Cry 6 — бесплатно до 5 апреля
            </Link>
          </li>
          <li>
            <Link href="/epic/watch-dogs-legion" className="text-muted-foreground hover:text-accent block transition">
              Watch Dogs: Legion — бесплатно до 12 апреля
            </Link>
          </li>
          <li>
            <Link href="/epic/assassins-creed-valhalla" className="text-muted-foreground hover:text-accent block transition">
              Assassin's Creed Valhalla — скидка 60%
            </Link>
          </li>
          <li>
            <Link href="/epic/ghost-recon-breakpoint" className="text-muted-foreground hover:text-accent block transition">
              Ghost Recon: Breakpoint — бесплатно до 19 апреля
            </Link>
          </li>
          <li>
            <Link href="/epic/the-division-2" className="text-muted-foreground hover:text-accent block transition">
              The Division 2 — скидка 50%
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}