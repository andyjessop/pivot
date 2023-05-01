import { vi } from 'vitest';

import { dynamicStore } from '@pivot/lib/dynamic-store';

import { slice } from './index';

interface State {
  count: number;
}

const initial: State = { count: 0 };

describe('slice', () => {
  it('should add reducers', () => {
    const { actions, reducer } = slice('counter', initial, {
      add: (state: State, one: number) => ({
        ...state,
        count: state.count + one,
      }),
      subtract: (state: State, one: number) => ({
        ...state,
        count: state.count - one,
      }),
    });

    const { add, subtract } = actions;

    // eslint-disable-next-line
    // @ts-expect-error
    expect(reducer(undefined, { type: add.type, payload: 1 })).toEqual({
      count: 1,
    });
    expect(reducer(initial, { type: add.type, payload: 1 })).toEqual({
      count: 1,
    });
    expect(reducer(initial, { type: add.type, payload: undefined })).toEqual({
      count: NaN,
    });

    expect(actions.add.name).toEqual('actionCreator');
    expect(actions.add.type).toEqual(add.type);

    expect(actions.add(1)).toEqual({ payload: 1, type: add.type });
    expect(actions.subtract(2)).toEqual({ payload: 2, type: subtract.type });
  });

  it('should handle multiple parameters', () => {
    const { actions, reducer } = slice('counter', initial, {
      add: (state: State, one: number, two: number) => ({
        ...state,
        count: state.count + one + two,
      }),
    });

    const { add } = actions;

    expect(add(1, 2)).toEqual({ payload: [1, 2], type: add.type });
    expect(reducer(initial, { type: add.type, payload: [1, 2] })).toEqual({
      count: 3,
    });
  });

  it('should handle multiple parameters (2)', () => {
    const { actions, reducer } = slice('counter', initial, {
      add: (state: State, one: number, two: number) => ({
        ...state,
        count: state.count + one + two,
      }),
      addOptional: (state: State, one: number, two?: number) => ({
        ...state,
        count: state.count + one + (two ?? 0),
      }),
    });

    const { add, addOptional } = actions;

    expect(add(1, 2)).toEqual({ payload: [1, 2], type: add.type });
    expect(reducer(initial, { type: add.type, payload: [1, 2] })).toEqual({
      count: 3,
    });

    expect(addOptional(2)).toEqual({ payload: [2], type: addOptional.type });
    expect(reducer(initial, { type: addOptional.type, payload: [2] })).toEqual({
      count: 2,
    });

    expect(addOptional(2, 1)).toEqual({
      payload: [2, 1],
      type: addOptional.type,
    });
    expect(reducer(initial, { type: addOptional.type, payload: [2, 1] })).toEqual({ count: 3 });
  });

  it('should handle optional parameters (1)', () => {
    const { actions, reducer } = slice('counter', initial, {
      addOptional: (state: State, one?: number) => ({
        ...state,
        count: state.count + (one ?? 0),
      }),
    });

    const { addOptional } = actions;

    expect(addOptional(2)).toEqual({ payload: 2, type: addOptional.type });
    expect(reducer(initial, { type: addOptional.type, payload: 2 })).toEqual({
      count: 2,
    });

    expect(addOptional()).toEqual({
      payload: undefined,
      type: addOptional.type,
    });
    expect(reducer(initial, { type: addOptional.type, payload: undefined })).toEqual({ count: 0 });
  });

  it('should handle optional parameters (2)', () => {
    const { actions, reducer } = slice('counter', initial, {
      addOptional: (state: State, one: number, two?: number) => ({
        ...state,
        count: state.count + one + (two ?? 0),
      }),
    });

    const { addOptional } = actions;

    // slice will always pass the payload as an array if there are multiple parameters in the config
    expect(actions.addOptional(2)).toEqual({
      payload: [2],
      type: addOptional.type,
    });
    expect(reducer(initial, { type: addOptional.type, payload: [2] })).toEqual({
      count: 2,
    });

    expect(actions.addOptional(2, 1)).toEqual({
      payload: [2, 1],
      type: addOptional.type,
    });
    expect(reducer(initial, { type: addOptional.type, payload: [2, 1] })).toEqual({ count: 3 });
  });

  it('should work with array type params', () => {
    const { actions, reducer } = slice('counter', initial, {
      add: (state: State, one: number[]) => ({
        ...state,
        count: state.count + one.reduce((acc, cur) => acc + cur, 0),
      }),
    });

    const { add } = actions;

    expect(add([1, 2])).toEqual({ payload: [1, 2], type: add.type });
    expect(reducer(initial, { type: add.type, payload: [1, 2] })).toEqual({
      count: 3,
    });
  });

  it('should produce API from actions', () => {
    const { api } = slice('counter', initial, {
      add: (state: State, one: number[]) => ({
        ...state,
        count: state.count + one.reduce((acc, cur) => acc + cur, 0),
      }),
    });

    expect(api.add).not.toBeUndefined();
  });

  it('api should dispatch actions', () => {
    const { api, middleware, reducer } = slice('counter', initial, {
      add: (state: State, one: number[]) => ({
        ...state,
        count: state.count + one.reduce((acc, cur) => acc + cur, 0),
      }),
    });

    const store = dynamicStore();

    store.addMiddleware(middleware);
    store.addReducer('counter', reducer);

    api.add([1, 2]);

    expect(store.getState().counter.count).toEqual(3);
  });

  it('should add listener', () => {
    const initial: State = { count: 0 };

    const { addListener, api, middleware, reducer } = slice('counter', initial, {
      add: (state: State, one: number[]) => ({
        ...state,
        count: state.count + one.reduce((acc, cur) => acc + cur, 0),
      }),
    });

    const store = dynamicStore();

    store.addMiddleware(middleware);
    store.addReducer('counter', reducer);

    const listener = vi.fn();

    addListener(listener);

    api.add([1, 2]);

    expect(listener).toBeCalledTimes(1);
  });

  it('should not call listener if action is not owned by slice', () => {
    const initial: State = { count: 0 };

    const { addListener, middleware, reducer } = slice('counter', initial, {
      add: (state: State, one: number[]) => ({
        ...state,
        count: state.count + one.reduce((acc, cur) => acc + cur, 0),
      }),
    });

    const store = dynamicStore();

    store.addMiddleware(middleware);
    store.addReducer('counter', reducer);

    const listener = vi.fn();

    addListener(listener);

    store.dispatch({
      type: 'some-other-action',
      payload: [1, 2],
    });

    expect(listener).toBeCalledTimes(0);
  });
});
