import { ExtractInstance } from '@pivot/lib/injectable';

import { config as services } from '~services/config';
import { get as getSlice, select as selectSlice, store } from '~store';

export type Headless = ReturnType<typeof headless>;

export function headless() {
  return {
    getService,
    getSlice,
    init,
    selector,
    selectSlice,
  };

  async function init() {
    await getService('router'); // Initialize router
  }

  async function getService<T extends keyof typeof services>(key: T) {
    const response = await services[key].get();

    return response as ExtractInstance<(typeof services)[T]>;
  }

  function selector(fn: (state: typeof store) => any) {
    return fn(store.getState());
  }
}
