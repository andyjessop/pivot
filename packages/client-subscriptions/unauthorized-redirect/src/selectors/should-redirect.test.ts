import { shouldRedirect } from './should-redirect';

describe('unauthorizedRedirect selectors', () => {
  describe('shouldRedirect', () => {
    it('returns false if isUnauthorized is false', () => {
      expect(shouldRedirect(false)).toBe(false);
      expect(shouldRedirect(false, 'home')).toBe(false);
      expect(shouldRedirect(false, 'projects')).toBe(false);
    });

    it('returns false if routeName is "notFound"', () => {
      expect(shouldRedirect(true, 'notFound')).toBe(false);
    });

    it('returns true if isUnauthorized is true and routeName is not "notFound"', () => {
      expect(shouldRedirect(true)).toBe(true);
      expect(shouldRedirect(true, 'home')).toBe(true);
      expect(shouldRedirect(true, 'projects')).toBe(true);
    });
  });
});
