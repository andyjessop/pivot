import { dynamicSliceRegistry } from '@pivot/lib/dynamic-slice-registry';
import { dynamicStore } from '@pivot/lib/dynamic-store';
import { createUseSelector } from '@pivot/lib/use-selector';

import { config } from './config';

export const store = dynamicStore();

const { get, select } = dynamicSliceRegistry(store, config);

export { get, select };

export const useSelector = createUseSelector(store);

debugger; // eslint-disable-line
