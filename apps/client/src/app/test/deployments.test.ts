import { findDeploymentsByProjectId, findProjectByName } from '@pivot/fixtures';
import { headless } from '@pivot/lib/headless';

import { services } from '~app/services';
import { slices } from '~app/slices';
import { subscriptions } from '~app/subscriptions';

import { visit } from './utils/visit';

const app = headless(services, slices, subscriptions);

const project = findProjectByName('pivot');
const deployments = findDeploymentsByProjectId(project.uuid);

describe('integration', () => {
  describe('deployments', () => {
    beforeEach(async () => {
      await app.init();

      await app.getService('router');
      const auth = await app.getService('auth');

      await auth.login('user@user.com', 'password');
    });

    it('should read project from remote when visiting page', async () => {
      await app.getService('deploymentsResource');

      visit(`/projects/${project.uuid}/deployments`);

      const loadedState = await app.waitForState(
        'deploymentsResource',
        (state) => state.loaded && !state.updating,
      );

      expect(loadedState).toEqual({
        data: deployments,
        error: null,
        loaded: true,
        loading: false,
        updating: false,
      });
    });
  });
});
