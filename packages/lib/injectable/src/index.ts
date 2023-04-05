import { externallyResolvablePromise } from '@pivot/util/promise';

import { buildDepChain } from './build-dep-chain';
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
  let resolvablePromise = externallyResolvablePromise<T>();
  let instance: T | undefined;
  let state = 'idle' as 'idle' | 'resolving' | 'resolved';
  let promise = resolvablePromise.promise;
  const deps = [...dependencies];
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
    reset,
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

  function reset() {
    state = 'idle';
    instance = undefined;
    resolvablePromise = externallyResolvablePromise<T>();
    promise = resolvablePromise.promise;
  }
}
