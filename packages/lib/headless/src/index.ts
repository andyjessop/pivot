import { createStore, SliceConfigs } from '@pivot/lib/create-store';
import { ExtractInstance, Injectable } from '@pivot/lib/injectable';
import { createUseService } from '@pivot/lib/use-service';

export type Headless = ReturnType<typeof headless>;

export function headless<Services extends Record<string, Injectable<any>>>(
  services: Services,
  slices: SliceConfigs,
) {
  const store = createStore(slices);
  const useService = createUseService(services);

  return {
    getService,
    getSlice: store.get,
    init,
    select,
    selectSlice,
    useSelector: store.useSelector,
    useService,
  };

  async function init() {
    for (const serviceConfig of Object.values(services)) {
      serviceConfig.reset();
    }

    await getService('router'); // Initialize router
  }

  async function getService<T extends keyof typeof services>(key: T) {
    const response = await services[key].get();

    return response as ExtractInstance<(typeof services)[T]>;
  }

  function selectSlice<K extends keyof typeof store.config>(sliceName: K) {
    return store.selector(sliceName)({}) as ReturnType<
      ExtractInstance<(typeof store.config)[K]['injectable']>['select']
    >;
  }

  function select(fn: (state: any) => any) {
    return fn(store.store.getState());
  }
}
