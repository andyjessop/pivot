import { Model } from './model';

export interface Http {
  getOne(id: string): Promise<Model>;
}
