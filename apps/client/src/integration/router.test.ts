import { Headless, headless } from './utils/headless';
import { visit } from './utils/visit';

let app: Headless;

describe('integration', () => {
  describe('auth', () => {
    beforeEach(async () => {
      app = headless();

      await app.init();
    });

    it('should visit project page', async () => {
      visit('/projects/1');

      const state = await app.selectSlice('router');

      expect(state.route.name).toEqual('project');
    });

    it('should visit projects page', async () => {
      visit('/projects');

      const state = await app.selectSlice('router');

      expect(state.route.name).toEqual('projects');
    });

    it('should visit 404 page', async () => {
      visit('/projects/1/edit');

      const state = await app.selectSlice('router');

      expect(state.route.name).toEqual('notFound');
    });

    it('should navigate to project page', async () => {
      const router = await app.getService('router');

      router.navigate({ name: 'project', params: { id: '1' } });

      const state = await app.selectSlice('router');

      expect(state.route.name).toEqual('project');
      expect(state.route.params.id).toEqual('1');
    });
  });
});
