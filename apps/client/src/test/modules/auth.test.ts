import { headless } from '../utils/headless';

const app = headless();

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
      const auth = await app.getService('auth');

      await auth.getUser();

      const state = app.selectSlice('auth');

      expect(state).toEqual({
        isLoading: true,
        isLoggingIn: false,
        user: null,
      });
    });

    it('should login', async () => {
      const auth = await app.getService('auth');

      await auth.login('user', 'password');

      const state = app.selectSlice('auth');

      expect(state).toEqual({
        isLoading: true,
        isLoggingIn: false,
        user: {
          email: 'user',
        },
      });
    });

    it('should login, logout, then login again', async () => {
      const auth = await app.getService('auth');

      await auth.login('user', 'password');
      await auth.logout();

      const logoutState = app.selectSlice('auth');

      expect(logoutState).toEqual({
        isLoading: true,
        isLoggingIn: false,
        user: null,
      });

      await auth.login('user', 'password');

      const loginState = app.selectSlice('auth');

      expect(loginState).toEqual({
        isLoading: true,
        isLoggingIn: false,
        user: {
          email: 'user',
        },
      });

      await auth.logout();

      const logoutState2 = app.selectSlice('auth');

      expect(logoutState2).toEqual({
        isLoading: true,
        isLoggingIn: false,
        user: null,
      });
    });
  });
});
