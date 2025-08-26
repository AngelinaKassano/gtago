// src/components/particle-background.tsx
'use client';

import { useEffect } from 'react';

export default function ParticleBackground() {
  useEffect(() => {
    const container = document.createElement('div');
    container.className = 'game-bg';
    document.body.appendChild(container);

    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);

    for (let i = 0; i < 15; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.left = Math.random() * 100 + 'vw';
      p.style.top = Math.random() * 100 + 'vh';
      p.style.animationDelay = Math.random() * 3 + 's';
      container.appendChild(p);
    }

    return () => {
      container.remove();
      overlay.remove();
    };
  }, []);

  return null;
}