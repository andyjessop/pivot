import { headless } from '@pivot/lib/headless';

import { services } from '~app/services';
import { slices } from '~app/slices';
import { subscriptions } from '~app/subscriptions';

import { visit } from '../utils/visit';

const app = headless(services, slices, subscriptions);

describe('integration', () => {
  describe('router', () => {
    beforeEach(async () => {
      await app.init();

      await app.getService('router');
      const auth = await app.getService('auth');

      await auth.login('user@user.com', 'password');
    });

    it('should visit project page', async () => {
      visit('/projects/1');

      const state = app.getState('router');

      expect(state.route?.name).toEqual('project');
    });

    it('should visit projects page', async () => {
      visit('/projects');

      const state = app.getState('router');

      expect(state.route?.name).toEqual('projects');
    });

    it('should visit 404 page', async () => {
      visit('/projects/1/edit');

      const state = app.getState('router');

      expect(state.route?.name).toEqual('notFound');
    });

    it('should navigate to project page', async () => {
      const router = await app.getService('router');

      router.navigate({ name: 'project', params: { id: '1' } });

      const state = app.getState('router');

      expect(state.route?.name).toEqual('project');
      expect(state.route?.params?.id).toEqual('1');
    });

    // it('should navigate to notFound if unauthorized', async () => {
    //   const auth = await app.getService('auth');
    //   const router = await app.getService('router');

    //   await auth.logout();

    //   router.navigate({ name: 'project', params: { id: '1' } });

    //   const state = app.getState('router');

    //   expect(state.route?.name).toEqual('notFound');
    // });

    it('should navigate to notFound on authorized route then logged out', async () => {
      visit('/projects');

      const auth = await app.getService('auth');

      await auth.logout();

      const state = app.getState('router');

      expect(state.route?.name).toEqual('notFound');
    });
  });
});
