import { injectable } from '.';
import { vi } from 'vitest';

function logs() {
  console.log('logs');
}

describe('injectable', () => {
  it('should log', () => {
    logs();
  });

  it('should create an injectable object', async () => {
    const asyncFactoryFn = () => Promise.resolve({});

    const injectableObject = injectable(asyncFactoryFn);

    expect(injectableObject).toBeDefined();
    expect(injectableObject.get).toBeInstanceOf(Function);
  });

  it('should provide dependencies to factory function', async () => {
    const asyncFactoryFn = (dep1: boolean, dep2: boolean) =>
      Promise.resolve({ dep1, dep2 });
    const dep1 = injectable(() => Promise.resolve(true));
    const dep2 = injectable(() => Promise.resolve(true));

    // Resolve dependencies
    await dep1.get();
    await dep2.get();

    const injectableObject = injectable(asyncFactoryFn, [dep1, dep2]);

    const instance = await injectableObject.get();

    expect(instance).toEqual({
      dep1: true,
      dep2: true,
    });
  });

  it('should resolve dependencies if not already resolved', async () => {
    const asyncFactoryFn = (dep1: boolean, dep2: boolean) =>
      Promise.resolve({ dep1, dep2 });
    const dep1 = injectable(() => Promise.resolve(true));
    const dep2 = injectable(() => Promise.resolve(true));

    const injectableObject = injectable(asyncFactoryFn, [dep1, dep2]);

    const instance = await injectableObject.get();

    expect(instance).toEqual({
      dep1: true,
      dep2: true,
    });
  });

  it('should resolve dependencies if not already resolved (2)', async () => {
    const asyncFactoryFn = (dep1: boolean, dep2: undefined) =>
      Promise.resolve({ dep1, dep2 });
    const dep1 = injectable(() => Promise.resolve(true));
    const dep2 = injectable(() => Promise.resolve(undefined));

    const injectableObject = injectable(asyncFactoryFn, [dep1, dep2]);

    const instance = await injectableObject.get();

    expect(instance).toEqual({
      dep1: true,
      dep2: undefined,
    });
  });

  it('should provide dependencies even if one resolves as undefined', async () => {
    const asyncFactoryFn = (dep1: boolean, dep2: undefined) =>
      Promise.resolve({ dep1, dep2 });

    const dep1 = injectable(() => Promise.resolve(true));
    const dep2 = injectable(() => Promise.resolve(undefined));

    // Resolve dependencies
    await dep1.get();
    await dep2.get();

    const injectableObject = injectable(asyncFactoryFn, [dep1, dep2]);

    const instance = await injectableObject.get();

    expect(instance).toEqual({
      dep1: true,
      dep2: undefined,
    });
  });

  it('should return null if dependencies are not resolved', async () => {
    const asyncFactoryFn = () => Promise.resolve({});
    const dep1 = injectable(() => Promise.resolve(true));
    const dep2 = injectable(() => Promise.resolve(true));

    const dependencies = [dep1, dep2];

    const injectableObject = injectable(asyncFactoryFn, dependencies);

    expect(injectableObject).toBeDefined();
    expect(injectableObject.dependencies).toEqual(dependencies);
    expect(injectableObject.get).toBeInstanceOf(Function);
  });

  it('should return the existing instance', async () => {
    const instance = {};
    const asyncFactoryFn = vi.fn(() => Promise.resolve(instance));

    const injectableObject = injectable(asyncFactoryFn);
    const createdInstance = await injectableObject.get();
    const cachedInstance = await injectableObject.get();

    expect(createdInstance).toBe(instance);
    expect(cachedInstance).toBe(instance);
    expect(asyncFactoryFn).toHaveBeenCalledTimes(1);
  });

  it('should call asyncFactoryFn to create a new instance', async () => {
    const instance = {};
    const asyncFactoryFn = vi.fn(() => Promise.resolve(instance));

    const injectableObject = injectable(asyncFactoryFn);
    const createdInstance = await injectableObject.get();

    expect(createdInstance).toBe(instance);
    expect(asyncFactoryFn).toHaveBeenCalled();
  });

  it('should return a promise if the instance is currently resolving', async () => {
    const asyncFactoryFn = () => Promise.resolve(true);

    const injectableObject = injectable(asyncFactoryFn);

    // Start resolving
    injectableObject.get();
    const ret = injectableObject.get();

    expect(ret.then).not.toBe(undefined);
  });
});
