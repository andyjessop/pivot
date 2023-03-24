export type Injectable<T = any, Deps extends Injectable<any>[] = []> = {
  asyncFactoryFn: AsyncFactoryFn<T, Deps>;
  depChain: Injectable[];
  dependencies: [...Injectable[]];
  get: (withDeps?: boolean) => Promise<T | null>;
  getInstance: () => T | undefined;
  instance?: T;
  isResolving(): boolean;
  hasResolved(): boolean;
};

export type AsyncFactoryFn<T, Deps extends any[] = any[]> = (
  ...args: {
    [K in keyof Deps]: Deps[K] extends Injectable<infer U> ? U : never;
  }
) => Promise<T>;

export type ExtractInstance<T> = T extends Injectable<infer U> ? U : never;
