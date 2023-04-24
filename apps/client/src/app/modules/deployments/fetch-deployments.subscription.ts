import { selectDeploymentsProjectId } from '../deployments/deployments.selectors';
import {
  EnvironmentsResource,
  environmentsResourceService,
} from '../environments';
import { FeaturesResource, featuresResourceService } from '../features';
import { ReleasesResource, releasesResourceService } from '../releases';
import { VariablesResource, variablesResourceService } from '../variables';

import {
  DeploymentsResource,
  deploymentsResourceService,
} from './deployments-resource.service';

export const fetchDeployments = {
  selector: selectDeploymentsProjectId,
  handler:
    (
      deployments: DeploymentsResource,
      environments: EnvironmentsResource,
      features: FeaturesResource,
      releases: ReleasesResource,
      variables: VariablesResource,
    ) =>
    (projectId: string) => {
      if (projectId) {
        deployments.read(projectId);
        environments.read(projectId);
        features.read(projectId);
        releases.read(projectId);
        variables.read(projectId);
      }
    },
  dependencies: [
    deploymentsResourceService,
    environmentsResourceService,
    featuresResourceService,
    releasesResourceService,
    variablesResourceService,
  ],
};
