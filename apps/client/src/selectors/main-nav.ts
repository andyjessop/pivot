import { createSelector } from 'reselect';

import { navItems } from '../widgets/main-nav/selectors';

import { selectRoute } from './router';

export const selectNavItems = createSelector(selectRoute, navItems);
