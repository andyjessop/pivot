import {
  DeploymentsResource,
  deploymentsResourceService,
} from '../deployments';
import {
  EnvironmentsResource,
  environmentsResourceService,
} from '../environments';
import { FeaturesResource, featuresResourceService } from '../features';
import { ReleasesResource, releasesResourceService } from '../releases';
import { VariablesResource, variablesResourceService } from '../variables';

import { selectProjectId } from './project.selectors';
import {
  ProjectResource,
  projectResourceService,
} from './project-resource.service';

export const fetchProject = {
  selector: selectProjectId,
  handler:
    (
      project: ProjectResource,
      deployments: DeploymentsResource,
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
  dependencies: [
    projectResourceService,
    deploymentsResourceService,
    environmentsResourceService,
    featuresResourceService,
    releasesResourceService,
    variablesResourceService,
  ],
};
