// src/app/components/yandex-rtb.tsx
'use client';

import { useEffect } from 'react';

type YandexRTBProps = {
  blockId: string;
  renderTo: string;
};

export default function YandexRTB({ blockId, renderTo }: YandexRTBProps) {
  useEffect(() => {
    // @ts-ignore
    window.yaContextCb = window.yaContextCb || [];

    const script = document.createElement('script');
    script.src = 'https://yandex.ru/ads/system/context.js';
    script.async = true;
    document.head.appendChild(script);

    // @ts-ignore
    window.yaContextCb.push(() => {
      // @ts-ignore
      Ya.Context.AdvManager.render({
        blockId,
        renderTo,
      });
    });

    return () => {
      document.head.removeChild(script);
    };
  }, [blockId, renderTo]);

  return <div id={renderTo}></div>;
}