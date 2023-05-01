import { selectVariablesProjectId } from './variables.selectors';
import { VariablesResource, variablesResourceService } from './variables-resource.service';

export const fetchVariables = {
  selector: selectVariablesProjectId,
  handler: (resource: VariablesResource) => (projectId: string) => {
    if (projectId) {
      resource.read(projectId);
    }
  },
  dependencies: [variablesResourceService],
};
