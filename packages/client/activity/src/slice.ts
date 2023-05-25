import { ExtractApi } from '@pivot/lib/slice';
import { ActionNames, createMachine } from '@pivot/util/state-machine';
import { generateRandomId } from '@pivot/util/string';

import { DraftEntry, Entry } from './types';

const machineConfig = {
  addingEntry: {
    addEntryFinish: (stack: string[], data: State) =>
      data.activeCount === 1 ? 'showingActive' : 'showingAll',
  },
  closed: {
    addEntryStart: 'addingEntry',
    open: 'showingAll',
  },
  markingEntryInactive: {
    addEntryStart: (stack: string[]) => {
      stack.push('showingActive');

      return 'addingEntry';
    },
    markInactiveFinish: (stack: string[], data: State) =>
      data.activeCount === 1 ? 'showingActive' : 'closed',
  },
  showingActive: {
    addEntryStart: 'addingEntry',
    markInactiveStart: 'markingEntryInactive',
  },
  showingAll: {
    close: 'closed',
  },
};

export const initialState: State = {
  activeCount: 0,
  currentState: 'closed',
  entries: [],
};

export const reducers = {
  addEntryFinish,
  addEntryStart,
  close,
  markInactiveFinish,
  markInactiveStart,
  open,
};

const machine = createMachine(machineConfig);

function addEntryStart(state: State, entry: DraftEntry): State {
  const nextState = transition(state, 'addEntryStart');
  const id = generateRandomId();

  return {
    ...nextState,
    activeCount: nextState.activeCount + 1,
    entries: [...nextState.entries, { ...entry, id }],
  };
}

function addEntryFinish(state: State) {
  return transition(state, 'addEntryFinish');
}

function close(state: State) {
  return transition(state, 'close');
}

function markInactiveFinish(state: State) {
  return transition(state, 'markInactiveFinish');
}

function markInactiveStart(state: State) {
  const nextState = transition(state, 'markInactiveStart');

  return {
    ...nextState,
    activeCount: nextState.activeCount - 1,
  };
}

function open(state: State): State {
  return transition(state, 'open');
}

function transition(state: State, action: MachineActions) {
  const { currentState } = state;

  const nextState = machine.transition(currentState, action, state);

  if (!nextState) {
    return state;
  }

  return {
    ...state,
    currentState: nextState,
  };
}

export interface State {
  activeCount: number;
  currentState: keyof typeof machineConfig;
  entries: Entry[];
}

type MachineActions = ActionNames<typeof machineConfig>;
export type Model = ExtractApi<typeof reducers>;
