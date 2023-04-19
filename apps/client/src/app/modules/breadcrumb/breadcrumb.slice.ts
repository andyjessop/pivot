import { ExtractInstance, injectable } from '@pivot/lib/injectable';
import { slice } from '@pivot/lib/slice';

export const breadcrumbSlice = injectable({
  importFn: () =>
    import('@pivot/client/breadcrumb').then((m) =>
      slice('breadcrumb', m.initialState, m.reducers),
    ),
});

export type BreadcrumbSlice = ExtractInstance<typeof breadcrumbSlice>;
