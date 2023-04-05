import { SliceConfigs } from '@pivot/lib/create-store';
import { dynamicSliceRegistry } from '@pivot/lib/dynamic-slice-registry';
import { dynamicStore } from '@pivot/lib/dynamic-store';
import { dynamicSubscriptionRegistry } from '@pivot/lib/dynamic-subscription-registry';
import { ExtractInstance, Injectable } from '@pivot/lib/injectable';

type Selector<R = any> = (state: any) => R;

export type Headless = ReturnType<typeof headless>;

export function headless<
  Services extends Record<string, Injectable<any>>,
  Slices extends SliceConfigs,
  Subscriptions extends Record<
    keyof Subscriptions,
    {
      active: (state: any) => boolean;
      selector: Selector;
      injectable: Injectable<(val: any) => void>;
    }
  >,
>(services: Services, slices: Slices, subscriptions: Subscriptions) {
  const store = dynamicStore();

  const sliceRegistry = dynamicSliceRegistry(store, slices);
  dynamicSubscriptionRegistry(store, subscriptions);

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

  function getState<K extends keyof Slices>(sliceName: K) {
    return sliceRegistry.selector(sliceName)({}) as ReturnType<
      ExtractInstance<Slices[K]['injectable']>['select']
    >;
  }

  function select(fn: Selector) {
    return fn(store.getState());
  }
}
