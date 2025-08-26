// Общий тип для всех новостей
export type News = {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
  content: string;
  tags: string[];
};