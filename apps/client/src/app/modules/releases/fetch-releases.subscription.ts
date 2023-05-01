import { selectReleasesProjectId } from '../releases/releases.selectors';

import { ReleasesResource, releasesResourceService } from './releases-resource.service';

export const fetchReleases = {
  selector: selectReleasesProjectId,
  handler: (resource: ReleasesResource) => (projectId: string) => {
    if (projectId) {
      resource.read(projectId);
    }
  },
  dependencies: [releasesResourceService],
};
