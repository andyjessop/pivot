import { SliceCollection } from '@pivot/dynamic-slice';

export const config: SliceCollection = {
  router: {
    active: () => true,
    asyncFactoryFn: () => import('@pivot/client-router'),
  },
};
