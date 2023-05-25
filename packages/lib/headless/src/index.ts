import { SliceConfigs } from '@pivot/lib/create-store';
import { dynamicSliceRegistry } from '@pivot/lib/dynamic-slice-registry';
import { dynamicStore } from '@pivot/lib/dynamic-store';
import { ExtractInstance, Injectable } from '@pivot/lib/injectable';
import { Action, Dispatch, MiddlewareAPI } from '@pivot/lib/redux-types';
import { subscriptionManager, Subscriptions } from '@pivot/lib/subscription-manager';

type Selector<R = any> = (state: any) => R;

export type Headless = ReturnType<typeof headless>;

export function headless<
  Services extends Record<string, Injectable<any>>,
  Slices extends SliceConfigs,
  Subs extends Subscriptions,
>(services: Services, slices: Slices, subscriptions: Subs) {
  const store = dynamicStore();

  const { resetRegistrations, selector, updateRegistrations } = dynamicSliceRegistry(store, slices);

  const { resetSubscriptions, runSubscriptions } = subscriptionManager(store, subscriptions);

  store.addMiddleware(middleware);

  return {
    getService,
    getSlice,
    getState,
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

    await resetRegistrations();
    resetSubscriptions();

    return true;
  }

  async function getService<T extends keyof Services>(key: T) {
    const response = await services[key].get();

    return response as ExtractInstance<Services[T]>;
  }

  function getState<K extends keyof Slices>(sliceName: K) {
    return selector(sliceName)({}) as ReturnType<
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

  async function waitFor<T>(
    selector: Selector<T>,
    predicate: (s: T) => boolean = (s) => s !== undefined,
  ): Promise<T> {
    const newState = selector(store.getState());

    if (predicate(newState)) {
      return newState;
    }

    return new Promise((resolve) => {
      const unsubscribe = store.subscribe(() => {
        const newState = selector(store.getState());

        if (predicate(newState)) {
          unsubscribe();
          resolve(newState);
        }
      });
    });
  }

  function middleware(store: MiddlewareAPI) {
    return (next: Dispatch) => async (action: Action) => {
      next(action);

      await updateRegistrations(store.getState());
      await runSubscriptions();
    };
  }

  async function waitForState<K extends keyof Slices & string, U>(
    sliceName: K,
    compare: (state: ReturnType<ExtractInstance<Slices[K]['injectable']>['select']>) => U,
  ): Promise<ReturnType<ExtractInstance<Slices[K]['injectable']>['select']>> {
    const newState = getState(sliceName);

    if (newState && compare(newState)) {
      return newState;
    }

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(store.getState());
      }, 3000);

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
