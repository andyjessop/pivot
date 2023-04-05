import { SliceConfigs } from '@pivot/lib/create-store';
import { dynamicSliceRegistry } from '@pivot/lib/dynamic-slice-registry';
import { dynamicStore } from '@pivot/lib/dynamic-store';
import { ExtractInstance, Injectable } from '@pivot/lib/injectable';

export type Headless = ReturnType<typeof headless>;

export function headless<
  Services extends Record<string, Injectable<any>>,
  Slices extends SliceConfigs,
>(services: Services, slices: Slices) {
  const store = dynamicStore();

  const sliceRegistry = dynamicSliceRegistry(store, slices);

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

    await getService('router'); // Initialize router
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

  function select(fn: (state: any) => any) {
    return fn(store.getState());
  }
}
