import { combineReducers, compose } from 'redux';

import { Action, Dispatch, Middleware, MiddlewareAPI, Reducer } from '@pivot/lib/redux-types';

export function middlewareRegistry() {
  const mdw: Middleware[] = [];

  return {
    add,
    middleware,
  };

  function add(m: Middleware, order?: number) {
    if (order === undefined) {
      mdw.push(m);
    } else {
      mdw.splice(order, 0, m);
    }

    return function remove() {
      const index = mdw.findIndex(isEqual(m));

      if (index < 0) {
        return;
      }

      mdw.splice(index, 1);
    };
  }

  function middleware({ getState, dispatch }: MiddlewareAPI) {
    return function withDispatch(next: Dispatch) {
      return function withAction(action: Action) {
        const middlewareAPI = {
          getState,
          dispatch: dynamicMiddlewareDispatch,
        } as MiddlewareAPI;

        const chain = mdw.map(bindMiddlewareAPI);

        return (compose(...chain)(next) as Dispatch)(action);

        function bindMiddlewareAPI(m: Middleware) {
          return m(middlewareAPI);
        }
      };
    };

    function dynamicMiddlewareDispatch(action: Action) {
      return dispatch(action);
    }
  }
}

export function reducerRegistry() {
  const reducers = new Map<string, Reducer>();
  let currentReducer: Reducer = initialReducer;

  return {
    add,
    reducer,
  };

  function add(id: string, newReducer: Reducer) {
    reducers.set(id, newReducer);

    currentReducer = combineReducers(Object.fromEntries(reducers));

    return function unregisterReducer() {
      reducers.delete(id);

      currentReducer = combineReducers(Object.fromEntries(reducers));
    };
  }

  function initialReducer<S>(state?: S) {
    return state || {};
  }

  function reducer(state: any, action: Action) {
    return currentReducer(state, action);
  }
}

function isEqual(obj: unknown) {
  return function checkEquality(obj2: unknown) {
    return obj === obj2;
  };
}
