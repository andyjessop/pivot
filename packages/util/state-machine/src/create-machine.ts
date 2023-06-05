import { Action, Config, machine, State } from './machine';

interface Options<T> {
  initial?: State<T>;
}

export function createMachine<T extends Config>(config: T, { initial }: Options<T> = {}) {
  const m = machine(config);

  let state = initial || (config.initial as State<T>);

  transitionToInitial(state);

  if (!state) {
    throw new Error('Initial state is not defined');
  }

  return {
    currentState: () => state,
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
    const nextState = m.transition(state, action);

    if (!nextState) {
      return null;
    }

    return transitionToInitial(nextState);
  }
}
