import { vi } from 'vitest';

import { injectable } from '.';

describe('injectable', () => {
  it('should create an injectable object', async () => {
    const importFn = () => Promise.resolve({});

    const injectableObject = injectable({ importFn });

    expect(injectableObject).toBeDefined();
    expect(injectableObject.get).toBeInstanceOf(Function);
  });

  it('should provide dependencies to factory function', async () => {
    const importFn = (dep1: boolean, dep2: boolean) =>
      Promise.resolve({ dep1, dep2 });
    const dep1 = injectable({ importFn: () => Promise.resolve(true) });
    const dep2 = injectable({ importFn: () => Promise.resolve(true) });

    // Resolve dependencies
    await dep1.get();
    await dep2.get();

    const injectableObject = injectable({
      importFn,
      dependencies: [dep1, dep2],
    });

    const instance = await injectableObject.get();

    expect(instance).toEqual({
      dep1: true,
      dep2: true,
    });
  });

  it('should resolve dependencies if not already resolved', async () => {
    const importFn = (dep1: boolean, dep2: boolean) =>
      Promise.resolve({ dep1, dep2 });
    const dep1 = injectable({ importFn: () => Promise.resolve(true) });
    const dep2 = injectable({ importFn: () => Promise.resolve(true) });

    const injectableObject = injectable({
      importFn,
      dependencies: [dep1, dep2],
    });

    const instance = await injectableObject.get();

    expect(instance).toEqual({
      dep1: true,
      dep2: true,
    });
  });

  it('should resolve dependencies if not already resolved (2)', async () => {
    const importFn = (dep1: boolean, dep2: undefined) =>
      Promise.resolve({ dep1, dep2 });

    const dep1 = injectable({ importFn: () => Promise.resolve(true) });
    const dep2 = injectable({ importFn: () => Promise.resolve(undefined) });

    const injectableObject = injectable({
      importFn,
      dependencies: [dep1, dep2],
    });

    const instance = await injectableObject.get();

    expect(instance).toEqual({
      dep1: true,
      dep2: undefined,
    });
  });

  it('should provide dependencies even if one resolves as undefined', async () => {
    const importFn = (dep1: boolean, dep2: undefined) =>
      Promise.resolve({ dep1, dep2 });

    const dep1 = injectable({ importFn: () => Promise.resolve(true) });
    const dep2 = injectable({ importFn: () => Promise.resolve(undefined) });

    // Resolve dependencies
    await dep1.get();
    await dep2.get();

    const injectableObject = injectable({
      importFn,
      dependencies: [dep1, dep2],
    });

    const instance = await injectableObject.get();

    expect(instance).toEqual({
      dep1: true,
      dep2: undefined,
    });
  });

  it('should return null if dependencies are not resolved', async () => {
    const importFn = () => Promise.resolve({});
    const dep1 = injectable({ importFn: () => Promise.resolve(true) });
    const dep2 = injectable({ importFn: () => Promise.resolve(true) });

    const dependencies = [dep1, dep2];

    const injectableObject = injectable({
      importFn,
      dependencies,
    });

    expect(injectableObject).toBeDefined();
    expect(injectableObject.dependencies).toEqual(dependencies);
    expect(injectableObject.get).toBeInstanceOf(Function);
  });

  it('should return the existing instance', async () => {
    const instance = {};
    const importFn = vi.fn(() => Promise.resolve(instance));

    const injectableObject = injectable({ importFn });
    const createdInstance = await injectableObject.get();
    const cachedInstance = await injectableObject.get();

    expect(createdInstance).toBe(instance);
    expect(cachedInstance).toBe(instance);
    expect(importFn).toHaveBeenCalledTimes(1);
  });

  it('should call asyncFactoryFn to create a new instance', async () => {
    const instance = {};
    const importFn = vi.fn(() => Promise.resolve(instance));

    const injectableObject = injectable({ importFn });
    const createdInstance = await injectableObject.get();

    expect(createdInstance).toBe(instance);
    expect(importFn).toHaveBeenCalled();
  });

  it('should return a promise if the instance is currently resolving', async () => {
    const importFn = () => Promise.resolve(true);

    const injectableObject = injectable({ importFn });

    // Start resolving
    injectableObject.get();
    const ret = injectableObject.get();

    expect(ret.then).not.toBe(undefined);
  });

  it('should provide chained dependencies to factory function', async () => {
    const importFn = (dep1: boolean, dep2: boolean) =>
      Promise.resolve({ dep1, dep2 });

    const dep2 = injectable({ importFn: () => Promise.resolve(true) });
    const dep1 = injectable({
      importFn: (d2) => Promise.resolve(Boolean(d2)),
      dependencies: [dep2],
    });

    const injectableObject = injectable({
      importFn,
      dependencies: [dep1, dep2],
    });

    const instance = await injectableObject.get();

    expect(instance).toEqual({
      dep1: true,
      dep2: true,
    });
  });
});
