import type { Cache } from './types';

export type { Cache };

export function service(storage: Storage = localStorage): Cache {
  return {
    clear,
    get,
    remove,
    set,
  };

  function clear() {
    return storage.clear();
  }

  function get(key: string): unknown | null {
    try {
      return JSON.parse(storage.getItem(key) as unknown as string) as unknown;
    } catch (e: unknown) {
      throw new Error('Could not JSON.parse cached value');
    }
  }

  function remove(key: string): void {
    return storage.removeItem(key);
  }

  function set(key: string, value: unknown): void {
    try {
      return storage.setItem(key, JSON.stringify(value));
    } catch (e: unknown) {
      throw new Error('Could not JSON.stringify value');
    }
  }
}
