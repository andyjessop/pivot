import { externallyResolvablePromise } from '@pivot/util-promise';
import { buildDepChain } from './build-dep-chain';
import { AsyncFactoryFn, Injectable } from './types';

export type { Injectable } from './types';

export function injectable<T, Deps extends Injectable<any>[]>(
  asyncFactoryFn: AsyncFactoryFn<T, Deps>,
  dependencies: [...Deps] = [] as unknown as Deps,
): Injectable<T> {
  const resolvablePromise = externallyResolvablePromise<T>();

  let instance: T | undefined;
  let resolving = false;
  let resolved = false;
  const promise = resolvablePromise.promise;
  const depChain = buildDepChain(dependencies);

  return {
    asyncFactoryFn,
    depChain,
    dependencies,
    get,
    getInstance,
    isResolving,
    hasResolved,
  };

  async function get(withDeps = true) {
    if (instance) {
      return instance as T;
    }

    if (isResolving()) {
      return promise;
    }

    resolving = true;

    if (withDeps) {
      // Resolve all dependencies in parallel. Here we're passing false
      // to get() because we've already flattened the dependency chain.
      await Promise.all(depChain.map((dep) => dep.get(false)));
    }

    instance = await asyncFactoryFn(
      ...(dependencies.map((dep) => dep.getInstance()) as any),
    );

    resolving = false;
    resolved = true;

    resolvablePromise.resolve(instance);

    return instance;
  }

  function getInstance() {
    return instance;
  }

  function isResolving() {
    return resolving;
  }

  function hasResolved() {
    return resolved;
  }
}