// src/app/adminka/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

// 🟩 Типы данных
type Visitor = {
  id: string;
  ip: string;
  gender: 'male' | 'female' | 'other';
  age: number;
  country: string;
  firstVisit: boolean;
  timeOnSite: number; // в секундах
  pagesVisited: string[];
  timestamp: number; // Date.now()
};

type Stats = {
  online: number;
  today: number;
  last48h: number;
  last72h: number;
  week: number;
  month: number;
  year: number;
};

// 🟩 Цвета для диаграмм
const COLORS = ['#a855f7', '#6366f1', '#8b5cf6', '#c084fc', '#a78bfa'];

export default function AdminkaPage() {
  const [stats, setStats] = useState<Stats>({
    online: 0,
    today: 0,
    last48h: 0,
    last72h: 0,
    week: 0,
    month: 0,
    year: 0,
  });

  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [activeTab, setActiveTab] = useState<'online' | 'today' | 'week' | 'month'>('online');

  // 🟩 Загружаем данные из localStorage
  useEffect(() => {
    const saved = localStorage.getItem('siteAnalytics');
    if (saved) {
      const data: Visitor[] = JSON.parse(saved);
      setVisitors(data);

      // Обновляем статистику
      const now = Date.now();
      const oneDay = 24 * 60 * 60 * 1000;
      const oneWeek = 7 * oneDay;
      const oneMonth = 30 * oneDay;
      const oneYear = 365 * oneDay;

      const online = data.filter(v => now - v.timestamp < 5 * 60 * 1000).length;
      const today = data.filter(v => now - v.timestamp < oneDay).length;
      const last48h = data.filter(v => now - v.timestamp < 2 * oneDay).length;
      const last72h = data.filter(v => now - v.timestamp < 3 * oneDay).length;
      const week = data.filter(v => now - v.timestamp < oneWeek).length;
      const month = data.filter(v => now - v.timestamp < oneMonth).length;
      const year = data.filter(v => now - v.timestamp < oneYear).length;

      setStats({
        online,
        today,
        last48h,
        last72h,
        week,
        month,
        year,
      });
    }
  }, []);

  // 🟩 Фильтруем посетителей по вкладкам
  const filteredVisitors = visitors.filter(v => {
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;
    const oneWeek = 7 * oneDay;
    const oneMonth = 30 * oneDay;

    switch (activeTab) {
      case 'online':
        return now - v.timestamp < 5 * 60 * 1000;
      case 'today':
        return now - v.timestamp < oneDay;
      case 'week':
        return now - v.timestamp < oneWeek;
      case 'month':
        return now - v.timestamp < oneMonth;
      default:
        return true;
    }
  });

  // 🟩 Данные для графиков
  const chartData = [
    { name: 'Онлайн', count: stats.online },
    { name: 'Сегодня', count: stats.today },
    { name: '48ч', count: stats.last48h },
    { name: '72ч', count: stats.last72h },
    { name: 'Неделя', count: stats.week },
    { name: 'Месяц', count: stats.month },
    { name: 'Год', count: stats.year },
  ];

  const genderData = [
    { name: 'Мужчины', value: visitors.filter(v => v.gender === 'male').length },
    { name: 'Женщины', value: visitors.filter(v => v.gender === 'female').length },
    { name: 'Другие', value: visitors.filter(v => v.gender === 'other').length },
  ];

  const ageData = [
    { name: '18-25', value: visitors.filter(v => v.age >= 18 && v.age <= 25).length },
    { name: '26-35', value: visitors.filter(v => v.age >= 26 && v.age <= 35).length },
    { name: '36-45', value: visitors.filter(v => v.age >= 36 && v.age <= 45).length },
    { name: '46+', value: visitors.filter(v => v.age >= 46).length },
  ];

  const countryData = [
    { name: 'Россия', value: visitors.filter(v => v.country === 'RU').length },
    { name: 'Украина', value: visitors.filter(v => v.country === 'UA').length },
    { name: 'Беларусь', value: visitors.filter(v => v.country === 'BY').length },
    { name: 'Казахстан', value: visitors.filter(v => v.country === 'KZ').length },
    { name: 'Другие', value: visitors.filter(v => !['RU', 'UA', 'BY', 'KZ'].includes(v.country)).length },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
      {/* === Заголовок === */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
          🛠 Админка GtaGo
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Аналитика посещений, пользователи, страницы и статистика сайта
        </p>
      </div>

      {/* === Статистика по времени === */}
      <section className="bg-bg-card rounded-2xl p-8 border border-border shadow-lg">
        <h2 className="text-2xl font-bold mb-6">📊 Статистика по времени</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {chartData.map((item) => (
            <div key={item.name} className="text-center p-4 bg-purple-500/10 rounded-xl border border-purple-500/30">
              <div className="text-2xl font-bold text-accent">{item.count}</div>
              <div className="text-sm text-muted-foreground mt-2">{item.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* === Графики === */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Пол */}
        <div className="bg-bg-card rounded-2xl p-6 border border-border shadow-lg">
          <h3 className="text-xl font-bold mb-4">👫 Пол пользователей</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={genderData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {genderData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Возраст */}
        <div className="bg-bg-card rounded-2xl p-6 border border-border shadow-lg">
          <h3 className="text-xl font-bold mb-4">🎂 Возраст пользователей</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#a855f7" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Страны */}
        <div className="bg-bg-card rounded-2xl p-6 border border-border shadow-lg lg:col-span-2">
          <h3 className="text-xl font-bold mb-4">🌍 Страны пользователей</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={countryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {countryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* === Таблица пользователей === */}
      <section className="bg-bg-card rounded-2xl p-8 border border-border shadow-lg">
        <h2 className="text-2xl font-bold mb-6">👥 Пользователи</h2>
        
        {/* Вкладки */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(['online', 'today', 'week', 'month'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                activeTab === tab
                  ? 'bg-purple-500 text-white'
                  : 'bg-purple-500/15 text-foreground border border-purple-500/30'
              }`}
            >
              {tab === 'online' && 'Онлайн'}
              {tab === 'today' && 'Сегодня'}
              {tab === 'week' && 'Неделя'}
              {tab === 'month' && 'Месяц'}
            </button>
          ))}
        </div>

        {/* Таблица */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">IP</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Пол</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Возраст</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Страна</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Первый визит</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Время на сайте</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Страницы</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredVisitors.slice(0, 10).map((visitor) => (
                <tr key={visitor.id}>
                  <td className="px-4 py-3 text-sm text-foreground">{visitor.ip}</td>
                  <td className="px-4 py-3 text-sm text-foreground">
                    {visitor.gender === 'male' && '♂ Мужской'}
                    {visitor.gender === 'female' && '♀ Женский'}
                    {visitor.gender === 'other' && 'Другой'}
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">{visitor.age}</td>
                  <td className="px-4 py-3 text-sm text-foreground">{visitor.country}</td>
                  <td className="px-4 py-3 text-sm text-foreground">
                    {visitor.firstVisit ? 'Да' : 'Нет'}
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">
                    {Math.round(visitor.timeOnSite / 60)} мин
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">
                    {visitor.pagesVisited.join(', ')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* === Кнопка сброса данных === */}
      <div className="text-center">
        <button
          onClick={() => {
            localStorage.removeItem('siteAnalytics');
            setVisitors([]);
            setStats({
              online: 0,
              today: 0,
              last48h: 0,
              last72h: 0,
              week: 0,
              month: 0,
              year: 0,
            });
          }}
          className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full hover:from-red-600 hover:to-orange-600 transition transform hover:scale-105 shadow-lg"
        >
          Сбросить аналитику
        </button>
      </div>
    </div>
  );
}