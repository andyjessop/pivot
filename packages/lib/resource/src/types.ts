export type State<Data, Error> = {
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
  read: {
    pollingInterval?: number;
    query: (...params: ReadParams) => Promise<Data>;
  };
  create: {
    optimistic?: (...params: CreateParams) => (data: Data | null) => Data;
    query: (...params: CreateParams) => Promise<CreateReturn>;
    transform?: (res: CreateReturn) => (data: Data | null) => Data;
  };
  delete: {
    optimistic?: (...params: DeleteParams) => (data: Data | null) => Data;
    query: (...params: DeleteParams) => Promise<DeleteReturn>;
    transform?: (res: DeleteReturn) => (data: Data | null) => Data;
  };
  update: {
    optimistic?: (...params: UpdateParams) => (data: Data | null) => Data;
    query: (...params: UpdateParams) => Promise<UpdateReturn>;
    transform?: (res: UpdateReturn) => (data: Data | null) => Data;
  };
};
