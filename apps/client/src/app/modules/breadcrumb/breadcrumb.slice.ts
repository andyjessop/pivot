import { State } from '@pivot/client/breadcrumb';
import { ExtractInstance, injectable } from '@pivot/lib/injectable';
import { slice } from '@pivot/lib/slice';

import { Routes } from '../router/router.types';

export const breadcrumbSlice = injectable({
  importFn: () =>
    import('@pivot/client/breadcrumb').then((m) =>
      slice('breadcrumb', m.initialState as State<Routes>, m.reducers),
    ),
});

export type BreadcrumbSlice = ExtractInstance<typeof breadcrumbSlice>;
