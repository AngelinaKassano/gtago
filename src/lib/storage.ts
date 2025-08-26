// src/lib/storage.ts
/**
 * Универсальная обёртка для работы с localStorage/sessionStorage
 * с поддержкой сериализации и фолбэка при ошибке
 */

type StorageType = 'local' | 'session';

const getStorage = (type: StorageType) => {
  if (typeof window === 'undefined') return null;
  return type === 'local' ? window.localStorage : window.sessionStorage;
};

export const storage = {
  get<T>(key: string, type: StorageType = 'local'): T | null {
    try {
      const storage = getStorage(type);
      if (!storage) return null;
      const item = storage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.warn(`Ошибка чтения из ${type}Storage:`, e);
      return null;
    }
  },

  set<T>(key: string, value: T, type: StorageType = 'local'): void {
    try {
      const storage = getStorage(type);
      if (storage) {
        storage.setItem(key, JSON.stringify(value));
      }
    } catch (e) {
      console.warn(`Ошибка записи в ${type}Storage:`, e);
    }
  },

  remove(key: string, type: StorageType = 'local'): void {
    try {
      const storage = getStorage(type);
      if (storage) {
        storage.removeItem(key);
      }
    } catch (e) {
      console.warn(`Ошибка удаления из ${type}Storage:`, e);
    }
  },
};