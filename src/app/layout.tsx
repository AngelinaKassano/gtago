// src/app/layout.tsx
import './globals.css';
import { ThemeProvider } from '@/lib/theme';
import Header from '@/app/components/header';
import Footer from '@/app/components/footer';
import NotificationBanner from '@/app/components/notification-banner';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {/* === Игровой фон с частицами === */}
       
          
          
          {/* === Динамические частицы === */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                document.addEventListener('DOMContentLoaded', () => {
                  const container = document.querySelector('.game-bg');
                  if (!container) return;

                  // Создаём 20 частиц
                  for (let i = 0; i < 20; i++) {
                    const p = document.createElement('div');
                    p.className = 'particle';
                    p.style.left = Math.random() * 100 + 'vw';
                    p.style.top = Math.random() * 100 + 'vh';
                    p.style.width = Math.random() * 3 + 'px';
                    p.style.height = Math.random() * 3 + 'px';
                    p.style.opacity = Math.random() * 0.7 + 0.3;
                    p.style.animationDelay = Math.random() * 3 + 's';
                    p.style.backgroundColor = '#a855f7';
                    container.appendChild(p);
                  }
                });
              `,
            }}
          />

          {/* === Сбор аналитики === */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  // Собираем аналитику
                  const visitor = {
                    id: Math.random().toString(36).substr(2, 9),
                    ip: '192.168.1.' + Math.floor(Math.random() * 255), // mock IP
                    gender: Math.random() > 0.5 ? 'male' : 'female',
                    age: Math.floor(Math.random() * 30) + 18,
                    country: ['RU', 'UA', 'BY', 'KZ'][Math.floor(Math.random() * 4)],
                    firstVisit: Math.random() > 0.7,
                    timeOnSite: Math.floor(Math.random() * 300) + 60, // 1-5 минут
                    pagesVisited: ['/news/frostpunk-2', '/reviews/baldurs-gate-3', '/guides/stalker-2'],
                    timestamp: Date.now(),
                  };

                  try {
                    const saved = localStorage.getItem('siteAnalytics');
                    const data = saved ? JSON.parse(saved) : [];
                    data.push(visitor);
                    localStorage.setItem('siteAnalytics', JSON.stringify(data));
                  } catch (e) {
                    console.warn('Failed to save analytics', e);
                  }
                })();
              `,
            }}
          />

          <Header />
          <main>{children}</main>
          <Footer />
            <NotificationBanner />
        </ThemeProvider>
      </body>
    </html>
  );
}