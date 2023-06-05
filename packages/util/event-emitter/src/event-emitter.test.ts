import { vi } from 'vitest';

import { eventEmitter } from './event-emitter';

describe('eventEmitter', () => {
  type TestEvents = {
    event1: string;
    event2: number;
    event3: boolean;
  };

  test('emits an event to all listeners', async () => {
    const emitter = eventEmitter<TestEvents>();
    const handler1 = vi.fn();
    const handler2 = vi.fn();

    emitter.on('event1', handler1);
    emitter.on('event1', handler2);

    await emitter.emit('event1', 'test');

    expect(handler1).toHaveBeenCalledWith('test');
    expect(handler2).toHaveBeenCalledWith('test');
  });

  test('emits an event to a single listener', async () => {
    const emitter = eventEmitter<TestEvents>();
    const handler1 = vi.fn();
    const handler2 = vi.fn();

    emitter.on('event2', handler1);
    emitter.on('event3', handler2);

    await emitter.emit('event2', 42);

    expect(handler1).toHaveBeenCalledWith(42);
    expect(handler2).not.toHaveBeenCalled();
  });

  test('emits an event to all listeners including "all" listeners', async () => {
    const emitter = eventEmitter<TestEvents>();
    const handler1 = vi.fn();
    const handler2 = vi.fn();
    const handler3 = vi.fn();

    emitter.on('event1', handler1);
    emitter.on('event2', handler2);
    emitter.onAll(handler3);

    await emitter.emit('event3', true);

    expect(handler1).not.toHaveBeenCalled();
    expect(handler2).not.toHaveBeenCalled();
    expect(handler3).toHaveBeenCalledWith(true);
  });

  test('removes a listener', async () => {
    const emitter = eventEmitter<TestEvents>();
    const handler1 = vi.fn();
    const handler2 = vi.fn();

    const off1 = emitter.on('event1', handler1);
    emitter.on('event1', handler2);

    off1();

    await emitter.emit('event1', 'test');

    expect(handler1).not.toHaveBeenCalled();
    expect(handler2).toHaveBeenCalledWith('test');
  });

  test('removes all "all" listeners', async () => {
    const emitter = eventEmitter<TestEvents>();
    const handler1 = vi.fn();
    const handler2 = vi.fn();
    const handler3 = vi.fn();

    emitter.on('event1', handler1);
    emitter.on('event2', handler2);
    emitter.onAll(handler3);

    emitter.offAll(handler3);

    await emitter.emit('event3', true);

    expect(handler1).not.toHaveBeenCalled();
    expect(handler2).not.toHaveBeenCalled();
    expect(handler3).not.toHaveBeenCalled();
  });

  test('emits an event once', async () => {
    const emitter = eventEmitter<TestEvents>();
    const handler1 = vi.fn();

    emitter.once('event1', handler1);

    await emitter.emit('event1', 'test');
    await emitter.emit('event1', 'test');

    expect(handler1).toHaveBeenCalledTimes(1);
    expect(handler1).toHaveBeenCalledWith('test');
  });
});
