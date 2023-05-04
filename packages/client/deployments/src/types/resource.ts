import { Service as ResourceService } from '@pivot/lib/resource';

import { Deployment } from './model';

export type DeploymentsResource = ResourceService<
  Deployment[],
  Error,
  [string],
  [Omit<Deployment, 'created_at' | 'uuid'>]
>;
