import { headless } from '@pivot/lib/headless';
import { createUseSelector } from '@pivot/lib/use-selector';
import { createUseService } from '@pivot/lib/use-service';

import { services } from './services';
import { slices } from './slices';

export const app = headless(services, slices);

export const useService = createUseService(services);
export const useSelector = createUseSelector(app.store);
