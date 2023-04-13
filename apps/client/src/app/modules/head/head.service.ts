import { service } from '@pivot/client/head';
import { injectable } from '@pivot/lib/injectable';

export const headService = injectable({
  importFn: () => Promise.resolve(service()),
  dependencies: [],
});
