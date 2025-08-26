// src/app/api/page.tsx
'use client';

export default function ApiPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16 space-y-16">
      {/* Заголовок */}
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold">API GtaGo</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Получите доступ к данным о новостях, обзорах и играх через наш публичный API.
          <br />
          Постройте собственное приложение, виджет или интеграцию.
        </p>
      </div>

      {/* Статус */}
      <div className="bg-green-500/10 border border-green-500/30 text-green-400 rounded-2xl p-6 text-center text-sm">
        ✅ API работает в режиме реального времени • Доступ свободный • Без аутентификации
      </div>

      {/* Базовый URL */}
      <section className="bg-bg-card rounded-2xl p-8 border border-border">
        <h2 className="text-2xl font-bold mb-4">Базовый URL</h2>
        <code className="block bg-bg p-4 rounded-lg text-sm font-mono text-foreground">
          https://gtago.ru/api
        </code>
      </section>

      {/* Доступные эндпоинты */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">Доступные эндпоинты</h2>

        {[
          {
            endpoint: '/news',
            method: 'GET',
            description: 'Получить список всех новостей',
            response: `{ "id": "frostpunk-2", "title": "Frostpunk 2 — релиз и трейлер", "excerpt": "...", "image": "...", "date": "15 октября 2024", "tags": ["стратегия", "Frostpunk 2"] }`,
          },
          {
            endpoint: '/reviews',
            method: 'GET',
            description: 'Получить список обзоров',
            response: `{ "id": "baldurs-gate-3", "title": "Baldur's Gate 3 — лучшая RPG десятилетия", "rating": 10, "author": "Артём Лебедев" }`,
          },
          {
            endpoint: '/guides',
            method: 'GET',
            description: 'Получить список гайдов',
            response: `{ "id": "stalker-2", "title": "Гайд по Stalker 2", "game": "S.T.A.L.K.E.R. 2", "length": "15 мин" }`,
          },
          {
            endpoint: '/videos',
            method: 'GET',
            description: 'Получить список видео',
            response: `{ "id": "gta-6-gameplay", "title": "GTA 6 — первый геймплей", "duration": "8:12", "views": "4.5M" }`,
          },
        ].map((api, i) => (
          <div key={i} className="bg-bg-card rounded-2xl p-6 border border-border space-y-3">
            <div className="flex flex-wrap items-center gap-4">
              <span className="font-mono bg-purple-500/15 text-foreground px-3 py-1 rounded-full text-sm font-semibold border border-purple-500/30">
                {api.method}
              </span>
              <code className="font-bold text-lg">{api.endpoint}</code>
            </div>
            <p className="text-muted-foreground">{api.description}</p>
            <div className="mt-4">
              <h4 className="text-sm font-semibold mb-2">Пример ответа:</h4>
              <pre className="bg-bg p-4 rounded-lg text-xs font-mono text-foreground overflow-x-auto">
                {api.response}
              </pre>
            </div>
          </div>
        ))}
      </section>

      {/* Пример использования */}
      <section className="bg-bg-card rounded-2xl p-8 border border-border space-y-6">
        <h2 className="text-2xl font-bold">Пример: Получение новостей</h2>
        <p className="text-muted-foreground">
          Вот как можно получить последние новости с помощью JavaScript:
        </p>
        <pre className="bg-bg p-4 rounded-lg text-sm font-mono text-foreground overflow-x-auto">
{`fetch('https://gtago.ru/api/news')
  .then(response => response.json())
  .then(data => {
    console.log(data);
  });`}
        </pre>
      </section>

      {/* Правила использования */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Правила использования</h2>
        <ul className="space-y-3 text-muted-foreground">
          <li>• Не делайте более 100 запросов в минуту</li>
          <li>• Не используйте API для спама или агрессивного парсинга</li>
          <li>• Указывайте ссылку на GtaGo, если используете данные публично</li>
          <li>• Запрещено изменять или искажать контент</li>
        </ul>
        <p className="text-sm text-yellow-400 mt-4">
          ⚠️ Мы оставляем за собой право заблокировать IP при нарушении правил.
        </p>
      </section>

      {/* Поддержка */}
      <section className="text-center space-y-6">
        <h2 className="text-2xl font-bold">Нужна помощь?</h2>
        <p className="text-muted-foreground">
          По вопросам интеграции и расширенного доступа — пишите:
        </p>
        <a
          href="mailto:dev@gtago.ru"
          className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full hover:from-purple-700 hover:to-blue-700 transition"
        >
          dev@gtago.ru
        </a>
      </section>
    </div>
  );
}