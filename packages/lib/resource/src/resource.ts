import { asyncQueue } from '@pivot/lib/async-queue';
import { slice } from '@pivot/lib/slice';

import { Config, State } from './types';

export function resource<
  Data,
  ReadParams extends any[],
  CreateParams extends any[],
  DeleteParams extends any[],
  UpdateParams extends any[],
>(config: Config<Data, ReadParams, CreateParams, DeleteParams, UpdateParams>) {
  const queue = asyncQueue();

  const initialState: State<Data, Error> = {
    data: null,
    error: null,
    loading: false,
    updating: false,
  };

  const { api, reducer, middleware, select } = slice('resource', initialState, {
    set: (state: State<Data, Error>, data: Data) => ({ ...state, data }),
  });

  let readParams: ReadParams;

  return {
    service: {
      create,
      delete: del,
      read,
      update,
    },
    slice: { api, reducer, middleware, select },
  };

  async function read(...params: ReadParams) {
    if (!readParams) {
      readParams = params;
    }

    const res = await config.read.query(...params);

    api.set(res);
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

    queue.flush();

    return res;

    async function doMutation() {
      if (!readParams) {
        throw new Error('Cannot mutate before reading');
      }

      const { optimistic, query, transform } = conf;

      const oldData = select().data;

      if (optimistic) {
        api.set(optimistic(...params)(oldData));
      }

      const res = await query(...params);

      if (transform) {
        const data = transform(res)(oldData);

        api.set(data);

        return data;
      }

      read(...readParams);
    }
  }
}
