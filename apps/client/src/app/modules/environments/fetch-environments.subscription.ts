import { EnvironmentsResource } from '@pivot/client/environments';

import { selectEnvironmentsProjectId } from '../environments/environments.selectors';

import { environmentsResourceService } from './environments-resource.service';

export const fetchEnvironments = {
  dependencies: [environmentsResourceService],
  handler: (resource: EnvironmentsResource) => (projectId: string) => {
    if (projectId) {
      resource.read(projectId);
    }
  },
  selector: selectEnvironmentsProjectId,
};
