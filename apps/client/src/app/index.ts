import { headless } from '@pivot/lib/headless';
import { createUseSelector } from '@pivot/lib/use-selector';
import { createUseService } from '@pivot/lib/use-service';

import { services } from './services';
import { slices } from './slices';
import { subscriptions } from './subscriptions';

export const app = headless(services, slices, subscriptions);

export const useService = createUseService(services);
export const useSelector = createUseSelector(app.store);
