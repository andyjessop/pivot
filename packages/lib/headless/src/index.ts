import { SliceConfigs } from '@pivot/lib/create-store';
import { dynamicSliceRegistry } from '@pivot/lib/dynamic-slice-registry';
import { dynamicStore } from '@pivot/lib/dynamic-store';
import { ExtractInstance, Injectable } from '@pivot/lib/injectable';
import {
  subscriptionManager,
  Subscriptions,
} from '@pivot/lib/subscription-manager';
import { retry } from '@pivot/util/function';

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
    getState,
    init,
    select,
    store,
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

  async function getState<K extends keyof Slices>(sliceName: K) {
    return retry(
      () => getStateSync(sliceName),
      (result) => result !== undefined,
      10,
      300,
    );
  }

  function getStateSync<K extends keyof Slices>(sliceName: K) {
    debugger; // eslint-disable-line

    return sliceRegistry.selector(sliceName)({}) as ReturnType<
      ExtractInstance<Slices[K]['injectable']>['select']
    >;
  }

  function select(fn: Selector) {
    return fn(store.getState());
  }
}
