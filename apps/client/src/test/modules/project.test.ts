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

    it('should read proejct from remote', async () => {
      visit('/projects/1');

      const resource = await app.getService('projectResource');

      resource.read('f4c727f9-6331-439e-b34d-8e056a2aa282');

      const loadedState = await app.waitForState(
        'projectResource',
        (state) => state.loaded,
      );

      expect(loadedState).toEqual({
        data: {
          created_at: '2022-08-31T09:34:39+00:00',
          name: 'pivot',
          team_id: '76ce0d5e-6766-4592-b6ff-14ecebbff3e5',
          uuid: 'f4c727f9-6331-439e-b34d-8e056a2aa282',
        },
        error: null,
        loaded: true,
        loading: false,
        updating: false,
      });
    });
  });
});
