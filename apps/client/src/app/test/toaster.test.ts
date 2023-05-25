import { AlertType } from '@pivot/client/toaster';
import { headless } from '@pivot/lib/headless';

import { selectAlerts } from '~app/modules/activity';
import { services } from '~app/services';
import { slices } from '~app/slices';
import { subscriptions } from '~app/subscriptions';

const app = headless(services, slices, subscriptions);

describe('integration', () => {
  describe('toaster', () => {
    beforeEach(async () => {
      await app.init();

      await app.getService('router');
      const auth = await app.getService('auth');

      await auth.login('user@user.com', 'password');
    });

    it('should add notification', async () => {
      const toaster = await app.getService('toaster');

      const notification = {
        content: 'content',
        title: 'title',
        type: 'info',
      } as AlertType;

      toaster.toast(notification);

      const loadedState = await app.waitFor(selectAlerts, (alerts) => alerts?.length !== 0);

      expect(loadedState).toEqual([notification]);
    });
  });
});
