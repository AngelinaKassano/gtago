// src/app/guidelines/page.tsx
'use client';

export default function GuidelinesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-12">
      {/* Заголовок */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Правила контента</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Наши принципы при создании материалов, выборе тем и взаимодействии с аудиторией.
        </p>
      </div>

      {/* Основные правила */}
      <section className="space-y-8">
        {[
          {
            title: '1. Уважение к аудитории',
            content: (
              <p>
                Мы пишем для людей, которые любят игры. Поэтому — без флейма, без провокаций, без кликбейта. 
                Каждый текст — это уважение к времени читателя.
              </p>
            ),
          },
          {
            title: '2. Честность и объективность',
            content: (
              <p>
                Мы не скрываем недостатки, даже если игра популярна. Мы не ставим «десятки» ради хайпа. 
                Мы говорим честно — и тогда доверие возвращается.
              </p>
            ),
          },
          {
            title: '3. Глубина, а не широта',
            content: (
              <p>
                Лучше один качественный обзор, чем десять поверхностных. Мы копаем глубже: механики, нарратив, 
                атмосфера — всё имеет значение.
              </p>
            ),
          },
          {
            title: '4. Актуальность и своевременность',
            content: (
              <p>
                Мы следим за трендами, но не гоняемся за сенсациями. Новости — быстро, но с проверкой фактов. 
                Релизы — сразу после выхода, с первыми впечатлениями.
              </p>
            ),
          },
          {
            title: '5. Авторский стиль',
            content: (
              <p>
                У каждого автора — свой голос. Мы не навязываем шаблоны. Но требуем грамотности, логики и 
                уважения к читателю. Текст должен быть не просто информацией, а мнением.
              </p>
            ),
          },
          {
            title: '6. Безопасность и этика',
            content: (
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Не публикуем персональные данные без согласия</li>
                <li>Не используем токсичный или дискриминационный язык</li>
                <li>Не распространяем дезинформацию</li>
                <li>Не манипулируем фактами ради сенсации</li>
              </ul>
            ),
          },
        ].map((rule, i) => (
          <div
            key={i}
            className="bg-bg-card rounded-2xl p-6 border border-border space-y-4"
          >
            <h2 className="text-2xl font-bold">{rule.title}</h2>
            <div className="text-muted-foreground leading-relaxed">
              {rule.content}
            </div>
          </div>
        ))}
      </section>

      {/* Для авторов */}
      <section className="bg-bg-card rounded-2xl p-8 border border-border space-y-4">
        <h2 className="text-2xl font-bold">Если вы хотите стать автором</h2>
        <p className="text-muted-foreground">
          Мы открыты к сотрудничеству с талантливыми авторами, блогерами и экспертами. 
          Вот что мы ожидаем от материалов:
        </p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-4">
          <li>Глубокий подход к теме</li>
          <li>Собственное мнение, аргументированное и честное</li>
          <li>Грамотная речь и структура</li>
          <li>Ссылки на источники (если используются)</li>
          <li>Уважение к сообществу и коллегам</li>
        </ul>
        <div className="mt-6">
          <a
            href="/bloggers"
            className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full hover:from-purple-700 hover:to-blue-700 transition"
          >
            Подать заявку
          </a>
        </div>
      </section>

      {/* Обратная связь */}
      <section className="text-center space-y-4 py-8">
        <p className="text-muted-foreground">
          Если вы нашли нарушение наших правил — сообщите нам:
        </p>
        <a
          href="mailto:editors@gtago.ru"
          className="inline-block text-accent hover:underline"
        >
          editors@gtago.ru
        </a>
      </section>
    </div>
  );
}