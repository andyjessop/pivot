import { eventEmitter } from '@pivot/util/event-emitter';

import { Action, Config, machine, State } from './machine';

interface Options<T> {
  initial?: State<T>;
}

type Events<T> = {
  enter: { action: Action<T>; next: State<T>; previous: State<T> };
  exit: { action: Action<T>; previous: State<T> };
};

export function createMachine<T extends Config>(config: T, { initial }: Options<T> = {}) {
  const m = machine(config);
  const emitter = eventEmitter<Events<T>>();

  let state = initial || (config.initial as State<T>);

  transitionToInitial(state);

  if (!state) {
    throw new Error('Initial state is not defined');
  }

  return {
    currentState: () => state,
    ...emitter,
    transition,
  };

  function transitionToInitial(s: State<T>) {
    state = s;

    while (m.states[state]?.initial) {
      state = m.states[state].initial as State<T>;
    }

    return state;
  }

  function transition(action: Action<T>) {
    const next = m.transition(state, action);

    if (!next) {
      return null;
    }

    const previous = state;

    emitter.emit('exit', { action, previous: state });

    const final = transitionToInitial(next);

    emitter.emit('enter', { action, next: final, previous });

    return final;
  }
}
