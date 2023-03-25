import { dynamicSliceRegistry } from '@pivot/dynamic-slice-registry';
import { dynamicStore } from '@pivot/dynamic-store';
import { config } from './config';

export const store = dynamicStore();

dynamicSliceRegistry(store, config);
