// src/app/games/platformer/page.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/app/components/sidebar';

export default function PlatformerGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [time, setTime] = useState(300);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  // Игровые объекты
  const gameState = useRef({
    player: {
      x: 50,
      y: 300,
      width: 32,
      height: 32,
      speed: 5,
      velX: 0,
      velY: 0,
      jumping: false,
      grounded: false,
    },
    keys: {
      right: false,
      left: false,
      up: false,
    },
    platforms: [
      // Земля
      { x: 0, y: 400, width: 800, height: 50 },
      // Платформы
      { x: 200, y: 350, width: 100, height: 20 },
      { x: 400, y: 300, width: 100, height: 20 },
      { x: 600, y: 250, width: 100, height: 20 },
      // Движущаяся платформа
      { x: 300, y: 200, width: 100, height: 20, moving: true, direction: 1 },
    ],
    coins: [
      { x: 250, y: 320, width: 16, height: 16, collected: false },
      { x: 450, y: 270, width: 16, height: 16, collected: false },
      { x: 650, y: 220, width: 16, height: 16, collected: false },
    ],
    enemies: [
      { x: 300, y: 380, width: 32, height: 32, type: 'goomba', speed: 2, direction: 1 },
      { x: 500, y: 330, width: 32, height: 32, type: 'koopa', speed: 1, direction: -1 },
    ],
    flag: { x: 750, y: 350, width: 32, height: 50 },
  });

  // Управление
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case 'd':
          gameState.current.keys.right = true;
          break;
        case 'ArrowLeft':
        case 'a':
          gameState.current.keys.left = true;
          break;
        case 'ArrowUp':
        case 'w':
        case ' ':
          gameState.current.keys.up = true;
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case 'd':
          gameState.current.keys.right = false;
          break;
        case 'ArrowLeft':
        case 'a':
          gameState.current.keys.left = false;
          break;
        case 'ArrowUp':
        case 'w':
        case ' ':
          gameState.current.keys.up = false;
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Игровой цикл
  useEffect(() => {
    if (gameOver || gameWon) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Таймер
    const timer = setInterval(() => {
      setTime(prev => prev - 1);
    }, 1000);

    // Игровой цикл
    const gameLoop = setInterval(() => {
      const state = gameState.current;
      const { player, keys, platforms, coins, enemies, flag } = state;

      // Гравитация
      player.velY += 0.5;

      // Движение
      if (keys.right) player.velX = player.speed;
      else if (keys.left) player.velX = -player.speed;
      else player.velX *= 0.8;

      // Прыжок
      if (keys.up && player.grounded) {
        player.velY = -12;
        player.jumping = true;
        player.grounded = false;
      }

      // Обновляем позицию
      player.x += player.velX;
      player.y += player.velY;

      // Проверка столкновений с платформами
      player.grounded = false;
      platforms.forEach(platform => {
        const dir = collisionCheck(player, platform);
        if (dir === 'bottom') {
          player.grounded = true;
          player.jumping = false;
          player.velY = 0;
          player.y = platform.y - player.height;
        }
      });

      // Проверка монеток
      coins.forEach(coin => {
        if (!coin.collected && collisionCheck(player, coin)) {
          coin.collected = true;
          setScore(prev => prev + 100);
        }
      });

      // Проверка врагов
      enemies.forEach(enemy => {
        if (collisionCheck(player, enemy)) {
          if (player.velY > 0 && player.y < enemy.y) {
            // Убили врага
            enemy.y = 1000; // Убираем врага
            player.velY = -8; // Отпрыгиваем
            setScore(prev => prev + 200);
          } else {
            // Игрок умер
            respawnPlayer();
          }
        }
      });

      // Проверка флага (победа)
      if (collisionCheck(player, flag)) {
        setGameWon(true);
        clearInterval(gameLoop);
        clearInterval(timer);
      }

      // Проверка падения
      if (player.y > canvas.height) {
        respawnPlayer();
      }

      // Движение платформ
      platforms.forEach(platform => {
        if (platform.moving) {
          platform.x += platform.direction * 1;
          if (platform.x < 100 || platform.x > 600) {
            platform.direction *= -1;
          }
        }
      });

      // Движение врагов
      enemies.forEach(enemy => {
        enemy.x += enemy.direction * enemy.speed;
        if (enemy.x < 200 || enemy.x > 700) {
          enemy.direction *= -1;
        }
      });

      // Рендер
      render(ctx, canvas.width, canvas.height);
    }, 1000 / 60);

    return () => {
      clearInterval(gameLoop);
      clearInterval(timer);
    };
  }, [gameOver, gameWon]);

  // Проверка столкновений
  const collisionCheck = (obj1: any, obj2: any) => {
    const vX = obj1.x + obj1.width / 2 - (obj2.x + obj2.width / 2);
    const vY = obj1.y + obj1.height / 2 - (obj2.y + obj2.height / 2);

    const hWidths = obj1.width / 2 + obj2.width / 2;
    const hHeights = obj1.height / 2 + obj2.height / 2;

    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
      const oX = hWidths - Math.abs(vX);
      const oY = hHeights - Math.abs(vY);

      if (oX >= oY) {
        if (vY > 0) return 'top';
        else return 'bottom';
      } else {
        if (vX > 0) return 'left';
        else return 'right';
      }
    }
    return null;
  };

  // Респаун игрока
  const respawnPlayer = () => {
    const state = gameState.current;
    state.player.x = 50;
    state.player.y = 300;
    state.player.velX = 0;
    state.player.velY = 0;
    setLives(prev => {
      if (prev <= 1) {
        setGameOver(true);
        return 0;
      }
      return prev - 1;
    });
  };

  // Рендер игры
  const render = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const state = gameState.current;
    const { player, platforms, coins, enemies, flag } = state;

    // Очищаем canvas
    ctx.clearRect(0, 0, width, height);

    // Фон
    ctx.fillStyle = '#87CEEB';
    ctx.fillRect(0, 0, width, height);

    // Платформы
    ctx.fillStyle = '#8B4513';
    platforms.forEach(platform => {
      ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    });

    // Монетки
    ctx.fillStyle = '#FFD700';
    coins.forEach(coin => {
      if (!coin.collected) {
        ctx.beginPath();
        ctx.arc(coin.x + coin.width / 2, coin.y + coin.height / 2, coin.width / 2, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // Враги
    ctx.fillStyle = '#8B0000';
    enemies.forEach(enemy => {
      ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    });

    // Флаг
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(flag.x, flag.y, flag.width, flag.height);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(flag.x + 10, flag.y + 10, 12, 30);

    // Игрок
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Счёт
    ctx.fillStyle = '#000';
    ctx.font = '16px Arial';
    ctx.fillText(`Счёт: ${score}`, 10, 20);
    ctx.fillText(`Жизни: ${lives}`, 10, 40);
    ctx.fillText(`Время: ${time}`, 10, 60);
  };

  // Перезапуск игры
  const restartGame = () => {
    setScore(0);
    setLives(3);
    setTime(300);
    setGameOver(false);
    setGameWon(false);
    const state = gameState.current;
    state.player.x = 50;
    state.player.y = 300;
    state.player.velX = 0;
    state.player.velY = 0;
    state.coins.forEach(coin => coin.collected = false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <main className="lg:col-span-2 space-y-8">
        <Link href="/games" className="text-purple-500 hover:underline mb-4 inline-block">
          ← Назад к играм
        </Link>

        <article className="card bg-bg-card rounded-2xl p-8 border border-border shadow-lg">
          <h1 className="text-3xl font-bold mb-4">🎮 Марио-платформер</h1>
          <p className="text-muted-foreground mb-6">
            20 октября 2024 • Автор: GtaGo Studio
          </p>

          {/* Игровое поле */}
          <div className="relative bg-bg rounded-xl border border-border p-4 mb-6">
            <canvas
              ref={canvasRef}
              width={800}
              height={450}
              className="w-full h-auto bg-sky-200 rounded-lg border border-border"
            />
            
            {/* Экран окончания */}
            {(gameOver || gameWon) && (
              <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center rounded-lg">
                <h2 className="text-3xl font-bold mb-4">
                  {gameOver ? '💀 Игра окончена' : '🎉 Победа!'}
                </h2>
                <p className="text-xl mb-6">Счёт: {score}</p>
                <button
                  onClick={restartGame}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full hover:from-purple-700 hover:to-blue-700 transition transform hover:scale-105 shadow-lg"
                >
                  Играть снова
                </button>
              </div>
            )}
          </div>

          {/* Управление */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">🕹️ Управление</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-bg-card p-4 rounded-xl border border-border text-center">
                <kbd className="px-3 py-1 bg-purple-500/15 text-foreground rounded-lg font-mono">←</kbd>
                <p className="text-sm mt-2">Влево</p>
              </div>
              <div className="bg-bg-card p-4 rounded-xl border border-border text-center">
                <kbd className="px-3 py-1 bg-purple-500/15 text-foreground rounded-lg font-mono">→</kbd>
                <p className="text-sm mt-2">Вправо</p>
              </div>
              <div className="bg-bg-card p-4 rounded-xl border border-border text-center">
                <kbd className="px-3 py-1 bg-purple-500/15 text-foreground rounded-lg font-mono">↑</kbd>
                <p className="text-sm mt-2">Прыжок</p>
              </div>
              <div className="bg-bg-card p-4 rounded-xl border border-border text-center">
                <kbd className="px-3 py-1 bg-purple-500/15 text-foreground rounded-lg font-mono">R</kbd>
                <p className="text-sm mt-2">Перезапуск</p>
              </div>
            </div>
          </div>

          {/* Описание */}
          <div className="prose prose-invert prose-lg max-w-none">
            <p>
              Марио-платформер — это классическая 2D-игра, в которой игрок управляет персонажем, 
              прыгающим по платформам, собирающим монетки и избегающим врагов.
            </p>
            <p>
              Цель игры — добраться до флага в конце уровня. По пути нужно:
            </p>
            <ul>
              <li>Собрать все монетки</li>
              <li>Убить врагов прыжком</li>
              <li>Не упасть в пропасть</li>
              <li>Не потратить все жизни</li>
            </ul>
            <p>
              Игра вдохновлена классикой Nintendo, но создана с любовью к геймплею. 
              Попробуйте пройти уровень за минимальное время и с максимальным счётом!
            </p>
          </div>

          {/* Теги */}
          <div className="tags flex flex-wrap gap-2 mt-6">
            {['платформер', 'GtaGo', '2D', 'Mario', 'игры'].map((tag) => (
              <span
                key={tag}
                className="tag bg-purple-500/15 text-foreground px-3 py-1 rounded-full text-xs font-semibold border border-purple-500/30 cursor-pointer hover:scale-110 transition"
                onClick={() => {
                  const userTags = JSON.parse(localStorage.getItem('userTags') || '{}');
                  userTags[tag] = (userTags[tag] || 0) + 1;
                  localStorage.setItem('userTags', JSON.stringify(userTags));
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </article>
      </main>
      <Sidebar />
    </div>
  );
}