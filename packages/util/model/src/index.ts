import { omit } from '@pivot/util/object';

export type Draft<T extends { created_at: string; uuid: string }> = Omit<T, 'created_at' | 'uuid'>;

export function makeDraft<T extends { created_at: string; uuid: string }>(obj: T): Draft<T> {
  return omit(obj, ['created_at', 'uuid']);
}
