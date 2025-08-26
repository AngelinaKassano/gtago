// src/app/articles/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Sidebar from '@/app/components/sidebar';

// Данные статей
const articleData: Record<string, {
  title: string;
  author: string;
  date: string;
  image: string;
  category: string;
  content: string;
  tags: string[];
}> = {
  'gta-6-analysis': {
    title: 'GTA 6: почему Rockstar снова меняет индустрию',
    author: 'Артём Лебедев',
    date: '15 октября 2024',
    image: 'https://media.contentapi.ea.com/content/dam/apex-legends/common/apex-legends-global-launch/launch-news-header.jpg',
    category: 'Аналитика',
    content: `Анализ того, как GTA 6 влияет на рынок игр, какие технологии использует и почему она стала самым ожидаемым проектом десятилетия.

GTA 6 — это не просто продолжение культовой серии. Это вызов индустрии. Rockstar снова доказывает, что могут создавать игры нового уровня, которые меняют правила.

Игра использует новейшие технологии:
- NVIDIA DLSS 4.0 для максимальной производительности
- Ray Tracing в реальном времени
- ИИ-генерация NPC и диалогов
- Фотограмметрия для реалистичных локаций

Кроме того, Rockstar уделяет огромное внимание деталям. Каждый NPC имеет свою историю, поведение и реакции. Игроки могут влиять на мир не только действиями, но и выбором.

GTA 6 — это не просто игра. Это новый стандарт для всей индустрии.`,
    tags: ['GTA 6', 'Rockstar', 'аналитика', 'технологии'],
  },
  'frostpunk-2-morality': {
    title: 'Моральные дилеммы в стратегиях: как Frostpunk 2 задаёт новые стандарты',
    author: 'Иван Иванов',
    date: '14 октября 2024',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/2438840/header.jpg?t=1727639136',
    category: 'Лонгрид',
    content: `Frostpunk 2 снова поднимает тему этики в играх. Почему игроки всё чаще выбирают стратегии с моральными выборами?

В эпоху кликбейта и шутеров стратегии с моральными дилеммами становятся хитами. Frostpunk 2 — яркий пример этого тренда.

Игроку предлагается не просто управлять городом, а принимать сложные решения:
- Жертвовать жизнями ради выживания?
- Подавлять свободу ради порядка?
- Использовать жестокие методы ради благой цели?

Эти выборы влияют на развитие сюжета, отношение жителей и даже концовку. ИИ-ассистенты в игре помогают анализировать последствия каждого решения.

Frostpunk 2 — это не просто стратегия. Это философский опыт, который заставляет задуматься о морали в цифровом мире.`,
    tags: ['стратегия', 'Frostpunk 2', 'мораль', '11 bit studios'],
  },
  // Добавьте остальные статьи по аналогии
};

export default function ArticleDetail() {
  const pathname = usePathname();
  const id = pathname.split('/').pop()!;
  const article = articleData[id];

  const [recentlyViewed, setRecentlyViewed] = useState<{ title: string; url: string }[]>([]);

  useEffect(() => {
    if (!article) return;

    // Сохраняем в "недавно просмотренные"
    const saved = localStorage.getItem('recentlyViewed');
    const list = saved ? JSON.parse(saved) : [];

    const exists = list.some((item: { url: string }) => item.url === pathname);
    if (!exists) {
      const newList = [{ title: article.title, url: pathname }, ...list].slice(0, 3);
      setRecentlyViewed(newList);
      localStorage.setItem('recentlyViewed', JSON.stringify(newList));
    } else {
      setRecentlyViewed(list);
    }
  }, [pathname, article]);

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold">Статья не найдена</h1>
        <Link href="/articles" className="text-purple-500 hover:underline mt-4 inline-block">
          ← Вернуться к статьям
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <main className="lg:col-span-2 space-y-8">
        <Link href="/articles" className="text-purple-500 hover:underline mb-4 inline-block">
          ← Назад к статьям
        </Link>

        <article className="card bg-bg-card rounded-2xl p-8 border border-border shadow-lg">
          <span className="text-xs font-semibold bg-purple-500/15 text-purple-300 px-3 py-1 rounded-full border border-purple-500/30">
            {article.category}
          </span>
          <h1 className="text-3xl font-bold my-4">{article.title}</h1>
          <p className="text-muted-foreground mb-6">
            {article.date} • Автор: {article.author}
          </p>
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-64 object-cover rounded-xl mb-6"
          />
          <div className="prose prose-invert max-w-none">
            {article.content.split('\n\n').map((p, i) => (
              <p key={i} className="mb-4 text-muted-foreground leading-relaxed">
                {p}
              </p>
            ))}
          </div>
          <div className="tags flex flex-wrap gap-2 mt-8">
            {article.tags.map((tag) => (
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
      </main>

      <Sidebar />
    </div>
  );
}