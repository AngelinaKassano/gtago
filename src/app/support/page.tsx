// src/app/support/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/app/components/sidebar';

export default function SupportPage() {
  const [recentlyViewed, setRecentlyViewed] = useState<{ title: string; url: string }[]>([]);
  const [userTags, setUserTags] = useState<Record<string, number>>({});

  useEffect(() => {
    const saved = localStorage.getItem('recentlyViewed');
    if (saved) setRecentlyViewed(JSON.parse(saved));

    const tags = localStorage.getItem('userTags');
    if (tags) setUserTags(JSON.parse(tags));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* === Основной контент === */}
      <main className="lg:col-span-2 space-y-16">
        {/* Заголовок */}
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold">🪙 Подкинь монетку</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Поддержите проект добровольным пожертвованием — и мы продолжим делать GtaGo лучше.
          </p>
        </div>

        {/* Описание */}
        <section className="bg-bg-card rounded-2xl p-8 border border-border space-y-6">
          <h2 className="text-2xl font-bold">Почему это важно?</h2>
          <p className="text-muted-foreground">
            Мы — независимый проект, созданный геймерами для геймеров. Без рекламы, без спама, без кликбейта.
            Каждый день мы пишем новости, обзоры, гайды и видео — и делаем это бесплатно.
          </p>
          <p className="text-muted-foreground">
            Но сервера, домен, редакторы и оборудование — всё это стоит денег. 
            Поддержите нас — и мы продолжим делать GtaGo лучше.
          </p>
        </section>

        {/* Boosty */}
        <section className="bg-bg-card rounded-2xl p-8 border border-border space-y-6">
          <h2 className="text-2xl font-bold">Boosty</h2>
          <p className="text-muted-foreground">
            Самый простой способ поддержать нас ежемесячно. Получайте эксклюзивный контент, ранний доступ к обзорам и благодарности.
          </p>
          <a
            href="https://boosty.to/gtago"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full hover:from-purple-700 hover:to-blue-700 transition"
          >
            Перейти на Boosty
          </a>
        </section>

        {/* Благодарности */}
        <section className="bg-bg-card rounded-2xl p-8 border border-border space-y-6">
          <h2 className="text-2xl font-bold">Благодарим за поддержку!</h2>
          <p className="text-muted-foreground">
            Каждый донат — это не просто деньги, это знак доверия. Мы ценим каждого, кто помогает нам продолжать работу.
          </p>
          <p className="text-muted-foreground">
            Вы — часть GtaGo. Спасибо, что делаете наш мир лучше.
          </p>
        </section>
      </main>

      {/* === Сайдбар === */}
      <Sidebar />
    </div>
  );
}