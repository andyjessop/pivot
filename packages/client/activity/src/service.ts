import { sleep } from '@pivot/util/time';

import { Model } from './slice';
import { DraftEntry } from './types';

export type Activity = ReturnType<typeof service>;

export function service(model: Model) {
  return {
    addEntry,
    close,
    open,
  };

  async function addEntry(entry: DraftEntry) {
    model.addEntryStart(entry);

    // Allow time for animation.
    await sleep(500);

    model.addEntryFinish();

    // All time for user to read.
    await sleep(5000);

    model.markInactiveStart();

    // Allow time for animation.
    await sleep(500);

    model.markInactiveFinish();
  }

  async function close() {
    model.close();
  }

  async function open() {
    model.open();
  }
}
