import { headless } from '@pivot/lib/headless';

import { services } from '~app/services';
import { slices } from '~app/slices';
import { subscriptions } from '~app/subscriptions';

const app = headless(services, slices, subscriptions);

describe('integration', () => {
  describe('auth', () => {
    beforeEach(async () => {
      await app.init();
    });

    afterEach(async () => {
      const auth = await app.getService('auth');

      await auth.logout();
    });

    it('should not be logged in', async () => {
      await app.getService('auth');

      expect(await app.getSlice('auth')).toEqual({
        isChecking: false,
        isLoggingIn: false,
        isLoggingOut: false,
        user: null,
      });
    });

    it('should login', async () => {
      const auth = await app.getService('auth');

      const login = auth.login('user@user.com', 'password');

      expect(await app.getSlice('auth')).toEqual({
        isChecking: false,
        isLoggingIn: true,
        isLoggingOut: false,
        user: null,
      });

      await login;

      expect(await app.getSlice('auth')).toEqual({
        isChecking: false,
        isLoggingIn: false,
        isLoggingOut: false,
        user: {
          email: 'user@user.com',
        },
      });
    });

    it('should login, logout, then login again', async () => {
      const auth = await app.getService('auth');

      const login1 = auth.login('user@user.com', 'password');

      expect(await app.getSlice('auth')).toEqual({
        isChecking: false,
        isLoggingIn: true,
        isLoggingOut: false,
        user: null,
      });

      await login1;

      expect(await app.getSlice('auth')).toEqual({
        isChecking: false,
        isLoggingIn: false,
        isLoggingOut: false,
        user: {
          email: 'user@user.com',
        },
      });

      const logout1 = auth.logout();

      expect(await app.getSlice('auth')).toEqual({
        isChecking: false,
        isLoggingIn: false,
        isLoggingOut: true,
        user: {
          email: 'user@user.com',
        },
      });

      await logout1;

      expect(await app.getSlice('auth')).toEqual({
        isChecking: false,
        isLoggingIn: false,
        isLoggingOut: false,
        user: null,
      });

      const login2 = auth.login('user@user.com', 'password');

      expect(await app.getSlice('auth')).toEqual({
        isChecking: false,
        isLoggingIn: true,
        isLoggingOut: false,
        user: null,
      });

      await login2;

      expect(await app.getSlice('auth')).toEqual({
        isChecking: false,
        isLoggingIn: false,
        isLoggingOut: false,
        user: {
          email: 'user@user.com',
        },
      });

      const logout2 = auth.logout();

      expect(await app.getSlice('auth')).toEqual({
        isChecking: false,
        isLoggingIn: false,
        isLoggingOut: true,
        user: {
          email: 'user@user.com',
        },
      });

      await logout2;

      expect(await app.getSlice('auth')).toEqual({
        isChecking: false,
        isLoggingIn: false,
        isLoggingOut: false,
        user: null,
      });
    });
  });
});
