import { ExtractInstance } from '@pivot/lib/injectable';

import { config as services } from '~services/config';
import { createStore } from '~store';

export type Headless = ReturnType<typeof headless>;

export function headless() {
  let store = createStore();

  return {
    getService,
    getSlice: store.get,
    init,
    select,
    selectSlice,
  };

  async function init() {
    for (const serviceConfig of Object.values(services)) {
      serviceConfig.reset();
    }

    store = createStore();

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

  function select(fn: (state: (typeof store.store)['getState']) => any) {
    return fn(store.store.getState());
  }
}
