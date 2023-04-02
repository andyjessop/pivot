import { createStore } from '@pivot/lib/create-store';

import { config } from './config';

export const { selector, useSelector } = createStore(config);
