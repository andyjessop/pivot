import { selectDeploymentsProjectId } from '../deployments/deployments.selectors';

import {
  DeploymentsResource,
  deploymentsResourceService,
} from './deployments-resource.service';

export const fetchDeployments = {
  selector: selectDeploymentsProjectId,
  handler: (resource: DeploymentsResource) => (projectId: string) => {
    if (projectId) {
      resource.read(projectId);
    }
  },
  dependencies: [deploymentsResourceService],
};
