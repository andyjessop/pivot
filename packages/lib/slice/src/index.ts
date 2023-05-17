import { Action, Dispatch, MiddlewareAPI } from '@pivot/lib/redux-types';

type ANumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

type DropFirst<T extends unknown[]> = T extends [any, ...infer U]
  ? U['length'] extends ANumber
    ? U
    : [U]
  : never;

export type ExtractState<T> = T extends Slice<any, any, infer U> ? U : never;

export type ExtractActions<T, S = any> = T extends Record<
  keyof T,
  (state: S, ...params: any[]) => S
>
  ? {
      [P in keyof T]: (...params: DropFirst<Parameters<T[P]>>) => boolean;
    }
  : any;

export type ExtractApi<T, S = any> = T extends Record<
  keyof T,
  (state: infer R, ...params: any[]) => S
>
  ? {
      [P in keyof T]: (...params: DropFirst<Parameters<T[P]>>) => boolean;
    } & {
      getState: () => R;
    }
  : any;

export type Slice<
  T extends Record<keyof T, (state: S, ...params: any[]) => S>,
  N extends string = any,
  S = any,
> = {
  actions: {
    [K in keyof T]: T[K] extends undefined
      ? {
          (): {
            payload: undefined;
            type: `${N}/${K & string}`;
          };
          name: K;
          type: `${N}/${K & string}`;
        }
      : {
          (...params: DropFirst<Parameters<T[K]>>): {
            payload: T[K];
            type: `${N}/${K & string}`;
          };
          name: K;
          type: `${N}/${K & string}`;
        };
  };
  addListener: (listener: (state: S) => void) => () => void;
  api: {
    [K in keyof T]: T[K] extends undefined
      ? () => boolean
      : (...params: DropFirst<Parameters<T[K]>>) => boolean;
  } & {
    getState: () => S;
  };
  middleware: (api: MiddlewareAPI) => (next: Dispatch) => (action: Action) => any;
  reducer: (state: S, action: Action) => S;
  select: () => S;
};

export function slice<
  T extends Record<keyof T, (state: S, ...params: any[]) => S>,
  N extends string = any,
  S = any,
>(name: N, initialState: S, config: T): Slice<T, N, S> {
  type SliceActionType = `${N}/${keyof T & string}`;
  type Listener = (state: S) => void;

  let dispatch: Dispatch;
  let getState: () => any;

  const keys = Object.keys(config) as unknown as (keyof T & string)[];

  const actionTypes = keys.reduce((acc, key) => {
    acc[key] = getType(key) as SliceActionType;

    return acc;
  }, {} as Record<keyof T & string, SliceActionType>);

  const keysFromActionTypes = inverse(actionTypes);
  const listeners = new Set<Listener>();

  /**
   * Build the slice's action creators.
   */
  const actions = keys.reduce(
    (acc, key) => {
      const actionCreator = function (...params: any[]) {
        return {
          payload: config[key].length > 2 ? params : params[0],
          type: actionTypes[key],
        };
      } as any;

      actionCreator.type = actionTypes[key];

      acc[key] = actionCreator;

      return acc;
    },
    {} as {
      [K in keyof T]: T[K] extends undefined
        ? {
            (): {
              payload: undefined;
              type: `${N}/${K & string}`;
            };
            name: K;
            type: `${N}/${K & string}`;
          }
        : {
            (...params: DropFirst<Parameters<T[K]>>): {
              payload: T[K];
              type: `${N}/${K & string}`;
            };
            name: K;
            type: `${N}/${K & string}`;
          };
    },
  );

  /**
   * Create an API from the actions object. The API provides the same parameters as the actions, but
   * calls dispatch instead of just creating an action.
   */
  const api = (
    Object.entries(actions) as Array<[keyof T & string, (param?: any) => Action]>
  ).reduce(
    (acc, [key, actionCreator]) => {
      acc[key] = function <K extends keyof T & string>(...params: DropFirst<Parameters<T[K]>>) {
        if (!dispatch) {
          throw `${name} slice middleware has not yet been registered with the store. Dispatch is not available.`;
        }

        const action = actionCreator(...params) as {
          payload: T[K];
          type: `${N}/${K & string}`;
        };

        const before = select();

        dispatch(action);

        const after = select();

        return before !== after;
      } as any;

      return acc;
    },
    {
      getState: select,
    } as {
      [K in keyof T]: T[K] extends undefined
        ? () => boolean
        : (...params: DropFirst<Parameters<T[K]>>) => boolean;
    } & {
      getState: () => S;
    },
  );

  return {
    actions,
    addListener,
    api,
    middleware,
    reducer,
    select,
  };

  function addListener(listener: Listener) {
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  }

  function select(): S {
    if (!getState) {
      throw `${name} slice middleware has not yet been registered with the store. getState is not available.`;
    }

    return getState()[name] as S;
  }

  function getType(key: keyof T & string): SliceActionType {
    return `${name}/${key}`;
  }

  function isSliceActionType(type: string): type is SliceActionType {
    return keysFromActionTypes[type as SliceActionType] !== undefined;
  }

  function middleware(middlewareApi: MiddlewareAPI) {
    if (!getState) {
      getState = middlewareApi.getState;
    }

    if (!dispatch) {
      dispatch = middlewareApi.dispatch;
    }

    return (next: Dispatch) => (action: Action) => {
      next(action);

      if (isSliceActionType(action.type)) {
        const state = select();

        listeners.forEach((listener) => listener(state));
      }
    };
  }

  function reducer(state: S | undefined, action: Action): S {
    const [namespace] = action.type.split('/');
    const dest = state || initialState;

    if (isSliceActionType(action.type)) {
      const key = keysFromActionTypes[action.type];

      if (namespace !== name || !config[key]) {
        return state ?? initialState;
      }

      // Spread payload into handler, but only if the config handler is expecting more than one argument.
      const res =
        config[key].length > 2
          ? config[key](dest, ...(action['payload'] as [any]))
          : config[key](dest, action['payload']);

      return res;
    }

    return dest;
  }
}

function inverse<T extends string, U extends string>(obj: Record<T, U>): Record<U, T> {
  const ret = {} as Record<U, T>;

  for (const key in obj) {
    ret[obj[key]] = key;
  }

  return ret;
}
