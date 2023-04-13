import { createSelector } from 'reselect';

import { navItems } from '@pivot/client/nav';

import { selectRoute } from '../router';

export const selectNavItems = createSelector(selectRoute, navItems);
