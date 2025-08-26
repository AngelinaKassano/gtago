// src/app/advertising/page.tsx
'use client';

import { useState } from 'react';

export default function AdvertisingPage() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.');
    setFormData({ name: '', company: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-16">
      {/* Заголовок */}
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold">Реклама на GtaGo</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Привлекайте аудиторию геймеров через точечную рекламу на крупнейшем портале о GTA и экшен-играх.
        </p>
      </div>

      {/* Почему GtaGo? */}
      <section className="bg-bg-card rounded-2xl p-8 border border-border space-y-6">
        <h2 className="text-2xl font-bold">Почему выбирают нас?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-accent">850K+</div>
            <p className="text-sm text-muted-foreground">Ежемесячная аудитория</p>
          </div>
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-accent">78%</div>
            <p className="text-sm text-muted-foreground">Вовлечённость аудитории</p>
          </div>
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-accent">12 лет</div>
            <p className="text-sm text-muted-foreground">На рынке игрового контента</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-6 leading-relaxed">
          GtaGo — это не просто сайт, а доверенная платформа для миллионов геймеров. 
          Наша аудитория — активные игроки, которые принимают решения о покупке игр, гаджетов и подписок. 
          Мы помогаем брендам выстроить долгосрочные отношения с этой аудиторией через качественный, честный и вовлекающий контент.
        </p>
      </section>

      {/* Что вы получаете */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Что вы получаете при размещении рекламы?</h2>
        <ul className="space-y-4 text-muted-foreground">
          <li className="flex items-start gap-3">
            <span className="text-accent mt-1">•</span>
            <span><strong>Целевая аудитория:</strong> геймеры 16–35 лет, интересующиеся GTA, экшенами, стримингом и киберкультурой.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-accent mt-1">•</span>
            <span><strong>Высокий охват:</strong> до 500 000 показов в месяц на одном баннере.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-accent mt-1">•</span>
            <span><strong>Доверие к бренду:</strong> мы не продвигаем всё подряд — только то, что соответствует духу сайта.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-accent mt-1">•</span>
            <span><strong>Аналитика и отчётность:</strong> прозрачная статистика по охвату, CTR и вовлечённости.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-accent mt-1">•</span>
            <span><strong>Поддержка команды:</strong> поможем с креативами, текстами и запуском кампании.</span>
          </li>
        </ul>
      </section>

      {/* Пакеты рекламы */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            name: 'Стандарт',
            price: 'от 25 000 ₽',
            features: ['Баннер 300×250', 'Публикация в ленте', 'До 50 тыс. показов', 'Отчёт по охвату'],
          },
          {
            name: 'Премиум',
            price: 'от 60 000 ₽',
            features: ['Баннер 728×90 + 300×600', 'Приоритет в ленте', 'Видео-ролл (15 сек)', 'До 200 тыс. показов', 'CTR-аналитика'],
            highlight: true,
          },
          {
            name: 'Интеграция',
            price: 'от 120 000 ₽',
            features: ['Обзор с упоминанием', 'Гайд с интеграцией', 'Баннеры + видео', 'До 500 тыс. показов', 'Персонализированная кампания'],
          },
        ].map((pkg, i) => (
          <div
            key={i}
            className={`rounded-2xl p-6 border transition-all duration-300 hover:shadow-lg ${
              pkg.highlight
                ? 'bg-gradient-to-b from-purple-500/10 to-transparent border-purple-500 scale-105'
                : 'border-border bg-bg-card hover:border-accent'
            }`}
          >
            {pkg.highlight && (
              <span className="inline-block bg-gradient-to-r from-purple-500 to-purple-600 text-white text-xs px-3 py-1 rounded-full mb-4 font-semibold">
                Лучшее соотношение
              </span>
            )}
            <h3 className="text-xl font-bold">{pkg.name}</h3>
            <div className="text-2xl font-bold mt-2 text-foreground">{pkg.price}</div>
            <ul className="mt-4 space-y-2">
              {pkg.features.map((feat, j) => (
                <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  {feat}
                </li>
              ))}
            </ul>
            <button
              className={`w-full mt-6 py-2 rounded-lg border transition-all ${
                pkg.highlight
                  ? 'bg-purple-500 text-white border-transparent hover:bg-purple-600 hover:shadow-md'
                  : 'border-border hover:bg-bg hover:text-accent hover:border-accent'
              }`}
              onClick={() => {
                const modal = document.getElementById('contact-modal');
                if (modal) modal.classList.remove('hidden');
              }}
            >
              Подать заявку
            </button>
          </div>
        ))}
      </section>

      {/* Форма обратной связи */}
      <section className="bg-bg-card rounded-2xl p-8 border border-border">
        <h2 className="text-2xl font-bold mb-6">Свяжитесь с нами</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Оставьте заявку — и наш менеджер свяжется с вами в течение 24 часов, чтобы обсудить детали кампании.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="name"
              placeholder="Ваше имя"
              value={formData.name}
              onChange={handleChange}
              className="px-4 py-2 bg-transparent border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/30"
              required
            />
            <input
              type="text"
              name="company"
              placeholder="Компания"
              value={formData.company}
              onChange={handleChange}
              className="px-4 py-2 bg-transparent border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/30"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="px-4 py-2 bg-transparent border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/30"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Телефон"
              value={formData.phone}
              onChange={handleChange}
              className="px-4 py-2 bg-transparent border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/30"
            />
          </div>
          <textarea
            name="message"
            placeholder="Расскажите о вашем продукте и целях кампании"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 bg-transparent border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/30"
          ></textarea>
          <button
            type="submit"
            className="px-6 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition shadow-md hover:shadow-lg"
          >
            Отправить заявку
          </button>
        </form>
      </section>

      {/* Контакты */}
      <section className="text-center space-y-4 text-sm text-muted-foreground">
        <p>
          По всем вопросам: <a href="mailto:ads@gtago.ru" className="text-accent hover:underline">ads@gtago.ru</a>
        </p>
        <p>Мы отвечаем в течение 24 часов.</p>
      </section>
    </div>
  );
}