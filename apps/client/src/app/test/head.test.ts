import { headless } from '@pivot/lib/headless';

import { services } from '~app/services';
import { slices } from '~app/slices';
import { subscriptions } from '~app/subscriptions';

import { visit } from './utils/visit';

const app = headless(services, slices, subscriptions);

describe('integration', () => {
  describe('head', () => {
    beforeEach(async () => {
      await app.init();

      await app.getService('router');
      await app.getService('head');

      const auth = await app.getService('auth');

      await auth.login('user@user.com', 'password');
    });

    it('should change title for notFound page', async () => {
      visit('/404');

      expect(document.title).toEqual('Pivot: Page Not Found');
    });

    // TODO: how to test this without sleep?
    // it('should change title for projects page', async () => {
    //   visit('/projects');

    //   await sleep(0);

    //   expect(document.title).toEqual('Projects');
    // });
  });
});
