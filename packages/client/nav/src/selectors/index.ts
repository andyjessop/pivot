import { createSelector } from 'reselect';

import { selectRoute } from '@pivot/client/router';

import { navItems } from './nav-items';

export const selectNavItems = createSelector(selectRoute, navItems);
