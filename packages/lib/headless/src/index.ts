import { SliceConfigs } from '@pivot/lib/create-store';
import { dynamicSliceRegistry } from '@pivot/lib/dynamic-slice-registry';
import { dynamicStore } from '@pivot/lib/dynamic-store';
import { ExtractInstance, Injectable } from '@pivot/lib/injectable';
import {
  subscriptionManager,
  Subscriptions,
} from '@pivot/lib/subscription-manager';

type Selector<R = any> = (state: any) => R;

export type Headless = ReturnType<typeof headless>;

export function headless<
  Services extends Record<string, Injectable<any>>,
  Slices extends SliceConfigs,
  Subs extends Subscriptions,
>(services: Services, slices: Slices, subscriptions: Subs) {
  const store = dynamicStore();

  const sliceRegistry = dynamicSliceRegistry(store, slices);
  store.addMiddleware(sliceRegistry.middleware);
  subscriptionManager(store, subscriptions);

  return {
    getService,
    getSlice,
    getState,
    init,
    select,
    store,
    waitForState,
  };

  async function init() {
    for (const serviceConfig of Object.values(services)) {
      serviceConfig.reset();
    }
  }

  async function getService<T extends keyof Services>(key: T) {
    const response = await services[key].get();

    return response as ExtractInstance<Services[T]>;
  }

  function getState<K extends keyof Slices>(sliceName: K) {
    return sliceRegistry.selector(sliceName)({}) as ReturnType<
      ExtractInstance<Slices[K]['injectable']>['select']
    >;
  }

  function select(fn: Selector) {
    return fn(store.getState());
  }

  async function getSlice<K extends keyof Slices & string>(
    sliceName: K,
  ): Promise<ReturnType<ExtractInstance<Slices[K]['injectable']>['select']>> {
    const slice = getState(sliceName);

    return (
      slice ??
      waitForState(sliceName, (state) => state, {
        timeout: 2000,
        message: `getSlice('${sliceName}') timed out.`,
      })
    );
  }

  async function waitForState<K extends keyof Slices & string, U>(
    sliceName: K,
    compare: (
      state: ReturnType<ExtractInstance<Slices[K]['injectable']>['select']>,
    ) => U,
    { timeout, message }: { timeout: number; message?: string } = {
      timeout: 5000,
    },
  ): Promise<ReturnType<ExtractInstance<Slices[K]['injectable']>['select']>> {
    return new Promise((resolve, reject) => {
      const unsubscribe = store.subscribe(() => {
        setTimeout(() => {
          reject(
            message ??
              `waitForState('${sliceName}', ${compare.toString()}) timed out.`,
          );
        }, timeout);

        const newState = getState(sliceName);

        if (compare(newState)) {
          unsubscribe();
          resolve(newState);
        }
      });
    });
  }
}
