// src/app/bloggers/page.tsx
'use client';

import Link from 'next/link';

export default function BloggersPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16 space-y-16">
      {/* Заголовок */}
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold">Блогерам и авторам</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Хотите сотрудничать с крупнейшим игровым порталом? 
          GtaGo открывает двери для талантливых авторов, стримеров и создателей контента.
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
            <p className="text-sm text-muted-foreground">Вовлечённость зрителей</p>
          </div>
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-accent">12 лет</div>
            <p className="text-sm text-muted-foreground">На рынке игрового контента</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-6 leading-relaxed">
          Мы не просто публикуем контент — мы создаём медиа-вселенную. 
          Наши авторы получают доступ к эксклюзивным материалам, пресс-китам и совместным проектам с крупными студиями.
        </p>
      </section>

      {/* Форматы для блогеров */}
      <section className="space-y-12">
        <h2 className="text-3xl font-bold text-center">Форматы для авторов</h2>

        {[
          {
            title: 'Гостевой автор',
            desc: 'Пишите статьи, обзоры или гайды под брендом GtaGo. Ваш стиль + наша аудитория.',
            reach: 'До 200 000 просмотров на материал',
          },
          {
            title: 'Совместное видео',
            desc: 'Снимаем видео вместе с вами: разбор, реакция, челлендж или стрим.',
            reach: 'От 300 000 просмотров',
          },
          {
            title: 'Гость в шоу',
            desc: 'Приглашаем вас в наши авторские шоу: «Разбор полётов», «Инфакт», «Страшно, вырубай».',
            reach: 'От 450 000 просмотров',
          },
          {
            title: 'Геймификация',
            desc: 'Создаём совместные квесты, лендинги и челленджи с вашим участием.',
            reach: 'Охват до 1 млн+',
          },
          {
            title: 'Пресс-туры и ивенты',
            desc: 'Приглашаем на закрытые презентации, релизы и встречи с разработчиками.',
            reach: 'Эксклюзивный контент для вашей аудитории',
          },
        ].map((item, i) => (
          <div key={i} className="bg-bg-card rounded-2xl p-8 border border-border space-y-4">
            <h3 className="text-2xl font-bold">{item.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
            <p>
              <strong>Ожидаемый охват:</strong>{' '}
              <span className="text-green-400 font-semibold">{item.reach}</span>
            </p>
          </div>
        ))}
      </section>

      {/* Условия участия */}
      <section className="bg-bg-card rounded-2xl p-8 border border-border space-y-6">
        <h2 className="text-2xl font-bold">Условия участия</h2>
        <ul className="space-y-3 text-muted-foreground">
          <li>• У вас есть канал/блог с аудиторией от 10 000 подписчиков</li>
          <li>• Вы делаете качественный контент по играм, GTA, экшенам или киберкультуре</li>
          <li>• Вы готовы к долгосрочному сотрудничеству</li>
          <li>• Вы не используете токсичность, кликбейт и враждебный тон</li>
        </ul>
        <p className="text-sm text-muted-foreground mt-4">
          Мы не платим за разовые публикации. Наша цель — построить <strong>долгосрочные отношения</strong> с авторами, которые разделяют ценности GtaGo.
        </p>
      </section>

      {/* Призыв к действию */}
      <section className="text-center space-y-6">
        <h2 className="text-2xl font-bold">Готовы начать?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Отправьте заявку — и мы свяжемся с вами, чтобы обсудить формат сотрудничества.
        </p>
        <div className="space-y-4">
          <Link
            href="mailto:bloggers@gtago.ru"
            className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full hover:from-purple-700 hover:to-blue-700 transition shadow-lg"
          >
            Отправить заявку
          </Link>
          <p className="text-sm text-muted-foreground block mt-4">
            По вопросам: <a href="mailto:bloggers@gtago.ru" className="text-accent hover:underline">bloggers@gtago.ru</a>
          </p>
        </div>
      </section>

      {/* Примеры проектов */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-center">Примеры успешных проектов</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'STALCRAFT:X', reach: '607K просмотров', type: 'Геймификация' },
            { name: 'Apex Legends Live', reach: '160K просмотров', type: 'Стрим-турнир' },
            { name: 'Качественный контент', reach: '1.2M+ охват', type: 'Мультфильм' },
          ].map((proj, i) => (
            <div key={i} className="bg-bg-card rounded-2xl p-6 border border-border text-center space-y-2">
              <h3 className="font-bold">{proj.name}</h3>
              <span className="text-xs bg-purple-500/15 text-foreground px-2 py-1 rounded border border-purple-500/30">
                {proj.type}
              </span>
              <p className="text-sm text-green-400 font-semibold mt-2">{proj.reach}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}