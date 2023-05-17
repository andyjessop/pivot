import { Notification } from '@pivot/client/toaster';
import { headless } from '@pivot/lib/headless';

import { selectNotifications } from '~app/modules/toaster';
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
      } as Notification;

      toaster.addNotification(notification);

      const loadedState = await app.waitFor(
        selectNotifications,
        (notifications) => notifications?.length !== 0,
      );

      expect(loadedState).toEqual([notification]);
    });
  });
});
