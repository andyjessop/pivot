import { asyncQueue } from '@pivot/lib/async-queue';

import { ResourceSlice } from './slice';
import { Config } from './types';

export function resourceService<
  Data,
  ReadParams extends any[],
  CreateParams extends any[],
  DeleteParams extends any[],
  UpdateParams extends any[],
>(
  config: Config<Data, ReadParams, CreateParams, DeleteParams, UpdateParams>,
  slice: ResourceSlice<Data>,
) {
  const { api, select } = slice;
  const queue = asyncQueue();
  let readParams: ReadParams;

  return {
    create,
    delete: del,
    read,
    update,
  };

  async function read(...params: ReadParams) {
    const { pollingInterval, query } = config.read;

    if (!readParams) {
      readParams = params;
    }

    const current = select();

    api.set({
      loading: !current.loaded,
      updating: current.loaded,
    });

    try {
      const res = await query(...params);

      console.log(res);
      api.set({
        data: res,
        loading: false,
        updating: false,
        error: null,
      });
    } catch (error) {
      api.set({
        loading: false,
        updating: false,
        error,
      });

      return;
    }

    if (pollingInterval !== undefined) {
      setTimeout(() => read(...params), pollingInterval);
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
  ) {
    const res = queue.add(doMutation);

    return res;

    async function doMutation() {
      if (!readParams) {
        throw new Error('Cannot mutate before reading');
      }

      if (!conf) {
        return;
      }

      const { optimistic, query, transform } = conf;

      const oldData = select();

      if (optimistic) {
        api.set({
          data: optimistic(...params)(oldData.data),
        });
      }

      try {
        const res = await query(...params);

        if (transform) {
          const data = transform(res)(oldData.data);

          api.set({ data });

          return data;
        }
      } catch (error) {
        api.set({
          loading: false,
          updating: false,
          error,
        });
      }

      read(...readParams);
    }
  }
}
