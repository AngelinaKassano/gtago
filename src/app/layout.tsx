// src/app/layout.tsx
import './globals.css';
import { ThemeProvider } from '@/lib/theme';
import Header from '@/app/components/header';
import Footer from '@/app/components/footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {/* === Фон с частицами === */}
          
          
          
          {/* === Динамические частицы === */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                document.addEventListener('DOMContentLoaded', () => {
                  const container = document.querySelector('.game-bg');
                  if (!container) return;

                  for (let i = 0; i < 20; i++) {
                    const p = document.createElement('div');
                    p.className = 'particle';
                    p.style.left = Math.random() * 100 + 'vw';
                    p.style.top = Math.random() * 100 + 'vh';
                    p.style.width = Math.random() * 3 + 'px';
                    p.style.height = Math.random() * 3 + 'px';
                    p.style.opacity = Math.random() * 0.7 + 0.3;
                    p.style.animationDelay = Math.random() * 3 + 's';
                    container.appendChild(p);
                  }
                });
              `,
            }}
          />

          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}