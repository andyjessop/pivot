import { selectNavItems } from '../../modules/nav/main-nav.selectors';
import { Headless, headless } from '../utils/headless';
import { visit } from '../utils/visit';

let app: Headless;

describe('integration', () => {
  describe('main-nav', () => {
    beforeEach(async () => {
      app = headless();

      await app.init();
    });

    it('projects should not be active', async () => {
      const items = await app.selector(selectNavItems);

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

      const items = await app.selector(selectNavItems);

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
