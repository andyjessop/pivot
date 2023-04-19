import { findFeaturesByProjectId, findProjectByName } from '@pivot/fixtures';
import { headless } from '@pivot/lib/headless';

import { services } from '~app/services';
import { slices } from '~app/slices';
import { subscriptions } from '~app/subscriptions';

import { visit } from './utils/visit';

const app = headless(services, slices, subscriptions);

const project = findProjectByName('pivot');
const features = findFeaturesByProjectId(project.uuid);

describe('integration', () => {
  describe('features', () => {
    beforeEach(async () => {
      await app.init();

      await app.getService('router');
      const auth = await app.getService('auth');

      await auth.login('user@user.com', 'password');
    });

    it('should read project from remote when visiting page', async () => {
      await app.getService('featuresResource');

      visit(`/projects/${project.uuid}/features`);

      const loadedState = await app.waitForState(
        'featuresResource',
        (state) => state.loaded && !state.updating,
      );

      expect(loadedState).toEqual({
        data: features,
        error: null,
        loaded: true,
        loading: false,
        updating: false,
      });
    });
  });
});
