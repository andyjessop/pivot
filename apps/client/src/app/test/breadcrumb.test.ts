import { Part } from '@pivot/client/breadcrumb';
import { findProjectByName } from '@pivot/fixtures';
import { headless } from '@pivot/lib/headless';

import { selectBreadcrumbParts } from '~app/modules/breadcrumb';
import { services } from '~app/services';
import { slices } from '~app/slices';
import { subscriptions } from '~app/subscriptions';

import { visit } from './utils/visit';

const app = headless(services, slices, subscriptions);

const project = findProjectByName('pivot');

describe('integration', () => {
  describe('deployments', () => {
    beforeEach(async () => {
      await app.init();

      await app.getService('router');
      const auth = await app.getService('auth');

      await auth.login('user@user.com', 'password');
    });

    it.skip('should show breadcrumb for project page', async () => {
      visit(`/projects`);

      const parts = await app.waitFor(selectBreadcrumbParts, lastPartIsProjects);

      expect(parts).toEqual([
        {
          text: 'Projects',
          route: {
            name: 'projects',
          },
        },
      ]);
    });

    it.skip('should show breadcrumb for project page', async () => {
      visit(`/projects/${project.uuid}/deployments`);

      const parts = await app.waitFor(selectBreadcrumbParts, lastPartIsDeployments);

      expect(parts).toEqual([
        {
          text: 'Projects',
          route: {
            name: 'projects',
          },
        },
        {
          text: 'Pivot',
          route: {
            name: 'project',
            params: { id: project.uuid },
          },
        },
        {
          text: 'Deployments',
          route: {
            name: 'deployments',
            params: { id: project.uuid },
          },
        },
      ]);
    });

    it('should show breadcrumb for environments project page', async () => {
      visit(`/projects/${project.uuid}/environments`);

      const parts = await app.waitFor(selectBreadcrumbParts, lastPartIsEnvironments);

      expect(parts).toEqual([
        {
          text: 'Projects',
          route: {
            name: 'projects',
          },
        },
        {
          text: 'Pivot',
          route: {
            name: 'project',
            params: { id: project.uuid },
          },
        },
        {
          text: 'Environments',
          route: {
            name: 'environments',
            params: { id: project.uuid },
          },
        },
      ]);
    });

    it('should navigate to page and show correct parts', async () => {
      const router = await app.getService('router');

      router.navigate({ name: 'project', params: { id: project.uuid } });

      const parts = await app.waitFor(selectBreadcrumbParts, lastPartIsDeployments);

      expect(parts).toEqual([
        {
          text: 'Projects',
          route: {
            name: 'projects',
          },
        },
        {
          text: 'Pivot',
          route: {
            name: 'project',
            params: { id: project.uuid },
          },
        },
        {
          text: 'Deployments',
          route: {
            name: 'deployments',
            params: { id: project.uuid },
          },
        },
      ]);
    });
  });
});

function lastPartIsDeployments(parts: Part[]) {
  return parts[parts.length - 1]?.text === 'Deployments';
}

function lastPartIsEnvironments(parts: Part[]) {
  return parts[parts.length - 1]?.text === 'Environments';
}

function lastPartIsProjects(parts: Part[]) {
  return parts[parts.length - 1]?.text === 'Projects';
}
