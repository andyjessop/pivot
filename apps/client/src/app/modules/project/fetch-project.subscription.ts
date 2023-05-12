import { DeploymentsResourceService } from '@pivot/client/deployments';
import { EnvironmentsResource } from '@pivot/client/environments';

import { deploymentsResourceService } from '../deployments';
import { environmentsResourceService } from '../environments';
import { FeaturesResource, featuresResourceService } from '../features';
import { ReleasesResource, releasesResourceService } from '../releases';
import { VariablesResource, variablesResourceService } from '../variables';

import { selectProjectId } from './project.selectors';
import { ProjectResource, projectResourceService } from './project-resource.service';

export const fetchProject = {
  dependencies: [
    projectResourceService,
    deploymentsResourceService,
    environmentsResourceService,
    featuresResourceService,
    releasesResourceService,
    variablesResourceService,
  ],
  handler:
    (
      project: ProjectResource,
      deployments: DeploymentsResourceService,
      environments: EnvironmentsResource,
      features: FeaturesResource,
      releases: ReleasesResource,
      variables: VariablesResource,
    ) =>
    (projectId: string) => {
      if (projectId) {
        project.read(projectId);
        deployments.read(projectId);
        environments.read(projectId);
        features.read(projectId);
        releases.read(projectId);
        variables.read(projectId);
      }
    },
  selector: selectProjectId,
};
