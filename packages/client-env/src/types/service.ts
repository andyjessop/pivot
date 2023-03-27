import { Variable } from './config';

export interface Service {
  get(key: Variable): string;
}
