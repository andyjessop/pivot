import { headless } from '@pivot/lib/headless';

import { config as services } from '~services/config';
import { config as slices } from '~store/config';

import { visit } from '../utils/visit';

const app = headless(services, slices);

describe('integration', () => {
  describe('router', () => {
    beforeEach(async () => {
      await app.init();

      const auth = await app.getService('auth');

      await auth.login('user@user.com', 'password');
    });

    it('should visit project page', async () => {
      visit('/projects/1');

      const state = app.selectSlice('router');

      expect(state.route?.name).toEqual('project');
    });

    it('should visit projects page', async () => {
      visit('/projects');

      const state = app.selectSlice('router');

      expect(state.route?.name).toEqual('projects');
    });

    it('should visit 404 page', async () => {
      visit('/projects/1/edit');

      const state = app.selectSlice('router');

      expect(state.route?.name).toEqual('notFound');
    });

    it('should navigate to project page', async () => {
      const router = await app.getService('router');

      router.navigate({ name: 'project', params: { id: '1' } });

      const state = app.selectSlice('router');

      expect(state.route?.name).toEqual('project');
      expect(state.route?.params?.id).toEqual('1');
    });

    it('should navigate to notFound if unauthorized', async () => {
      const auth = await app.getService('auth');
      const router = await app.getService('router');

      await auth.logout();

      router.navigate({ name: 'project', params: { id: '1' } });

      const state = app.selectSlice('router');

      expect(state.route?.name).toEqual('notFound');
    });
  });
});
