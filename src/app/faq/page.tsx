// src/app/faq/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

const faqs = [
  {
    question: "Что такое GtaGo и чем вы отличаетесь от других игровых сайтов?",
    answer: "GtaGo — это не просто сайт, а медиа-платформа, посвящённая миру GTA, экшен-играм и уличной культуре. Мы делаем глубокие обзоры, авторские видео, спецпроекты и помогаем брендам выстраивать доверительные отношения с аудиторией геймеров."
  },
  {
    question: "Как часто публикуются новости?",
    answer: "Мы публикуем новости ежедневно. Основные анонсы, трейлеры и релизы — в режиме реального времени. Также у нас есть ежедневное видео «Инфакт», которое выходит каждое утро."
  },
  {
    question: "Почему на сайте нет комментариев?",
    answer: "Мы убрали комментарии, чтобы избежать токсичности и флуда. Вместо этого мы активны в соцсетях и Telegram, где ведём диалог с аудиторией в уважительной среде."
  },
  {
    question: "Как добавить свою игру или проект на сайт?",
    answer: "Если вы разработчик или представитель студии — свяжитесь с нами через раздел <a href='/advertising' class='text-accent hover:underline'>Реклама на сайте</a>. Мы рассматриваем интеграции, обзоры и совместные проекты."
  },
  {
    question: "Как работает персонализация новостей?",
    answer: "Когда вы кликаете по тегам (например, «стратегия» или «GTA»), сайт запоминает ваши интересы в localStorage и показывает персональные рекомендации в сайдбаре и в ленте."
  },
  {
    question: "Можно ли отключить тёмную тему?",
    answer: "Да! В правом верхнем углу есть переключатель темы. Вы можете выбрать светлую или тёмную тему — и сайт запомнит ваш выбор."
  },
  {
    question: "Какие браузеры поддерживаются?",
    answer: "Мы поддерживаем все современные браузеры: Chrome, Firefox, Safari, Edge. Сайт адаптирован под мобильные устройства и работает быстро даже на слабых интернет-соединениях."
  },
  {
    question: "Вы используете ИИ в своих материалах?",
    answer: "Да, мы используем ИИ для анализа трендов, генерации идей и ускорения редакционных процессов. Но все тексты проходят ручную проверку и подпись автора — мы не публикуем «сырой» ИИ-контент."
  },
  {
    question: "Как связаться с редакцией?",
    answer: "По общим вопросам: <a href='mailto:info@gtago.ru' class='text-accent hover:underline'>info@gtago.ru</a>.<br>По рекламе: <a href='mailto:ads@gtago.ru' class='text-accent hover:underline'>ads@gtago.ru</a>."
  },
  {
    question: "Будут ли у вас мобильное приложение?",
    answer: "Да, мобильное приложение GtaGo в разработке. Оно будет включать оффлайн-чтение, push-уведомления и персональные уведомления о релизах."
  }
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-8">
      {/* Заголовок */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Часто задаваемые вопросы</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Ответы на самые популярные вопросы о сайте, контенте и сотрудничестве.
        </p>
      </div>

      {/* Секция FAQ */}
      <div className="space-y-4 mt-12">
        {faqs.map((item, index) => (
          <div
            key={index}
            className="border border-border rounded-2xl overflow-hidden bg-bg-card"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-5 text-left font-semibold text-lg flex justify-between items-center hover:bg-bg transition"
              aria-expanded={openIndex === index}
            >
              <span>{item.question}</span>
              <span className={`transform transition-transform ${openIndex === index ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>
            {openIndex === index && (
              <div className="px-6 pb-5 pt-2 text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: item.answer }} />
            )}
          </div>
        ))}
      </div>

      {/* Призыв к действию */}
      <div className="text-center mt-16 pt-8 border-t border-border">
        <p className="text-muted-foreground mb-4">
          Не нашли ответ?
        </p>
        <Link
          href="/advertising"
          className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full hover:from-purple-700 hover:to-blue-700 transition"
        >
          Свяжитесь с нами
        </Link>
      </div>
    </div>
  );
}