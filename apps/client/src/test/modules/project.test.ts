import { headless } from '@pivot/lib/headless';

import { services } from '~app/services';
import { slices } from '~app/slices';
import { subscriptions } from '~app/subscriptions';

import { visit } from '../utils/visit';

const app = headless(services, slices, subscriptions);

describe('integration', () => {
  describe('project', () => {
    beforeEach(async () => {
      await app.init();

      await app.getService('router');
      const auth = await app.getService('auth');

      await auth.login('user@user.com', 'password');
    });

    it('should visit project page', async () => {
      visit('/projects/1');

      const projectState = await app.getState('project');

      expect(projectState.clonedDeploymentId).toEqual(null);
      expect(projectState.deployedReleaseId).toEqual(null);

      const projectResourceState = await app.getState('projectResource');

      expect(projectResourceState).toEqual({
        data: null,
        error: null,
        loading: false,
        loaded: false,
        updating: false,
      });
    });
  });
});
