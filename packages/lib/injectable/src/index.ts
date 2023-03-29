import { externallyResolvablePromise } from '@pivot/util/promise';

import { buildDepChain } from './build-dep-chain';
import { byDependencyOrder } from './by-dependency-order';
import { AsyncFactoryFn, Injectable } from './types';

export type { AsyncFactoryFn, ExtractInstance, Injectable } from './types';

export function injectable<T, Deps extends Injectable<any>[]>({
  dependencies = [] as unknown as Deps,
  importFn,
  onDestroy = () => {
    /* ... */
  },
}: {
  importFn: AsyncFactoryFn<T, Deps>;
  dependencies?: [...Deps];
  onDestroy?: (instance: T) => void;
}): Injectable<T> {
  const resolvablePromise = externallyResolvablePromise<T>();

  let instance: T | undefined;
  let state = 'idle' as 'idle' | 'resolving' | 'resolved';
  const promise = resolvablePromise.promise;
  const deps = [...dependencies].sort(byDependencyOrder);
  const depChain = buildDepChain(deps);

  return {
    importFn,
    depChain,
    dependencies: deps,
    get,
    getInstance,
    isResolving,
    hasResolved,
    onDestroy,
  };

  async function get(): Promise<T> {
    if (instance) {
      return instance as T;
    }

    if (isResolving()) {
      return promise;
    }

    state = 'resolving';

    const depPromises = (await Promise.all(deps.map((dep) => dep.get()))) as {
      [K in keyof Deps]: Deps[K] extends Injectable<infer U, []> ? U : never;
    };

    instance = await importFn(...depPromises);

    state = 'resolved';

    resolvablePromise.resolve(instance);

    return instance;
  }

  function getInstance() {
    return instance;
  }

  function isResolving() {
    return state === 'resolving';
  }

  function hasResolved() {
    return state === 'resolved';
  }
}
