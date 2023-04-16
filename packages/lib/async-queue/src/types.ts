export type AnyFunction = (...args: any[]) => unknown | Promise<unknown>;

export interface AsyncQueue {
  add<T extends AnyFunction>(
    fn: T,
    ...params: unknown[]
  ): Promise<ReturnType<T>>;
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
