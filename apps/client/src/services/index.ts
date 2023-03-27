import { servicesContext } from '@pivot/lib/context-services';

import { config } from './config';

const { Services, useService } = servicesContext(config);

export { Services, useService };
