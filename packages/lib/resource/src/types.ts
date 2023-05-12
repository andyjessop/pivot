export type State<Data, Error = any> = {
  data: Data | null;
  error: Error | null;
  loading: boolean;
  updating: boolean;
};

export type Config<
  Data,
  ReadParams extends any[],
  CreateParams extends any[],
  DeleteParams extends any[],
  UpdateParams extends any[],
  CreateReturn = any,
  DeleteReturn = any,
  UpdateReturn = any,
> = {
  create?: {
    optimistic?: (...params: CreateParams) => (data: Data | null) => Data;
    query: (...params: CreateParams) => Promise<CreateReturn>;
    transform?: (res: CreateReturn) => (data: Data | null) => Data;
  };
  delete?: {
    optimistic?: (...params: DeleteParams) => (data: Data | null) => Data;
    query: (...params: DeleteParams) => Promise<DeleteReturn>;
    transform?: (res: DeleteReturn) => (data: Data | null) => Data;
  };
  read: {
    pollingInterval?: number;
    query: (...params: ReadParams) => Promise<Data>;
  };
  update?: {
    optimistic?: (...params: UpdateParams) => (data: Data | null) => Data;
    query: (...params: UpdateParams) => Promise<UpdateReturn>;
    transform?: (res: UpdateReturn) => (data: Data | null) => Data;
  };
};

export type Service<
  Data,
  ReadParams extends any[] = [],
  CreateParams extends any[] = [],
  DeleteParams extends any[] = [],
  UpdateParams extends any[] = [],
> = {
  create: (...params: CreateParams) => Promise<Data>;
  delete: (...params: DeleteParams) => Promise<Data>;
  getData: () => Data | null;
  getError: () => any;
  getLoading: () => boolean;
  getState: () => State<Data, any>;
  getUpdating: () => boolean;
  read: (...params: ReadParams) => Promise<Data | undefined>;
  update: (...params: UpdateParams) => Promise<Data>;
};

export type ExtractServiceFromConfig<T extends Config<any, any[], any[], any[], any[]>> = Service<
  T['read']['query'] extends (...params: any[]) => Promise<infer Data> ? Data : never,
  T['read']['query'] extends (...params: infer ReadParams) => Promise<any> ? ReadParams : never,
  T['create'] extends {
    query: (...params: infer CreateParams) => Promise<any>;
  }
    ? CreateParams
    : [],
  T['delete'] extends {
    query: (...params: infer DeleteParams) => Promise<any>;
  }
    ? DeleteParams
    : [],
  T['update'] extends {
    query: (...params: infer UpdateParams) => Promise<any>;
  }
    ? UpdateParams
    : []
>;

export interface Options {
  throttle?: number;
}
