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
    });

    it('projects should not be active', async () => {
      const items = await app.select(selectNavItems);

      expect(items).toEqual([
        {
          route: 'projects',
          text: 'Projects',
          active: false,
        },
      ]);
    });

    it('projects should be active', async () => {
      visit('/projects');

      const items = await app.select(selectNavItems);

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
