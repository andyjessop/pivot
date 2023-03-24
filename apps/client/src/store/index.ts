import { registerDynamicSlices } from '@pivot/dynamic-slice';
import { dynamicStore } from '@pivot/dynamic-store';
import { config } from './config';

export const store = dynamicStore();

registerDynamicSlices(store, config);
