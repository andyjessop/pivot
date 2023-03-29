import { dynamicSliceRegistry } from '@pivot/lib/dynamic-slice-registry';
import { dynamicStore } from '@pivot/lib/dynamic-store';
import { createUseSelector } from '@pivot/lib/use-selector';

import { config } from './config';

export const store = dynamicStore();

const { get, selector } = dynamicSliceRegistry(store, config);

export { config, get, selector };

export const useSelector = createUseSelector(store);
