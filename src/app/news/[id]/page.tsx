// src/app/news/[id]/page.tsx
'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import Sidebar from '@/app/components/sidebar';
import YandexRTB from '@/app/components/yandex-rtb';
import { allNews } from '@/data/news';

export default function NewsDetail({ params }: { params: { id: string } }) {
  const news = allNews.find(n => n.id === params.id);

  if (!news) return notFound();

  // Разбиваем текст на абзацы
  const paragraphs = news.content.split('\n\n');

  // Вставляем рекламу после 2-го абзаца
  const midPoint = Math.floor(paragraphs.length / 2);
  const contentWithAd = [
    ...paragraphs.slice(0, midPoint),
    <YandexRTB key="ad" blockId="R-A-6922066-2" renderTo="yandex_rtb_R-A-6922066-2" />,
    ...paragraphs.slice(midPoint),
  ];

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
            {contentWithAd.map((item, index) => {
              if (typeof item === 'string') {
                return (
                  <p key={index} className="mb-4 text-muted-foreground leading-relaxed">
                    {item}
                  </p>
                );
              }
              return item; // Это реклама
            })}
          </div>

          <div className="tags flex flex-wrap gap-2 mt-6">
            {news.tags.map((tag) => (
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