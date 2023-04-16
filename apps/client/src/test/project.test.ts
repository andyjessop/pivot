import { findProjectByName } from '@pivot/fixtures';
import { headless } from '@pivot/lib/headless';

import { services } from '~app/services';
import { slices } from '~app/slices';
import { subscriptions } from '~app/subscriptions';

import { visit } from './utils/visit';

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

      const projectState = await app.getSlice('project');

      expect(projectState.clonedDeploymentId).toEqual(null);
      expect(projectState.deployedReleaseId).toEqual(null);

      const projectResourceState = await app.getSlice('projectResource');

      expect(projectResourceState).toEqual({
        data: null,
        error: null,
        loading: false,
        loaded: false,
        updating: false,
      });
    });

    it('should read project from remote', async () => {
      const project = await findProjectByName('pivot');

      visit(`/projects/${project.uuid}`);

      const resource = await app.getService('projectResource');

      resource.read(project.uuid);

      const loadedState = await app.waitForState(
        'projectResource',
        (state) => state.loaded,
      );

      expect(loadedState).toEqual({
        data: project,
        error: null,
        loaded: true,
        loading: false,
        updating: false,
      });
    });
  });
});
