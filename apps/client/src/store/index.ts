import { dynamicSliceRegistry } from '@pivot/lib/dynamic-slice-registry';
import { dynamicStore } from '@pivot/lib/dynamic-store';
import { createUseSelector } from '@pivot/lib/use-selector';

import { config } from './config';

export function createStore() {
  const store = dynamicStore();

  const { get, selector } = dynamicSliceRegistry(store, config);

  return {
    config,
    get,
    selector,
    store,
    useSelector: createUseSelector(store),
  };
}

export const { selector, useSelector } = createStore();
