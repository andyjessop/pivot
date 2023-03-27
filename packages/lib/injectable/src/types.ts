export type Injectable<T = any, Deps extends Injectable<any>[] = []> = {
  depChain: Injectable[];
  dependencies: [...Injectable[]];
  get: (withDeps?: boolean) => Promise<T>;
  getInstance: () => T | undefined;
  importFn: AsyncFactoryFn<T, Deps>;
  instance?: T;
  isResolving(): boolean;
  hasResolved(): boolean;
  onDestroy: (instance: T) => void;
};

export type AsyncFactoryFn<T, Deps extends any[] = any[]> = (
  ...args: {
    [K in keyof Deps]: Deps[K] extends Injectable<infer U> ? U : never;
  }
) => Promise<T>;

export type ExtractInstance<T> = T extends Injectable<infer U> ? U : never;
