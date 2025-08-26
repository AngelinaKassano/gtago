// src/app/components/sidebar.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

// Типы
type RecentlyViewed = { title: string; url: string; tags?: string[] };
type TagViews = Record<string, number>;

// Рекомендации по тегам
const recommendations: Record<string, string[]> = {
  'стратегия': ['Baldur\'s Gate 3', 'Cities: Skylines 2'],
  'экшен': ['GTA 6', 'Cyberpunk 2077'],
  'метроидвания': ['Hollow Knight: Silksong', 'Ori and the Will of the Wisps'],
  'RPG': ['The Witcher 3', 'Elden Ring'],
  'киберпанк': ['Cyberpunk 2077', 'Neuromancer'],
  'открытый мир': ['Red Dead Redemption 2', 'GTA 6'],
  'постапокалипсис': ['Frostpunk 2', 'The Last of Us'],
};

// 🟩 Дефолтные теги — показываются, если нет данных в userTags
const defaultTags = [
  'стратегия',
  'экшен',
  'метроидвания',
  'RPG',
  'киберпанк',
  'открытый мир',
  'постапокалипсис',
  'PS Plus',
  '11 bit studios',
  'Rockstar'
];

export default function Sidebar() {
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewed[]>([]);
  const [tagViews, setTagViews] = useState<TagViews>({});

  // Загружаем данные из localStorage
  useEffect(() => {
    try {
      const savedViewed = localStorage.getItem('recentlyViewed');
      if (savedViewed) setRecentlyViewed(JSON.parse(savedViewed));

      const savedTags = localStorage.getItem('tagViews');
      if (savedTags) {
        setTagViews(JSON.parse(savedTags));
      } else {
        // Если нет сохраненных тегов, инициализируем дефолтные
        const initialTags: TagViews = {};
        defaultTags.forEach(tag => {
          initialTags[tag] = 1;
        });
        setTagViews(initialTags);
        localStorage.setItem('tagViews', JSON.stringify(initialTags));
      }
    } catch (e) {
      console.error('Failed to load from localStorage', e);
    }
  }, []);

  // 🟩 Обновляем tagViews при изменении recentlyViewed
  useEffect(() => {
    try {
      const tagCount: TagViews = {};
      
      // Подсчитываем теги из просмотренных новостей
      recentlyViewed.forEach(item => {
        if (item.tags && Array.isArray(item.tags)) {
          item.tags.forEach(tag => {
            tagCount[tag] = (tagCount[tag] || 0) + 1;
          });
        }
      });

      // Если нет тегов из просмотренных, используем дефолтные
      if (Object.keys(tagCount).length === 0) {
        defaultTags.forEach(tag => {
          tagCount[tag] = 1;
        });
      }

      setTagViews(tagCount);
      localStorage.setItem('tagViews', JSON.stringify(tagCount));
    } catch (e) {
      console.error('Failed to update tag views', e);
    }
  }, [recentlyViewed]);

  // 🟩 Определяем, какие теги показывать
  const displayedTags = Object.keys(tagViews).length > 0
    ? Object.keys(tagViews).sort((a, b) => tagViews[b] - tagViews[a]).slice(0, 8)
    : defaultTags.slice(0, 8);

  // Формируем рекомендации
  const recommended: string[] = [];
  Object.keys(tagViews).forEach(tag => {
    if (recommendations[tag] && recommended.length < 4) {
      recommendations[tag].slice(0, 2).forEach(title => {
        if (recommended.length < 4 && !recommended.includes(title)) {
          recommended.push(title);
        }
      });
    }
  });

  // Обработчик клика по тегу
  const handleTagClick = (tag: string) => {
    try {
      const newTagViews = { ...tagViews, [tag]: (tagViews[tag] || 0) + 1 };
      setTagViews(newTagViews);
      localStorage.setItem('tagViews', JSON.stringify(newTagViews));
    } catch (e) {
      console.error('Failed to update tag click', e);
    }
  };

  return (
    <aside className="space-y-6">
      {/* ✅ 1. Популярные теги — теперь вверху и всегда видны */}
      <div className="card bg-bg-card rounded-2xl p-6 border border-border">
        <h4 className="text-lg font-semibold mb-4">🏷️ Популярные теги</h4>
        <div className="tags flex flex-wrap gap-2">
          {displayedTags.map(tag => (
            <span
              key={tag}
              className="tag bg-purple-500/15 text-foreground px-3 py-1 rounded-full text-sm font-semibold border border-purple-500/30 cursor-pointer hover:scale-110 transition"
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* 2. Топ за неделю */}
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

      {/* 3. Рекомендации от сайта */}
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

      {/* 4. Новости от AI */}
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

      {/* 5. Вам может понравиться */}
      <div className="card bg-bg-card rounded-2xl p-6 border border-border">
        <h4 className="text-lg font-semibold mb-4">💡 Вам может понравиться</h4>
        <ul className="space-y-3">
          {recommended.length > 0 ? (
            recommended.map((title, i) => (
              <li key={i}>
                <a href="#" className="text-muted-foreground hover:text-accent block transition">
                  {title}
                </a>
              </li>
            ))
          ) : (
            <li>
              <a href="/news" className="text-muted-foreground hover:text-accent block transition">
                Начните читать — мы подберём!
              </a>
            </li>
          )}
        </ul>
      </div>

      {/* 6. Недавно просмотренные */}
      <div className="card bg-bg-card rounded-2xl p-6 border border-border">
        <h4 className="text-lg font-semibold mb-4">🕒 Недавно просмотренные</h4>
        <ul className="space-y-3">
          {recentlyViewed.length > 0 ? (
            recentlyViewed.map((item, i) => (
              <li key={i}>
                <Link href={item.url} className="text-muted-foreground hover:text-accent block transition">
                  {item.title}
                </Link>
              </li>
            ))
          ) : (
            <li className="text-muted-foreground text-sm">Пока ничего не просмотрено</li>
          )}
        </ul>
      </div>
    </aside>
  );
}