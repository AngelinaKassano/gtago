// src/components/news-card.tsx
'use client';

import Link from 'next/link';

export function NewsCard({ news }: { news: any }) {
  return (
    <article className="card bg-bg-card rounded-2xl p-6 border border-border shadow-lg">
      <div className="flex gap-6 items-center">
        <Link href={`/news/${news.id}`}>
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
            <Link href={`/news/${news.id}`} className="hover:text-accent transition">
              {news.title}
            </Link>
          </h2>
          <p className="text-muted-foreground text-sm mb-2">
            {news.date} • Автор: {news.author}
          </p>
          <p className="text-muted-foreground line-clamp-3 text-sm mb-3">
            {news.excerpt}
          </p>

          {/* === БЛОК С ТЕГАМИ === */}
          <div className="tags flex flex-wrap gap-2">
            {news.tags.map((tag: string) => (
              <span
                key={tag}
                className="tag bg-purple-500/15 text-foreground px-3 py-1 rounded-full text-xs font-semibold border border-purple-500/30 cursor-pointer hover:scale-110 transition"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}