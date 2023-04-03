import { headless } from '@pivot/lib/headless';

import { services } from './services';
import { slices } from './slices';

export const { useSelector, useService } = headless(services, slices);
