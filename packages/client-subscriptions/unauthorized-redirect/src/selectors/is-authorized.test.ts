import { isUnauthorized } from './is-authorized';

describe('unauthorizedRedirect selectors', () => {
  describe('isUnauthorized', () => {
    it('returns false if routeName is not provided, isAwaitingAuthentication is true, or isLoggingOut is true', () => {
      expect(isUnauthorized(true, true, false)).toBe(false);
      expect(isUnauthorized(true, false, true)).toBe(false);
      expect(isUnauthorized(true, false, false)).toBe(false);
      expect(isUnauthorized(true, true, true)).toBe(false);
      expect(isUnauthorized(false, true, false)).toBe(false);
      expect(isUnauthorized(false, false, true)).toBe(false);
      expect(isUnauthorized(false, true, true)).toBe(false);
    });

    it('returns false if the routeName is in authenticatedRoutes and isAuthenitcated is true', () => {
      expect(isUnauthorized(true, false, false, 'projects')).toBe(false);
      expect(isUnauthorized(true, false, false, 'project')).toBe(false);
    });

    it('returns true if the routeName is in authenticatedRoutes and isAuthenitcated is false', () => {
      expect(isUnauthorized(false, false, false, 'projects')).toBe(true);
      expect(isUnauthorized(false, false, false, 'project')).toBe(true);
    });

    it('returns true if the routeName is not in authenticatedRoutes and isAuthenitcated is true', () => {
      expect(isUnauthorized(true, false, false, 'home')).toBe(true);
      expect(isUnauthorized(true, false, false, 'about')).toBe(true);
    });

    it('returns false if the routeName is not in authenticatedRoutes and isAuthenitcated is false', () => {
      expect(isUnauthorized(false, false, false, 'home')).toBe(false);
      expect(isUnauthorized(false, false, false, 'about')).toBe(false);
    });
  });
});
