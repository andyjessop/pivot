import { asyncQueue } from '@pivot/lib/async-queue';

import { Config } from './types';

export function resource<
  Data,
  ReadParams extends any[],
  CreateParams extends any[],
  DeleteParams extends any[],
  UpdateParams extends any[],
>(
  config: Config<Data, ReadParams, CreateParams, DeleteParams, UpdateParams>,
  {
    getData,
    setData,
  }: {
    getData: () => Data;
    setData: (data: Data) => void;
  },
) {
  const queue = asyncQueue();
  let readParams: ReadParams;

  return {
    create,
    delete: del,
    read,
    update,
  };

  async function read(...params: ReadParams) {
    if (!readParams) {
      readParams = params;
    }

    const res = await config.read.query(...params);

    setData(res);
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

      const { optimistic, query, transform } = conf;

      const oldData = getData();

      if (optimistic) {
        setData(optimistic(...params)(oldData));
      }

      const res = await query(...params);

      if (transform) {
        const data = transform(res)(oldData);

        setData(data);

        return data;
      }

      read(...readParams);
    }
  }
}
