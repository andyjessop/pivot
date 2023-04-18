import { SliceConfigs } from '@pivot/lib/create-store';
import { dynamicSliceRegistry } from '@pivot/lib/dynamic-slice-registry';
import { dynamicStore } from '@pivot/lib/dynamic-store';
import { ExtractInstance, Injectable, injectable } from '@pivot/lib/injectable';
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
  const subsManager = subscriptionManager(store, subscriptions);

  const getStateService = injectable({
    importFn: () => Promise.resolve(store.getState),
  });

  return {
    getService,
    getSlice,
    getState,
    getStateService,
    init,
    select,
    store,
    waitFor,
    waitForState,
  };

  async function init() {
    for (const serviceConfig of Object.values(services)) {
      serviceConfig.reset();
    }

    sliceRegistry.resetState();
    subsManager.reset();
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

    return slice ?? waitForState(sliceName, (state) => state);
  }

  async function waitFor(selector: Selector) {
    const newState = selector(store.getState());

    if (newState) {
      return newState;
    }

    return new Promise((resolve) => {
      const unsubscribe = store.subscribe(() => {
        const newState = selector(store.getState());

        if (newState) {
          unsubscribe();
          resolve(newState);
        }
      });
    });
  }

  async function waitForState<K extends keyof Slices & string, U>(
    sliceName: K,
    compare: (
      state: ReturnType<ExtractInstance<Slices[K]['injectable']>['select']>,
    ) => U,
  ): Promise<ReturnType<ExtractInstance<Slices[K]['injectable']>['select']>> {
    const newState = getState(sliceName);

    if (newState && compare(newState)) {
      return newState;
    }

    return new Promise((resolve) => {
      const unsubscribe = store.subscribe(() => {
        const newState = getState(sliceName);

        if (newState === undefined) {
          return;
        }

        if (compare(newState)) {
          unsubscribe();
          resolve(newState);
        }
      });
    });
  }
}
