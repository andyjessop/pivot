import { ExtractInstance } from '@pivot/lib/injectable';

import { config as services } from '~services/config';
import {
  config as slices,
  get as getSlice,
  selector as selectSlice,
  store,
} from '~store';

export type Headless = ReturnType<typeof headless>;

export function headless() {
  return {
    getService,
    getSlice,
    init,
    selector,
    selectSlice: headlessSelectSlice,
  };

  async function init() {
    await getService('router'); // Initialize router
  }

  async function getService<T extends keyof typeof services>(key: T) {
    const response = await services[key].get();

    return response as ExtractInstance<(typeof services)[T]>;
  }

  function headlessSelectSlice<K extends keyof typeof slices>(sliceName: K) {
    return selectSlice(sliceName)({}) as ReturnType<
      ExtractInstance<(typeof slices)[K]['injectable']>['select']
    >;
  }

  function selector(fn: (state: (typeof store)['getState']) => any) {
    return fn(store.getState());
  }
}
