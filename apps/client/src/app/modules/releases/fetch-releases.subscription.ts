import { selectReleasesProjectId } from '../releases/releases.selectors';

import { ReleasesResource, releasesResourceService } from './releases-resource.service';

export const fetchReleases = {
  dependencies: [releasesResourceService],
  handler: (resource: ReleasesResource) => (projectId: string) => {
    if (projectId) {
      resource.read(projectId);
    }
  },
  selector: selectReleasesProjectId,
};
