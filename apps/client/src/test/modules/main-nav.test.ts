import { selectNavItems } from '../../modules/nav/main-nav.selectors';
import { headless } from '../utils/headless';
import { visit } from '../utils/visit';

const app = headless();

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
