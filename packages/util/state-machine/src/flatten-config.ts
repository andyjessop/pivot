interface State {
  actions: Record<string, string>;
  initial?: string;
  parent?: string;
}

interface StateMap {
  [key: string]: State;
}

export function flattenConfig(config: Record<string, any>): StateMap {
  const stateMap: StateMap = {};

  function traverseStates(states: Record<string, any>, parent?: string) {
    for (const [key, value] of Object.entries(states)) {
      const state: State = {
        actions: value.actions,
        initial: value.initial,
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

  traverseStates(config.states);

  return stateMap;
}

export function getParentPath(stateMap: StateMap, stateName: string): string[] {
  const path: string[] = [stateName];

  let state = stateMap[stateName] as State | undefined;

  while (state) {
    if (state.parent) {
      path.push(state.parent);
    }

    state = state.parent ? stateMap[state.parent] : undefined;
  }

  return path;
}
