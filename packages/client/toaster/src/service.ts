import { generateRandomId } from '@pivot/util/string';
import { sleep } from '@pivot/util/time';

import { Model } from './slice';
import { DraftEntry } from './types';

export type ToasterService = ReturnType<typeof service>;

export function service(model: Model) {
  return {
    addEntry,
    removeEntry,
  };

  async function addEntry(entry: DraftEntry) {
    const id = generateRandomId();

    model.addEntry({ ...entry, id });

    // All time for user to read.
    await sleep(entry.duration ?? 5000);

    model.removeEntry(id);
  }

  function removeEntry(id: string) {
    model.removeEntry(id);
  }
}
