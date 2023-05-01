import { findEnvironmentsByProjectId, findProjectByName } from '@pivot/fixtures';
import { headless } from '@pivot/lib/headless';

import { services } from '~app/services';
import { slices } from '~app/slices';
import { subscriptions } from '~app/subscriptions';

import { visit } from './utils/visit';

const app = headless(services, slices, subscriptions);

const project = findProjectByName('pivot');
const environments = findEnvironmentsByProjectId(project.uuid);

describe('integration', () => {
  describe('project', () => {
    beforeEach(async () => {
      await app.init();

      await app.getService('router');
      const auth = await app.getService('auth');

      await auth.login('user@user.com', 'password');
    });

    it('should read environments from remote when visiting page', async () => {
      await app.getService('environmentsResource');

      visit(`/projects/${project.uuid}/environments`);

      const loadedState = await app.waitForState(
        'environmentsResource',
        (state) => state.loaded && !state.updating,
      );

      expect(loadedState).toEqual({
        data: environments,
        error: null,
        loaded: true,
        loading: false,
        updating: false,
      });
    });
  });
});
