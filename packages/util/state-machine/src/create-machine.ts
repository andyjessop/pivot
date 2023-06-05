import { ActionUnion, Config, machine, StateUnion } from './machine';

interface Options<T> {
  initialState?: StateUnion<T>;
}

export function createMachine<T extends Config>(config: T, { initialState }: Options<T> = {}) {
  const m = machine(config);

  let state = initialState || (config.initial as StateUnion<T>);

  if (!state) {
    throw new Error('Initial state is not defined');
  }

  return {
    transition,
  };

  function transition(action: ActionUnion<T>) {
    const nextState = m.transition(state, action);

    if (!nextState) {
      return null;
    }

    state = nextState;
  }
}

const m = machine({
  initial: 'STATE_1',
  states: {
    STATE_1: {
      actions: { ACTION_5: 'STATE_2' },
      initial: 'STATE_3',
      states: {
        STATE_3: {
          actions: { ACTION_1: 'STATE_4', ACTION_2: 'STATE_2' },
        },
        STATE_4: {
          actions: { ACTION_3: 'STATE_3' },
        },
      },
    },

    STATE_2: {
      actions: { ACTION_4: 'STATE_1', ACTION_5: 'STATE_3' },
      initial: 'STATE_5',
      states: {
        STATE_5: {
          actions: { ACTION_6: 'STATE_6' },
        },
        STATE_6: {
          actions: { ACTION_6: 'STATE_5' },
        },
      },
    },
  },
});

const nextState = m.transition('STATE_1', 'ACTION_5');
