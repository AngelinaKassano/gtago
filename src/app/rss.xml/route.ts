// src/app/rss.xml/route.ts
import { allNews } from '@/data/news';

export async function GET() {
  const baseUrl = 'https://gtago.ru'; // Замените на ваш домен

  // Формируем XML
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>GtaGo — Новости, обзоры и гайды по играм</title>
    <description>Ваш главный источник новостей, обзоров и гайдов по GTA и другим экшен-играм. Актуальные трейлеры, релизы и аналитика — всё в одном месте.</description>
    <link>${baseUrl}</link>
    <language>ru</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />

    ${allNews.map(news => `
    <item>
      <title><![CDATA[${news.title}]]></title>
      <description><![CDATA[${news.excerpt}]]></description>
      <link>${baseUrl}/news/${news.id}</link>
      <guid isPermaLink="true">${baseUrl}/news/${news.id}</guid>
      <pubDate>${new Date(news.date).toUTCString()}</pubDate>
      <category>${news.tags.join('</category><category>')}</category>
    </item>
    `).join('')}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600', // Кэширование 1 час
    },
  });
}