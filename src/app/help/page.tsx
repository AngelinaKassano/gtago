// src/app/help/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

const helpSections = [
  {
    title: 'Как пользоваться сайтом',
    content: (
      <>
        <p className="mb-4">
          GtaGo — это ваш портал в мир GTA, экшен-игр и уличной культуры. Чтобы максимально эффективно использовать сайт:
        </p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Кликаете по тегам — сайт запоминает ваши интересы и показывает персональные рекомендации</li>
          <li>Добавляете статьи в «Недавно просмотренные» — они сохраняются в localStorage</li>
          <li>Используете поиск в шапке сайта, чтобы быстро найти нужную новость или обзор</li>
          <li>Переключаете тему (светлая/тёмная) в правом верхнем углу</li>
        </ul>
      </>
    ),
  },
  {
    title: 'Как работает персонализация',
    content: (
      <>
        <p className="mb-4">
          Мы не следим за вами — мы помогаем вам находить то, что интересно.
        </p>
        <p className="mb-4">
          Когда вы кликаете по тегам (например, <span className="tag bg-purple-500/15 px-2 py-1 rounded text-xs">GTA</span> или <span className="tag bg-purple-500/15 px-2 py-1 rounded text-xs">стратегия</span>), сайт сохраняет ваши предпочтения в <code className="bg-bg-card px-1 py-0.5 rounded text-sm">localStorage</code> и показывает релевантные рекомендации в сайдбаре.
        </p>
        <p className="text-sm text-muted-foreground">
          Ваши данные остаются на вашем устройстве. Мы не передаём их третьим лицам.
        </p>
      </>
    ),
  },
  {
    title: 'Как добавить сайт на главный экран (мобильные устройства)',
    content: (
      <>
        <p className="mb-4">Чтобы GtaGo работал как приложение:</p>
        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
          <li>Откройте сайт в браузере (Chrome, Safari)</li>
          <li>Нажмите на иконку «Поделиться» или «Меню»</li>
          <li>Выберите «Добавить на главный экран»</li>
          <li>Подтвердите добавление</li>
        </ol>
        <p className="mt-4 text-sm">
          Теперь GtaGo будет запускаться как полноценное приложение — без адресной строки.
        </p>
      </>
    ),
  },
  {
    title: 'Как отключить уведомления',
    content: (
      <p>
        Мы не отправляем push-уведомления. Если вы видите рекламные уведомления — это сторонние сайты. 
        GtaGo не запрашивает разрешение на уведомления.
      </p>
    ),
  },
  {
    title: 'Как сообщить об ошибке',
    content: (
      <>
        <p className="mb-4">
          Нашли баг, сломанную ссылку или опечатку? Спасибо, что помогаете улучшать сайт!
        </p>
        <p>
          Напишите нам на: <a href="mailto:info@gtago.ru" className="text-accent hover:underline">info@gtago.ru</a> 
          с темой письма <strong>"Ошибка на сайте"</strong> и укажите:
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
          <li>Страницу, где ошибка</li>
          <li>Описание проблемы</li>
          <li>Скриншот (если возможно)</li>
        </ul>
      </>
    ),
  },
  {
    title: 'Почему нет комментариев?',
    content: (
      <p>
        Мы убрали комментарии, чтобы избежать токсичности, флуда и троллинга. 
        Вместо этого мы активны в <strong>Telegram</strong> и <strong>соцсетях</strong>, где ведём диалог с аудиторией в уважительной среде.
      </p>
    ),
  },
  {
    title: 'Поддержка и обратная связь',
    content: (
      <>
        <p className="mb-4">По любым вопросам — мы на связи:</p>
        <div className="space-y-2 text-sm">
          <p><strong>Общие вопросы:</strong> <a href="mailto:info@gtago.ru" className="text-accent hover:underline">info@gtago.ru</a></p>
          <p><strong>Реклама и сотрудничество:</strong> <a href="mailto:ads@gtago.ru" className="text-accent hover:underline">ads@gtago.ru</a></p>
          <p><strong>Технические ошибки:</strong> <a href="mailto:dev@gtago.ru" className="text-accent hover:underline">dev@gtago.ru</a></p>
        </div>
      </>
    ),
  },
];

export default function HelpPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Открываем первый блок по умолчанию

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-8">
      {/* Заголовок */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Помощь по сайту</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Всё, что нужно знать о работе GtaGo: от персонализации до обратной связи.
        </p>
      </div>

      {/* Секция помощи */}
      <div className="space-y-4 mt-12">
        {helpSections.map((section, index) => (
          <div
            key={index}
            className="border border-border rounded-2xl overflow-hidden bg-bg-card"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-5 text-left font-semibold text-lg flex justify-between items-center hover:bg-bg transition"
              aria-expanded={openIndex === index}
            >
              <span>{section.title}</span>
              <span className={`transform transition-transform ${openIndex === index ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>
            {openIndex === index && (
              <div className="px-6 pb-6 pt-2 text-muted-foreground leading-relaxed">
                {section.content}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Призыв к действию */}
      <div className="text-center mt-16 pt-8 border-t border-border">
        <p className="text-muted-foreground mb-4">
          Нужна дополнительная помощь?
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