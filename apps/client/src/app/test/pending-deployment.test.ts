import { findDeploymentsByProjectId, findProjectByName } from '@pivot/fixtures';
import { headless } from '@pivot/lib/headless';
import { pick } from '@pivot/util/object';

import { selectDeploymentsData } from '~app/modules/deployments';
import { selectPendingDeploymentData } from '~app/modules/pending-deployment';
import { services } from '~app/services';
import { slices } from '~app/slices';
import { subscriptions } from '~app/subscriptions';

import { visit } from './utils/visit';

const app = headless(services, slices, subscriptions);

const project = findProjectByName('pivot');
const deployment = findDeploymentsByProjectId(project.uuid)[0];

describe('integration', () => {
  describe('pending-deployment', () => {
    beforeEach(async () => {
      await app.init();

      await app.getService('router');
      const auth = await app.getService('auth');

      await auth.login('user@user.com', 'password');
    });

    it('should read project from remote when visiting page', async () => {
      const pendingDeployment = await app.getService('pendingDeployment');

      // The fetch-project subscription calls `resource.read` when on a project route
      visit(`/projects/${project.uuid}`);

      const deployments = await app.waitFor(
        selectDeploymentsData,
        (state) => state?.length !== undefined && state?.length !== 0,
      );

      const dep = deployments?.find((d) => d.uuid === deployment.uuid);

      if (!dep) {
        throw new Error('Deployment not found');
      }

      const newPendingDeployment = {
        deployment_id: dep.uuid,
        ...pick(dep, ['environment_id', 'features', 'release_id', 'variables']),
      };

      pendingDeployment.create(newPendingDeployment);

      const loadedState = await app.waitFor(
        selectPendingDeploymentData,
        (state) => Boolean(state?.deployment_id),
      );

      expect(loadedState).toEqual(newPendingDeployment);
    });
  });
});
