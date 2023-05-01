import { selectEnvironmentsProjectId } from '../environments/environments.selectors';

import { EnvironmentsResource, environmentsResourceService } from './environments-resource.service';

export const fetchEnvironments = {
  selector: selectEnvironmentsProjectId,
  handler: (resource: EnvironmentsResource) => (projectId: string) => {
    if (projectId) {
      resource.read(projectId);
    }
  },
  dependencies: [environmentsResourceService],
};
