import { servicesContext } from '@pivot/services-context';

import { config } from './config';

const { Services, useService } = servicesContext(config);

export { Services, useService };
