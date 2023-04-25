import { findProjectByName } from '@pivot/fixtures';
import { headless } from '@pivot/lib/headless';

import { selectDeploymentsData } from '~app/modules/deployments';
import { selectEnvironmentsData } from '~app/modules/environments';
import { selectFeaturesData } from '~app/modules/features';
import { selectReleasesData } from '~app/modules/releases';
import { selectVariablesData } from '~app/modules/variables';
import { services } from '~app/services';
import { slices } from '~app/slices';
import { subscriptions } from '~app/subscriptions';

import { visit } from './utils/visit';

const app = headless(services, slices, subscriptions);

const project = findProjectByName('pivot');

describe('integration', () => {
  describe('project', () => {
    beforeEach(async () => {
      await app.init();

      await app.getService('router');
      const auth = await app.getService('auth');

      await auth.login('user@user.com', 'password');
    });

    it('should visit project page', async () => {
      await app.getService('projectResource');

      visit(`/projects/${project.uuid}`);

      const projectState = await app.getSlice('projectUi');

      expect(projectState.clonedDeploymentId).toEqual(null);
      expect(projectState.deployedReleaseId).toEqual(null);

      const loadedState = await app.waitForState(
        'projectResource',
        (state) => state.loaded && !state.updating,
      );

      expect(loadedState).toEqual({
        data: project,
        error: null,
        loading: false,
        loaded: true,
        updating: false,
      });
    });

    it('should read project from remote', async () => {
      const resource = await app.getService('projectResource');

      resource.read(project.uuid);

      const loadedState = await app.waitForState(
        'projectResource',
        (state) => state.loaded && !state.updating,
      );

      expect(loadedState).toEqual({
        data: project,
        error: null,
        loaded: true,
        loading: false,
        updating: false,
      });
    });

    it('should read project from remote when visiting page', async () => {
      await app.getService('projectResource');

      // The fetch-project subscription calls `resource.read` when on a project route
      visit(`/projects/${project.uuid}`);

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

    it('should read project entities', async () => {
      await app.getService('projectResource');

      // The fetch-project subscription calls `resource.read` when on a project route
      visit(`/projects/${project.uuid}`);

      const deployments = await app.waitFor(
        selectDeploymentsData,
        (data) => data?.length !== 0,
      );

      const environments = await app.waitFor(
        selectEnvironmentsData,
        (data) => data?.length !== 0,
      );

      const features = await app.waitFor(
        selectFeaturesData,
        (data) => data?.length !== 0,
      );

      const releases = await app.waitFor(
        selectReleasesData,
        (data) => data?.length !== 0,
      );

      const variables = await app.waitFor(
        selectVariablesData,
        (data) => data?.length !== 0,
      );

      expect(
        [deployments, environments, features, releases, variables].every(
          (entry) => entry !== undefined,
        ),
      ).toEqual(true);
    });
  });
});
