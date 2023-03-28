import { createSelector } from 'reselect';

import { navItems } from '@pivot/client/components';

import { selectRoute } from '../router/router.selectors';

export const selectNavItems = createSelector(selectRoute, navItems);
