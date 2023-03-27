export interface Action<Payload = any, Meta = any> {
  error?: boolean;
  meta?: Meta;
  payload?: Payload;
  type: string;
}

export type ActionCreator = (...args: any) => Action;

export type Dispatch<A extends Action = Action> = {
  <T extends A>(action: T): T;
};

export type GetState<S = any> = () => S;

export type Thunk = (dispatch: Dispatch, getState: GetState) => void;

export type DispatchActionOrThunk<T extends Action = Action> = (
  action: T | Thunk,
) => T;

export type Reducer<S = any, A extends Action = Action> = (
  state: S | undefined,
  action: A,
) => S;

export interface MiddlewareAPI<D extends Dispatch = Dispatch, S = any> {
  dispatch: D;
  getState(): S;
}

export type Middleware = (api: MiddlewareAPI) => (next: Dispatch) => void;

export interface Store<S = any, A extends Action = Action> {
  dispatch: Dispatch<A>;
  getState: GetState<S>;
  subscribe(listener: () => void): () => void;
}

export interface StoreWithThunkableDispatch<
  S = any,
  A extends Action = Action,
> {
  dispatch: DispatchActionOrThunk<A>;
  getState: GetState<S>;
}
