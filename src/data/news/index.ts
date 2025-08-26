// src/data/news/index.ts

// ✅ Явно импортируем каждую новость
import { frostpunk2News } from './frostpunk-2';
import { gta6News } from './gta-6';
import { hollowKnightSilksongNews } from './hollow-knight-silksong';

// ✅ Экспортируем массив всех новостей
export const allNews = [
  frostpunk2News,
  gta6News,
  hollowKnightSilksongNews,
  
  // Добавляйте сюда другие при необходимости
] as const;