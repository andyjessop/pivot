import { routerSlice } from '../modules/router.module';

export const config = {
  router: {
    active: () => true,
    injectable: routerSlice,
  },
};
