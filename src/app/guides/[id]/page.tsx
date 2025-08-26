// src/app/guides/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import ParticleBackground from '@/app/components/particle-background';

const guideData: Record<string, {
  title: string;
  author: string;
  date: string;
  image: string;
  content: string;
  tags: string[];
}> = {
  'frostpunk-2-survival': {
    title: 'Как выжить в Frostpunk 2: первые 10 дней',
    author: 'Алексей Кузнецов',
    date: '17 октября 2024',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/2438840/header.jpg?t=1727639136',
    content: `Первые дни в Frostpunk 2 — самые критичные. Вот ключевые шаги:

1. **Разместите генератор по центру** — так вы минимизируете потери тепла.
2. **Постройте лагерь для рабочих** — без жилья люди уйдут.
3. **Откройте шахту угля** — топливо кончится быстро.
4. **Назначьте инспекторов** — они будут следить за порядком.
5. **Не игнорируйте фракции** — балансируйте между консерваторами и реформистами.

Совет: не стройте слишком много жилых домов — сначала укрепите базу и экономику.`,
    tags: ['гайд', 'стратегия', 'Frostpunk 2'],
  },
  'baldurs-gate-3-builds': {
    title: 'Лучшие билды в Baldur\'s Gate 3',
    author: 'Мария Смирнова',
    date: '16 октября 2024',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1086940/header.jpg?t=1727639136',
    content: `Разбираем топовые билды:

- **Жрец Хаоса** — хаотичный урон и воскрешение
- **Друид Тотема** — контроль поля боя
- **Паладин Света** — непробиваемая броня и лечение
- **Монк Ладони Тьмы** — скорость и урон

Каждый билд уникален. Выбирайте под стиль игры.`,
    tags: ['гайд', 'RPG', 'Baldur\'s Gate 3'],
  },
  'stalker-2': {
    title: 'Гайд по Stalker 2: как выжить в Зоне с первого дня',
    author: 'Дмитрий Соколов',
    date: '15 октября 2024',
    image: 'https://media.contentapi.ea.com/content/dam/apex-legends/common/apex-legends-global-launch/launch-news-header.jpg',
    content: `Советы по выживанию:

- Не лезьте в аномалии без детектора
- Укрепляйте базу
- Собирайте артефакты
- Изучайте поведение мутантов

Зона не прощает ошибок.`,
    tags: ['гайд', 'выживание', 'Stalker 2'],
  },
};

export default function GuideDetail() {
  const pathname = usePathname();
  const id = pathname.split('/').pop()!;
  const guide = guideData[id];

  const [recentlyViewed, setRecentlyViewed] = useState<{ title: string; url: string }[]>([]);

  useEffect(() => {
    if (!guide) return;

    const saved = localStorage.getItem('recentlyViewed');
    const list = saved ? JSON.parse(saved) : [];

    const exists = list.some((item: { url: string }) => item.url === pathname);
    if (!exists) {
      const newList = [{ title: guide.title, url: pathname }, ...list].slice(0, 3);
      setRecentlyViewed(newList);
      localStorage.setItem('recentlyViewed', JSON.stringify(newList));
    } else {
      setRecentlyViewed(list);
    }
  }, [pathname, guide]);

  if (!guide) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold">Гайд не найден</h1>
        <Link href="/guides" className="text-purple-500 hover:underline mt-4 inline-block">
          ← Вернуться к гайдам
        </Link>
      </div>
    );
  }

  return (
    <>
      <ParticleBackground />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link href="/guides" className="text-purple-500 hover:underline mb-4 inline-block">
          ← Назад к гайдам
        </Link>
        <article>
          <h1 className="text-3xl font-bold mb-2">{guide.title}</h1>
          <p className="text-muted-foreground mb-6">
            {guide.date} • Автор: {guide.author}
          </p>
          <img
            src={guide.image}
            alt={guide.title}
            className="w-full h-64 object-cover rounded-xl mb-6"
          />
          <div className="prose prose-invert prose-lg max-w-none">
            {guide.content.split('\n\n').map((p, i) => (
              <p key={i} className="mb-4 text-muted-foreground leading-relaxed">
                {p}
              </p>
            ))}
          </div>
          <div className="tags flex flex-wrap gap-2 mt-6">
            {guide.tags.map((tag) => (
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