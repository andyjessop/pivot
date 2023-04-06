import { selectNavItems } from '@pivot/client/nav';
import { headless } from '@pivot/lib/headless';

import { services } from '~app/services';
import { slices } from '~app/slices';
import { subscriptions } from '~app/subscriptions';

import { visit } from '../utils/visit';

const app = headless(services, slices, subscriptions);

describe('integration', () => {
  describe('main-nav', () => {
    beforeEach(async () => {
      await app.init();

      await app.getService('router');
    });

    it('projects should not be active', async () => {
      const items = app.select(selectNavItems);

      expect(items).toEqual([
        {
          route: 'projects',
          text: 'Projects',
          active: false,
        },
      ]);
    });

    it('projects should be active', async () => {
      const auth = await app.getService('auth');

      await auth.login('user@user.com', 'password');

      visit('/projects');

      const items = app.select(selectNavItems);

      expect(items).toEqual([
        {
          route: 'projects',
          text: 'Projects',
          active: true,
        },
      ]);
    });
  });
});
