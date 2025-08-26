// src/components/search-bar.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Типы
type SearchItem = {
  title: string;
  url: string;
  tags: string[];
};

const searchIndex: SearchItem[] = [
  {
    title: 'Frostpunk 2 получила дату релиза и новый трейлер',
    url: '/news/frostpunk-2',
    tags: ['стратегия', '11 bit studios', 'постапокалипсис'],
  },
  {
    title: 'Rockstar показала первый геймплей GTA 6',
    url: '/news/gta-6',
    tags: ['экшен', 'Rockstar', 'открытый мир'],
  },
  {
    title: 'Hollow Knight: Silksong наконец-то получила релиз-дату',
    url: '/news/hollow-knight-silksong',
    tags: ['метроидвания', 'Team Cherry', '2D платформер'],
  },
  {
    title: 'Sony раскрыла игры ноября для PS Plus',
    url: '/news/sony-ps-plus',
    tags: ['PS Plus', 'Sony', 'эксклюзивы'],
  },
  {
    title: 'Как ИИ меняет индустрию игр: новая технология от NVIDIA',
    url: '/news/ai-in-games',
    tags: ['искусственный интеллект', 'NVIDIA', 'технологии'],
  },
];

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchItem[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === '') {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const filtered = searchIndex.filter(
      (item) =>
        item.title.toLowerCase().includes(value.toLowerCase()) ||
        item.tags.some((tag) => tag.toLowerCase().includes(value.toLowerCase()))
    );

    setSuggestions(filtered.slice(0, 7));
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (url: string) => {
    router.push(url);
    setQuery('');
    setShowSuggestions(false);
  };

  const handleBlur = () => {
    setTimeout(() => setShowSuggestions(false), 150);
  };

  return (
    <div className="relative ml-4 flex-1 max-w-md" onBlur={handleBlur}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Поиск по играм, тегам, статьям..."
        className="w-full px-4 py-2 rounded-full bg-opacity-10 bg-white text-foreground placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-purple-500/30"
        aria-label="Поиск"
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute top-full mt-1 w-full bg-bg-card border border-border rounded-xl shadow-lg max-h-60 overflow-y-auto z-50">
          {suggestions.map((item, i) => (
            <li
              key={i}
              className="px-4 py-2 text-sm text-muted-foreground hover:bg-purple-500/10 hover:text-accent cursor-pointer transition"
              onClick={() => handleSuggestionClick(item.url)}
              dangerouslySetInnerHTML={{
                __html: item.title.replace(
                  new RegExp(query, 'gi'),
                  (match) => `<strong>${match}</strong>`
                ),
              }}
            />
          ))}
        </ul>
      )}
    </div>
  );
}