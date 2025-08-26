// src/app/reviews/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import ParticleBackground from '@/app/components/particle-background';

const reviewData: Record<string, {
  title: string;
  author: string;
  date: string;
  image: string;
  content: string;
  score: number;
  tags: string[];
}> = {
  'frostpunk-2': {
    title: 'Frostpunk 2 — цейтнот нового поколения',
    author: 'Мария Смирнова',
    date: '16 октября 2024',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/2438840/header.jpg?t=1727639136',
    content: `Frostpunk 2 — это не просто продолжение, а эволюция жанра «выживание в условиях апокалипсиса». 11 bit studios снова доказывают, что могут сочетать глубокую механику, моральные дилеммы и мощную атмосферу.

Теперь акцент сделан на политику и управление городом. Вы — не просто лидер, а мэр, который должен балансировать между фракциями, законодательством и выживанием. Новые механики: суды, выборы, экономические реформы.

Графика — огромный шаг вперёд. Город стал живым, динамичным. Дождь, пар из труб, костры — всё это создаёт ощущение хрупкого тепла в вечной зиме.

Оценка: 9/10 — шедевр стратегического жанра.`,
    score: 9,
    tags: ['стратегия', '11 bit studios', 'обзор'],
  },
  'baldurs-gate-3': {
    title: 'Baldur\'s Gate 3 — почему это лучшая RPG десятилетия',
    author: 'Алексей Кузнецов',
    date: '15 октября 2024',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1086940/header.jpg?t=1727639136',
    content: `Baldur's Gate 3 — это не просто RPG, это целый мир. Глубокий сюжет, свобода выбора, потрясающая реализация D&D — всё это делает игру достойной звания «Игра года».

От начала до конца вы чувствуете, что каждое решение имеет последствия. Персонажи живые, диалоги — кинематографичные, а бои — напряжённые и стратегические.

Оценка: 10/10 — идеал жанра.`,
    score: 10,
    tags: ['RPG', 'обзор', 'Larian Studios'],
  },
  'starfield': {
    title: 'Starfield — что пошло не так и как это исправить',
    author: 'Дмитрий Соколов',
    date: '14 октября 2024',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1716740/header.jpg?t=1727639136',
    content: `Starfield — амбициозный проект Bethesda, но в итоге получилась игра с потенциалом, который не раскрыт. Мир огромен, но пуст. Квесты — шаблонные. Бои — посредственные.

Тем не менее, есть зёрна величия: система крафта, корабли, диалоги. С модами и патчами Starfield может стать тем, чем должна была быть.

Оценка: 6/10 — потенциал есть, но реализация хромает.`,
    score: 6,
    tags: ['RPG', 'обзор', 'Bethesda'],
  },
};

export default function ReviewDetail() {
  const pathname = usePathname();
  const id = pathname.split('/').pop()!;
  const review = reviewData[id];

  const [recentlyViewed, setRecentlyViewed] = useState<{ title: string; url: string }[]>([]);

  useEffect(() => {
    if (!review) return;

    const saved = localStorage.getItem('recentlyViewed');
    const list = saved ? JSON.parse(saved) : [];

    const exists = list.some((item: { url: string }) => item.url === pathname);
    if (!exists) {
      const newList = [{ title: review.title, url: pathname }, ...list].slice(0, 3);
      setRecentlyViewed(newList);
      localStorage.setItem('recentlyViewed', JSON.stringify(newList));
    } else {
      setRecentlyViewed(list);
    }
  }, [pathname, review]);

  if (!review) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold">Обзор не найден</h1>
        <Link href="/reviews" className="text-purple-500 hover:underline mt-4 inline-block">
          ← Вернуться к обзорам
        </Link>
      </div>
    );
  }

  return (
    <>
      <ParticleBackground />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link href="/reviews" className="text-purple-500 hover:underline mb-4 inline-block">
          ← Назад к обзорам
        </Link>
        <article>
          <h1 className="text-3xl font-bold mb-2">{review.title}</h1>
          <p className="text-muted-foreground mb-6">
            {review.date} • Автор: {review.author} • <span className="text-green-400 font-bold">{review.score}/10</span>
          </p>
          <img
            src={review.image}
            alt={review.title}
            className="w-full h-64 object-cover rounded-xl mb-6"
          />
          <div className="prose prose-invert prose-lg max-w-none">
            {review.content.split('\n\n').map((p, i) => (
              <p key={i} className="mb-4 text-muted-foreground leading-relaxed">
                {p}
              </p>
            ))}
          </div>
          <div className="tags flex flex-wrap gap-2 mt-6">
            {review.tags.map((tag) => (
              <span
                key={tag}
                className="tag bg-purple-500/15 text-foreground px-3 py-1 rounded-full text-sm font-semibold border border-purple-500/30 cursor-pointer hover:scale-110 transition"
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
      </div>
    </>
  );
}