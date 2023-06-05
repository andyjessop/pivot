import { Config, State } from './machine';

interface FlatState<T> {
  actions?: Record<string, State<T>>;
  initial?: State<T>;
  parent?: State<T>;
}

type StateMap<T> = Record<State<T>, FlatState<T>>;

export function flattenConfig<T extends Config>(config: T): StateMap<T> {
  const stateMap = {} as Record<State<T>, FlatState<T>>;

  function traverseStates(states: Record<string, Config>, parent?: State<T>) {
    for (const [key, value] of Object.entries(states) as [State<T>, T][]) {
      const state: FlatState<T> = {
        actions: value.actions as Record<string, State<T>>,
        initial: value.initial as State<T>,
      };

      if (parent) {
        state.parent = parent;
      }

      if (stateMap[key]) {
        throw new Error(`Duplicate state: ${key}`);
      }

      stateMap[key] = state;

      if (value.states) {
        traverseStates(value.states, key);
      }
    }
  }

  if (config.states) {
    traverseStates(config.states);
  }

  return stateMap;
}

export function getParentPath<T>(stateMap: StateMap<T>, stateName: State<T>): State<T>[] {
  const path: State<T>[] = [stateName];

  let state = stateMap[stateName] as FlatState<T> | undefined;

  while (state) {
    if (state.parent) {
      path.push(state.parent);
    }

    state = state.parent ? stateMap[state.parent] : undefined;
  }

  return path;
}
