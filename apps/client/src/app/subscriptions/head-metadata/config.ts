import { createSelector } from 'reselect';

import { selectProjectName } from '~app/modules/project/project.selectors';

export const config = {
  notFound: {
    title: () => 'Pivot: Page Not Found',
  },
  project: {
    title: createSelector(
      selectProjectName,
      (projectName) => projectName && `Project: ${projectName}`,
    ),
  },
  projects: {
    title: () => 'Projects',
  },
} as Record<string, { title: (state: unknown) => string }>;
