import { flattenConfig, getParentPath } from './flatten-config';

describe('flattenConfig', () => {
  it('should create paths for a simple state object', () => {
    const config = {
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
    };

    expect(flattenConfig(config)).toEqual({
      STATE_1: {
        actions: { ACTION_5: 'STATE_2' },
        initial: 'STATE_3',
      },
      STATE_2: {
        actions: { ACTION_4: 'STATE_1', ACTION_5: 'STATE_3' },
        initial: 'STATE_5',
      },
      STATE_3: {
        actions: { ACTION_1: 'STATE_4', ACTION_2: 'STATE_2' },
        parent: 'STATE_1',
      },
      STATE_4: {
        actions: { ACTION_3: 'STATE_3' },
        parent: 'STATE_1',
      },
      STATE_5: {
        actions: { ACTION_6: 'STATE_6' },
        parent: 'STATE_2',
      },
      STATE_6: {
        actions: { ACTION_6: 'STATE_5' },
        parent: 'STATE_2',
      },
    });
  });
});

describe('getParentPath', () => {
  const config = {
    STATE_1: {
      actions: { ACTION_1: 'STATE_2' },
      initial: 'STATE_3',
    },
    STATE_2: {
      actions: { ACTION_6: 'STATE_1' },
      initial: 'STATE_10',
    },
    STATE_3: {
      actions: { ACTION_2: 'STATE_4' },
      initial: 'STATE_5',
      parent: 'STATE_1',
    },
    STATE_4: {
      actions: { ACTION_5: 'STATE_3' },
      initial: 'STATE_9',
      parent: 'STATE_1',
    },
    STATE_5: {
      actions: { ACTION_3: 'STATE_6' },
      parent: 'STATE_3',
    },
    STATE_6: {
      actions: { ACTION_4: 'STATE_5' },
      parent: 'STATE_2',
    },
  };

  test('returns an empty array for the initial state', () => {
    const parentPath = getParentPath(config, 'STATE_1');
    expect(parentPath).toEqual(['STATE_1']);
  });

  test('returns an array of parent states for a nested state', () => {
    const parentPath = getParentPath(config, 'STATE_3');
    expect(parentPath).toEqual(['STATE_3', 'STATE_1']);
  });

  test('returns an array of parent states for a doubly nested state', () => {
    const parentPath = getParentPath(config, 'STATE_5');
    expect(parentPath).toEqual(['STATE_5', 'STATE_3', 'STATE_1']);
  });

  test('returns an array of parent states for a triply nested state', () => {
    const parentPath = getParentPath(config, 'STATE_6');
    expect(parentPath).toEqual(['STATE_6', 'STATE_2']);
  });
});
