// src/app/games/tic-tac-toe/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Sidebar from '@/app/components/sidebar';

export default function TicTacToeGame() {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState(1); // 1-5
  const [score, setScore] = useState({ wins: 0, losses: 0, draws: 0 });
  const [gameHistory, setGameHistory] = useState<{ moves: (string | null)[]; result: string }[]>([]);

  // Загружаем прогресс
  useEffect(() => {
    const saved = localStorage.getItem('ticTacToeProgress');
    if (saved) setScore(JSON.parse(saved));

    const history = localStorage.getItem('ticTacToeHistory');
    if (history) setGameHistory(JSON.parse(history));
  }, []);

  // Сохраняем прогресс
  useEffect(() => {
    localStorage.setItem('ticTacToeProgress', JSON.stringify(score));
    localStorage.setItem('ticTacToeHistory', JSON.stringify(gameHistory));
  }, [score, gameHistory]);

  // Проверка победителя
  const calculateWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // горизонтали
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // вертикали
      [0, 4, 8], [2, 4, 6]             // диагонали
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    return null;
  };

  // Ход игрока
  const handleClick = (i: number) => {
    if (winner || board[i]) return;

    const newBoard = [...board];
    newBoard[i] = 'X';
    setBoard(newBoard);
    setIsXNext(false);

    const newWinner = calculateWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      updateScore(newWinner);
      saveGame(newBoard, newWinner);
    } else if (!newBoard.includes(null)) {
      setWinner('Draw');
      updateScore('Draw');
      saveGame(newBoard, 'Draw');
    } else {
      // Ход ИИ
      setTimeout(() => makeAIMove(newBoard), 500);
    }
  };

  // Ход ИИ
  const makeAIMove = (currentBoard: (string | null)[]) => {
    let newBoard = [...currentBoard];
    let move: number | null = null;

    // Уровень 1: случайный ход
    if (difficulty === 1) {
      move = getRandomMove(newBoard);
    }
    // Уровень 2: блокирует победу игрока
    else if (difficulty === 2) {
      move = getBlockingMove(newBoard, 'X') || getRandomMove(newBoard);
    }
    // Уровень 3: пытается выиграть
    else if (difficulty === 3) {
      move = getWinningMove(newBoard, 'O') || getBlockingMove(newBoard, 'X') || getRandomMove(newBoard);
    }
    // Уровень 4: минимакс (простой)
    else if (difficulty === 4) {
      move = getMinimaxMove(newBoard, 'O');
    }
    // Уровень 5: минимакс с глубиной 3
    else if (difficulty === 5) {
      move = getMinimaxMove(newBoard, 'O', 3);
    }

    if (move !== null) {
      newBoard[move] = 'O';
      setBoard(newBoard);
      setIsXNext(true);

      const newWinner = calculateWinner(newBoard);
      if (newWinner) {
        setWinner(newWinner);
        updateScore(newWinner);
        saveGame(newBoard, newWinner);
      } else if (!newBoard.includes(null)) {
        setWinner('Draw');
        updateScore('Draw');
        saveGame(newBoard, 'Draw');
      }
    }
  };

  // Получить случайный ход
  const getRandomMove = (board: (string | null)[]): number | null => {
    const emptySquares = board.map((square, index) => square === null ? index : null).filter(val => val !== null) as number[];
    if (emptySquares.length === 0) return null;
    return emptySquares[Math.floor(Math.random() * emptySquares.length)];
  };

  // Блокировать победу игрока
  const getBlockingMove = (board: (string | null)[], player: string): number | null => {
    for (let i = 0; i < 9; i++) {
      if (board[i] !== null) continue;
      const newBoard = [...board];
      newBoard[i] = player;
      if (calculateWinner(newBoard) === player) {
        return i;
      }
    }
    return null;
  };

  // Попытаться выиграть
  const getWinningMove = (board: (string | null)[], player: string): number | null => {
    for (let i = 0; i < 9; i++) {
      if (board[i] !== null) continue;
      const newBoard = [...board];
      newBoard[i] = player;
      if (calculateWinner(newBoard) === player) {
        return i;
      }
    }
    return null;
  };

  // Минимакс алгоритм
  const getMinimaxMove = (board: (string | null)[], player: string, depth = 1): number | null => {
    const emptySquares = board.map((square, index) => square === null ? index : null).filter(val => val !== null) as number[];

    if (emptySquares.length === 0) return null;

    let bestMove = emptySquares[0];
    let bestScore = -Infinity;

    for (let i = 0; i < emptySquares.length; i++) {
      const move = emptySquares[i];
      const newBoard = [...board];
      newBoard[move] = player;
      
      const score = minimax(newBoard, false, player === 'X' ? 'O' : 'X', depth);
      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }

    return bestMove;
  };

  const minimax = (board: (string | null)[], isMaximizing: boolean, player: string, depth: number): number => {
    const winner = calculateWinner(board);
    if (winner === 'O') return 10;
    if (winner === 'X') return -10;
    if (!board.includes(null) || depth === 0) return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] !== null) continue;
        const newBoard = [...board];
        newBoard[i] = player;
        const score = minimax(newBoard, false, player === 'X' ? 'O' : 'X', depth - 1);
        bestScore = Math.max(score, bestScore);
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] !== null) continue;
        const newBoard = [...board];
        newBoard[i] = player;
        const score = minimax(newBoard, true, player === 'X' ? 'O' : 'X', depth - 1);
        bestScore = Math.min(score, bestScore);
      }
      return bestScore;
    }
  };

  // Обновить счёт
  const updateScore = (result: string) => {
    if (result === 'X') {
      setScore(prev => ({ ...prev, wins: prev.wins + 1 }));
    } else if (result === 'O') {
      setScore(prev => ({ ...prev, losses: prev.losses + 1 }));
    } else {
      setScore(prev => ({ ...prev, draws: prev.draws + 1 }));
    }
  };

  // Сохранить игру
  const saveGame = (moves: (string | null)[], result: string) => {
    const newHistory = [{ moves, result }, ...gameHistory].slice(0, 10);
    setGameHistory(newHistory);
  };

  // Новая игра
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  // Сбросить всё
  const resetAll = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setScore({ wins: 0, losses: 0, draws: 0 });
    setGameHistory([]);
    localStorage.removeItem('ticTacToeProgress');
    localStorage.removeItem('ticTacToeHistory');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <main className="lg:col-span-2 space-y-8">
        <Link href="/games" className="text-purple-500 hover:underline mb-4 inline-block">
          ← Назад к играм
        </Link>

        <article className="card bg-bg-card rounded-2xl p-8 border border-border shadow-lg">
          <h1 className="text-3xl font-bold mb-4">🎮 Крестики-нолики</h1>
          <p className="text-muted-foreground mb-6">
            15 октября 2024 • Разработчик: GtaGo Studio
          </p>
          

          {/* Уровень сложности */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">🎚️ Уровень сложности</h3>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5].map(level => (
                <button
                  key={level}
                  onClick={() => {
                    setDifficulty(level);
                    resetGame();
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${
                    difficulty === level
                      ? 'bg-purple-500 text-white border-purple-500'
                      : 'bg-bg-card text-foreground border-border hover:bg-purple-500/15 hover:border-purple-500/30'
                  }`}
                >
                  Уровень {level}
                </button>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {difficulty === 1 && 'Случайные ходы — легко победить'}
              {difficulty === 2 && 'Блокирует ваши победы — средний уровень'}
              {difficulty === 3 && 'Пытается выиграть — сложно, но возможно'}
              {difficulty === 4 && 'Минимакс алгоритм — почти невозможно победить'}
              {difficulty === 5 && 'Минимакс с глубиной 3 — невозможно победить'}
            </p>
          </div>

          {/* Игровое поле */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">🕹️ Игра</h3>
            <div className="grid grid-cols-3 gap-2 w-64 mx-auto mb-6">
              {board.map((square, i) => (
                <button
                  key={i}
                  onClick={() => handleClick(i)}
                  className="w-20 h-20 bg-bg-card border border-border rounded-xl flex items-center justify-center text-4xl font-bold cursor-pointer hover:bg-purple-500/15 transition"
                  disabled={!!winner}
                >
                  {square}
                </button>
              ))}
            </div>

            {/* Статус игры */}
            <div className="text-center mb-6">
              {winner ? (
                <div className="text-2xl font-bold">
                  {winner === 'X' && '🎉 Вы победили!'}
                  {winner === 'O' && '💀 ИИ победил!'}
                  {winner === 'Draw' && '🤝 Ничья!'}
                </div>
              ) : (
                <div className="text-xl">
                  Ход: <strong>{isXNext ? 'Вы (X)' : 'ИИ (O)'}</strong>
                </div>
              )}
            </div>

            {/* Кнопки управления */}
            <div className="flex justify-center gap-4">
              <button
                onClick={resetGame}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full hover:from-purple-700 hover:to-blue-700 transition transform hover:scale-105 shadow-lg"
              >
                Новая игра
              </button>
              <button
                onClick={resetAll}
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full hover:from-red-600 hover:to-orange-600 transition transform hover:scale-105 shadow-lg"
              >
                Сбросить всё
              </button>
            </div>
          </div>

          {/* Статистика */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">📊 Статистика</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-green-500/15 p-4 rounded-xl border border-green-500/30">
                <div className="text-2xl font-bold text-green-400">{score.wins}</div>
                <div className="text-sm text-muted-foreground mt-2">Побед</div>
              </div>
              <div className="bg-red-500/15 p-4 rounded-xl border border-red-500/30">
                <div className="text-2xl font-bold text-red-400">{score.losses}</div>
                <div className="text-sm text-muted-foreground mt-2">Поражений</div>
              </div>
              <div className="bg-yellow-500/15 p-4 rounded-xl border border-yellow-500/30">
                <div className="text-2xl font-bold text-yellow-400">{score.draws}</div>
                <div className="text-sm text-muted-foreground mt-2">Ничьих</div>
              </div>
            </div>
          </div>

          {/* История игр */}
          <div>
            <h3 className="text-xl font-bold mb-4">🕒 История игр</h3>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {gameHistory.length > 0 ? (
                gameHistory.map((game, i) => (
                  <div key={i} className="bg-bg-card p-4 rounded-xl border border-border text-sm">
                    <div className="flex justify-between items-center">
                      <span>
                        Игра #{gameHistory.length - i}
                      </span>
                      <span className={`font-bold ${
                        game.result === 'X' ? 'text-green-400' :
                        game.result === 'O' ? 'text-red-400' : 'text-yellow-400'
                      }`}>
                        {game.result === 'X' && 'Победа'}
                        {game.result === 'O' && 'Поражение'}
                        {game.result === 'Draw' && 'Ничья'}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-1 mt-2 w-32">
                      {game.moves.map((move, j) => (
                        <div key={j} className="w-8 h-8 border border-border flex items-center justify-center text-xs">
                          {move}
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-sm">Пока нет сыгранных партий</p>
              )}
            </div>
          </div>

          {/* Теги */}
          <div className="tags flex flex-wrap gap-2 mt-8">
            {['логика', 'GtaGo', '2D', 'мини-игра'].map((tag) => (
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