import { selectProjectId } from './project.selectors';
import {
  ProjectResource,
  projectResourceService,
} from './project-resource.service';

export const fetchProject = {
  selector: selectProjectId,
  handler: (resource: ProjectResource) => (projectId: string) => {
    if (projectId) {
      resource.read(projectId);
    }
  },
  dependencies: [projectResourceService],
};
