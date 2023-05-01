import { ExtractInstance, injectable } from '@pivot/lib/injectable';

import { BreadcrumbSlice, breadcrumbSlice } from './breadcrumb.slice';

export const breadcrumbService = injectable({
  dependencies: [breadcrumbSlice],
  importFn: (slice: BreadcrumbSlice) => Promise.resolve(slice.api),
});

export type BreadcrumbService = ExtractInstance<typeof breadcrumbService>;
