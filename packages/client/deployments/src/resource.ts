import { ExtractServiceFromConfig, State } from '@pivot/lib/resource';
import { Draft } from '@pivot/util/model';

import { DeploymentsHttp } from './http';
import { Deployment } from './types';

export type DeploymentsResourceService = ExtractServiceFromConfig<
  ReturnType<typeof createResourceConfig>
>;

export type DeploymentsResourceState = State<Deployment[]>;

export function createResourceConfig(http: DeploymentsHttp) {
  return {
    create: {
      query: (deployment: Draft<Deployment>) => http.post(deployment),
    },
    read: {
      query: (uuid: string) => http.get(uuid),
    },
  };
}
