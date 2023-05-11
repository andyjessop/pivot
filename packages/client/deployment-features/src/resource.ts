import { ExtractServiceFromConfig } from '@pivot/lib/resource';
import { Draft } from '@pivot/util/model';

import { DeploymentFeaturesHttp } from './http';
import { DeploymentFeature } from './types';

export type DeploymentFeaturesResourceService = ExtractServiceFromConfig<
  ReturnType<typeof createResourceConfig>
>;

export function createResourceConfig(http: DeploymentFeaturesHttp) {
  return {
    create: {
      query: (deploymentFeature: Draft<DeploymentFeature>) => http.post(deploymentFeature),
    },
    read: {
      query: (project_id: string) => http.get(project_id),
    },
  };
}
