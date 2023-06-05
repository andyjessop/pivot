import { machine } from './machine';

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
          actions: { ACTION_3: 'STATE_3', ACTION_5: 'STATE_3' },
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

describe('machine', () => {
  it('should transition state', () => {
    const testMachine = machine(config);

    expect(testMachine.transition('STATE_3', 'ACTION_1')).toEqual('STATE_4');
    expect(testMachine.transition('STATE_4', 'ACTION_3')).toEqual('STATE_3');
    expect(testMachine.transition('STATE_5', 'ACTION_6')).toEqual('STATE_6');
    expect(testMachine.transition('STATE_6', 'ACTION_6')).toEqual('STATE_5');
  });

  it('should transition parent state', () => {
    const testMachine = machine(config);

    // ACTION_5 is handled by the parent state, STATE_1
    expect(testMachine.transition('STATE_3', 'ACTION_5')).toEqual('STATE_2');
  });

  it('should give child state precedence', () => {
    const testMachine = machine(config);

    // ACTION_5 is handled by the child state and the parent state.
    expect(testMachine.transition('STATE_4', 'ACTION_5')).toEqual('STATE_3');
  });

  it('should throw error for duplicate state names', () => {
    expect(() =>
      machine({
        initial: 'STATE_1',
        states: {
          STATE_1: {
            initial: 'STATE_2',
            states: {
              STATE_2: {
                actions: {},
              },
            },
          },
          STATE_2: {
            actions: {},
          },
        },
      }),
    ).toThrow('Duplicate state: STATE_2');
  });
});
