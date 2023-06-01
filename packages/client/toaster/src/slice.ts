import { ExtractApi } from '@pivot/lib/slice';

import { Entry } from './types';

export type State = {
  entries: Entry[];
};

export const initialState: State = {
  entries: [],
};

export const reducers = {
  addEntry,
  removeEntry,
};

function addEntry(state: State, entry: Entry): State {
  return {
    ...state,
    entries: [...state.entries, { ...entry }],
  };
}

function removeEntry(state: State, id: string): State {
  return {
    ...state,
    entries: state.entries.filter((entry) => entry.id !== id),
  };
}
export type Model = ExtractApi<typeof reducers>;
