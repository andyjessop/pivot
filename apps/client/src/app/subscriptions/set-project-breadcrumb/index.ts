import { createSelector } from 'reselect';

import { BreadcrumbService, breadcrumbService } from '~app/modules/breadcrumb';
import { selectIsProjectRoute, selectProjectName } from '~app/modules/project/project.selectors';
import { selectRoute } from '~app/modules/router';

const selectBreadcrumbPart = createSelector(
  selectRoute,
  selectIsProjectRoute,
  selectProjectName,
  (route, isProjectRoute, projectName) => {
    if (!route || !isProjectRoute || !projectName) {
      return;
    }

    return {
      key: ':id',
      text: projectName,
    };
  },
);
/**
 * Set the breadcrumbs.
 */
export const setProjectBreadcrumb = {
  dependencies: [breadcrumbService],
  handler: (service: BreadcrumbService) => (part?: { key: string; text: string }) => {
    if (!part) {
      return;
    }

    const { key, text } = part;

    service.setPart(key, text);
  },
  selector: selectBreadcrumbPart,
};
