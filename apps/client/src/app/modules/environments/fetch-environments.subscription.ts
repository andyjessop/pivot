import { selectEnvironmentsProjectId } from '../environments/environments.selectors';

import { EnvironmentsResource, environmentsResourceService } from './environments-resource.service';

export const fetchEnvironments = {
  dependencies: [environmentsResourceService],
  handler: (resource: EnvironmentsResource) => (projectId: string) => {
    if (projectId) {
      resource.read(projectId);
    }
  },
  selector: selectEnvironmentsProjectId,
};
