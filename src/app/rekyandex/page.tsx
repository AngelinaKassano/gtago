// src/app/rekyandex/page.tsx
'use client';

import YandexRTB from '@/app/components/yandex-rtb';

export default function YandexAdsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Реклама Яндекса</h1>
      <YandexRTB blockId="R-A-6922066-2" renderTo="yandex_rtb_R-A-6922066-2" />
    </div>
  );
}