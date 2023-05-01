import { selectFeaturesProjectId } from '../features/features.selectors';

import { FeaturesResource, featuresResourceService } from './features-resource.service';

export const fetchFeatures = {
  dependencies: [featuresResourceService],
  handler: (resource: FeaturesResource) => (projectId: string) => {
    if (projectId) {
      resource.read(projectId);
    }
  },
  selector: selectFeaturesProjectId,
};
