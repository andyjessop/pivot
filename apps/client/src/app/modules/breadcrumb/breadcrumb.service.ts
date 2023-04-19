import { ExtractInstance, injectable } from '@pivot/lib/injectable';

import { BreadcrumbSlice, breadcrumbSlice } from './breadcrumb.slice';

export const breadcrumbService = injectable({
  importFn: (slice: BreadcrumbSlice) => Promise.resolve(slice.api),
  dependencies: [breadcrumbSlice],
});

export type BreadcrumbService = ExtractInstance<typeof breadcrumbService>;
