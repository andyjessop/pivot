import { dynamicSliceRegistry } from '@pivot/dynamic-slice-registry';
import { dynamicStore } from '@pivot/dynamic-store';
import { createUseSelector } from '@pivot/use-selector';

import { config } from './config';

export const store = dynamicStore();

const { get, select } = dynamicSliceRegistry(store, config);

export { get, select };

export const useSelector = createUseSelector(store);
