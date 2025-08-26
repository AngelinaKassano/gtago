// src/app/articles/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/app/components/sidebar';

// Типы
type Article = {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
  category: string;
  tags: string[];
};

// Данные статей
const articles: Article[] = [
  {
    id: 'gta-6-analysis',
    title: 'GTA 6: почему Rockstar снова меняет индустрию',
    excerpt: 'Анализ того, как GTA 6 влияет на рынок игр, какие технологии использует и почему она стала самым ожидаемым проектом десятилетия.',
    author: 'Артём Лебедев',
    date: '15 октября 2024',
    image: 'https://media.contentapi.ea.com/content/dam/apex-legends/common/apex-legends-global-launch/launch-news-header.jpg',
    category: 'Аналитика',
    tags: ['GTA 6', 'Rockstar', 'аналитика', 'технологии'],
  },
  {
    id: 'frostpunk-2-morality',
    title: 'Моральные дилеммы в стратегиях: как Frostpunk 2 задаёт новые стандарты',
    excerpt: 'Frostpunk 2 снова поднимает тему этики в играх. Почему игроки всё чаще выбирают стратегии с моральными выборами?',
    author: 'Иван Иванов',
    date: '14 октября 2024',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/2438840/header.jpg?t=1727639136',
    category: 'Лонгрид',
    tags: ['стратегия', 'Frostpunk 2', 'мораль', '11 bit studios'],
  },
  {
    id: 'cyberpunk-2077-evolution',
    title: 'Cyberpunk 2077: как игра выжила и стала культовой',
    excerpt: 'От провала до культового статуса — как CD Projekt RED смогли вернуть доверие игроков и создать настоящий хит.',
    author: 'Мария Смирнова',
    date: '13 октября 2024',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg?t=1727639136',
    category: 'Исследование',
    tags: ['Cyberpunk 2077', 'CD Projekt', 'реабилитация', 'RPG'],
  },
  {
    id: 'indie-games-rise',
    title: 'Восход инди-игр: почему они побеждают AAA',
    excerpt: 'Анализ трендов 2024 года показывает: инди-игры набирают обороты. Почему маленькие студии побеждают гигантов?',
    author: 'Дмитрий Сидоров',
    date: '12 октября 2024',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1677740/header.jpg?t=1727639136',
    category: 'Колонка',
    tags: ['инди', 'AAA', 'рынок', 'тренды'],
  },
  {
    id: 'ai-in-gaming',
    title: 'Как ИИ меняет индустрию игр: реальность и будущее',
    excerpt: 'NVIDIA представила новую систему генерации NPC с помощью ИИ. Что это значит для разработчиков и игроков?',
    author: 'Анна Петрова',
    date: '11 октября 2024',
    image: 'https://nvidianews.nvidia.com/Assets/2023/08/AI-Generative-AI-Art-1.jpg',
    category: 'Технологии',
    tags: ['ИИ', 'NVIDIA', 'NPC', 'генерация'],
  },
];

export default function ArticlesPage() {
  const [recentlyViewed, setRecentlyViewed] = useState<Article[]>([]);
  const [userTags, setUserTags] = useState<Record<string, number>>({});

  // Загружаем данные из localStorage
  useEffect(() => {
    try {
      const savedViewed = localStorage.getItem('recentlyViewed');
      if (savedViewed) setRecentlyViewed(JSON.parse(savedViewed));

      const savedTags = localStorage.getItem('userTags');
      if (savedTags) setUserTags(JSON.parse(savedTags));
    } catch (e) {
      console.error('Failed to load from localStorage', e);
    }
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Основной контент */}
      <main className="lg:col-span-2 space-y-8">
        <h1 className="text-3xl font-bold mb-8">Статьи</h1>

        {/* Список статей */}
        {articles.map((article) => (
          <article key={article.id} className="card bg-bg-card rounded-2xl p-6 border border-border shadow-lg">
            <div className="flex gap-6 items-center">
              <Link href={`/articles/${article.id}`}>
                <img
                  src={article.image}
                  alt={article.title}
                  width={218}
                  height={124}
                  className="rounded-xl object-cover shadow"
                />
              </Link>
              <div>
                <span className="text-xs font-semibold bg-purple-500/15 text-purple-300 px-2 py-1 rounded-full border border-purple-500/30">
                  {article.category}
                </span>
                <h2 className="text-xl font-bold mb-2 mt-2">
                  <Link href={`/articles/${article.id}`} className="hover:text-accent transition">
                    {article.title}
                  </Link>
                </h2>
                <p className="text-muted-foreground text-sm mb-2">
                  {article.date} • Автор: {article.author}
                </p>
                <p className="text-muted-foreground line-clamp-3 text-sm mb-3">
                  {article.excerpt}
                </p>
                <div className="tags flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
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

      {/* Сайдбар */}
      <Sidebar />
    </div>
  );
}