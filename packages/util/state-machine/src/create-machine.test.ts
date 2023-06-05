import { createMachine } from './create-machine';

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
        STATE_7: {
          actions: { ACTION_4: 'STATE_5' },
        },
        STATE_8: {
          states: {
            STATE_9: {
              actions: { ACTION_4: 'STATE_6' },
            },
          },
        },
      },
    },
  },
};

describe('createMachine', () => {
  it('should start at nested initial (1)', () => {
    const createdMachine = createMachine(config, { initial: 'STATE_3' });
    const nextState = createdMachine.transition('ACTION_1');

    expect(nextState).toEqual('STATE_4');
  });

  it('should start at nested initial (2)', () => {
    const createdMachine = createMachine(config, { initial: 'STATE_4' });
    const nextState = createdMachine.transition('ACTION_3');

    expect(nextState).toEqual('STATE_3');
  });

  it('should change to nested initial (1)', () => {
    const createdMachine = createMachine(config, { initial: 'STATE_1' });
    const nextState = createdMachine.transition('ACTION_1');

    expect(nextState).toEqual('STATE_4');
  });

  it('should change to nested initial (2)', () => {
    const createdMachine = createMachine(config, { initial: 'STATE_2' });
    const nextState = createdMachine.transition('ACTION_6');

    expect(nextState).toEqual('STATE_6');
  });

  it('should not transition if state does not exist', () => {
    const createdMachine = createMachine(config, { initial: 'STATE_4' });
    const nextState = createdMachine.transition('ACTION_1');

    expect(nextState).toEqual(null);
    expect(createdMachine.currentState()).toEqual('STATE_4');
  });

  it('should transition if parent has action definition', () => {
    const createdMachine = createMachine(config, { initial: 'STATE_3' });
    const nextState = createdMachine.transition('ACTION_5');

    expect(nextState).toEqual('STATE_5');
  });

  it('child should override parent if both have action definition (1)', () => {
    const createdMachine = createMachine(config, { initial: 'STATE_7' });
    const nextState = createdMachine.transition('ACTION_4');

    expect(nextState).toEqual('STATE_5');
  });

  it('child should override parent if both have action definition (2)', () => {
    const createdMachine = createMachine(config, { initial: 'STATE_9' });
    const nextState = createdMachine.transition('ACTION_4');

    expect(nextState).toEqual('STATE_6');
  });
});
