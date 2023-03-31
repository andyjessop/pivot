export type AnyFunction = (...args: any[]) => unknown | Promise<unknown>;

export interface AsyncQueue {
  add(fn: AnyFunction, ...params: unknown[]): Promise<unknown>;
  clear(): void;
  entries: AsyncQueueEntry[];
  flush(): Promise<unknown>;
}

export interface AsyncQueueEntry {
  fn: AnyFunction;
  params: unknown[];
  reject: AnyFunction;
  resolve: AnyFunction;
}
