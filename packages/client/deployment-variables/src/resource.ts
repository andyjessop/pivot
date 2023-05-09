import { ExtractServiceFromConfig } from '@pivot/lib/resource';
import { Draft } from '@pivot/util/model';

import { DeploymentVariablesHttp } from './http';
import { DeploymentVariable } from './types';

export type DeploymentVariablesResourceService = ExtractServiceFromConfig<
  ReturnType<typeof createResourceConfig>
>;

export function createResourceConfig(http: DeploymentVariablesHttp) {
  return {
    create: {
      query: (deploymentVariable: Draft<DeploymentVariable>) => http.post(deploymentVariable),
    },
    read: {
      query: (project_id: string) => http.get(project_id),
    },
  };
}
