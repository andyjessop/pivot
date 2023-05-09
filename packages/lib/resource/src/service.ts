import { asyncQueue } from '@pivot/lib/async-queue';

import { ResourceSlice } from './slice';
import { Config, Service } from './types';

export function resourceService<
  Data,
  Error,
  ReadParams extends any[],
  CreateParams extends any[],
  DeleteParams extends any[],
  UpdateParams extends any[],
>(
  config: Config<Data, ReadParams, CreateParams, DeleteParams, UpdateParams>,
  slice: ResourceSlice<Data, Error>,
): Service<Data, ReadParams, CreateParams, DeleteParams, UpdateParams> {
  const { api, select } = slice;
  const queue = asyncQueue();
  let readParams: ReadParams;

  return {
    create,
    delete: del,
    getData: () => select().data,
    read: (...params: ReadParams) =>
      // Force the read if the polling interval is undefined because otherwise
      // the read will never happen.
      read(params, config.read.pollingInterval === undefined),
    update,
  };

  async function read(params: ReadParams, force = false): Promise<Data | undefined> {
    const { pollingInterval, query } = config.read;

    // If we have readParams and we're not forcing, then just let the polling interval
    // take care of the next read.
    if (readParams && !force) {
      return;
    }

    if (!readParams) {
      readParams = params;
    }

    const currentState = select();

    api.set({
      loading: !currentState?.loaded,
      updating: currentState?.loaded,
    });

    if (pollingInterval !== undefined) {
      setTimeout(() => read(params, true), pollingInterval);
    }

    try {
      const res = await query(...params);

      api.set({
        data: res,
        error: null,
        loaded: true,
        loading: false,
        updating: false,
      });

      return res;
    } catch (error: unknown) {
      api.set({
        error: error as Error,
        loading: false,
        updating: false,
      });
    }
  }

  async function update(...params: UpdateParams) {
    return mutate(config.update, ...params);
  }

  async function create(...params: CreateParams) {
    return mutate(config.create, ...params);
  }

  async function del(...params: DeleteParams) {
    return mutate(config.delete, ...params);
  }

  async function mutate(
    conf: typeof config.create | typeof config.delete | typeof config.update,
    ...params: DeleteParams | UpdateParams | CreateParams
  ): Promise<Data> {
    const res = queue.add(doMutation);

    return res;

    async function doMutation() {
      if (!readParams) {
        throw new Error('Cannot mutate before reading');
      }

      if (!conf) {
        throw new Error('No mutation config provided');
      }

      const { optimistic, query, transform } = conf;

      const currentState = select();

      if (optimistic) {
        api.set({
          data: optimistic(...params)(currentState.data),
        });
      }

      try {
        const res = await query(...params);

        if (transform) {
          const data = transform(res)(currentState.data);

          api.set({ data });

          return data;
        }
      } catch (error: unknown) {
        api.set({
          error: error as Error,
          loading: false,
          updating: false,
        });
      }

      return read(readParams, true) as Promise<Data>;
    }
  }
}
