// src/hooks/usePersistedState.ts
import { useState, useEffect } from 'react';
import { storage } from '@/lib/storage';

/**
 * Хук для сохранения состояния в localStorage и его восстановления
 */
export function usePersistedState<T>(
  key: string,
  defaultValue: T,
  type: 'local' | 'session' = 'local'
): [T, (value: T) => void] {
  const [state, setState] = useState<T>(() => {
    const stored = storage.get<T>(key, type);
    return stored !== null ? stored : defaultValue;
  });

  useEffect(() => {
    storage.set(key, state, type);
  }, [key, state, type]);

  return [state, setState];
}