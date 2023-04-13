export interface Cache {
  clear(): void;
  get(key: string): unknown | null;
  remove(key: string): void;
  set(key: string, value: unknown): void;
}
