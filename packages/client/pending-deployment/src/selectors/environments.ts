import { Project } from '@pivot/client/shared-interfaces';

export function selectEnvironments(project?: Project.Model) {
  return project?.environments || [];
}
