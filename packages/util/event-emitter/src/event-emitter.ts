export interface EventEmitter<T extends Record<string, unknown>> {
  emit<K extends keyof T>(type: K, data: T[K]): Promise<unknown[]>;
  off<K extends keyof T>(type: K, handler: EventHandler<T[K]>): void;
  offAll(handler: EventHandler<T[keyof T]>): void;
  on<K extends keyof T>(type: K, handler: EventHandler<T[K]>): () => void;
  onAll(handler: EventHandler<T[keyof T]>): void;
  once<K extends keyof T>(type: K, handler: EventHandler<T[K]>): void;
}

export type EventHandler<T> = (data: T) => unknown;

export interface EventListener<T, K extends keyof T> {
  handler: EventHandler<T[K]>;
  type: K;
}

/**
 * Create an event emitter.
 */
export function eventEmitter<T extends Record<string, unknown>>(): EventEmitter<T> {
  const listeners: EventListener<T, any>[] = [];

  return {
    emit,
    off,
    offAll,
    on,
    onAll,
    once,
  };

  /**
   * Subscribe to an event.
   */
  function on<K extends keyof T>(type: K, handler: EventHandler<T[K]>): () => void {
    const listener = <EventListener<T, K>>{ handler, type };

    listeners.push(listener);

    return () => off(type, handler);
  }

  /**
   * Subscribe to an event.
   */
  function onAll(handler: EventHandler<T[keyof T]>): void {
    const listener = <EventListener<T, keyof T>>{ handler, type: 'all' };

    listeners.push(listener);
  }

  /**
   * Emit an event.
   */
  function emit<K extends keyof T>(type: K, data: T[K]): Promise<unknown[]> {
    let listener: EventListener<T, keyof T> | undefined;
    const promises: Promise<unknown>[] = [];

    for (listener of listeners) {
      if (listener.type !== type && listener.type !== 'all') {
        continue;
      }

      const result = listener.handler(data);

      if ((<Promise<unknown>>result)?.then) {
        promises.push(<Promise<unknown>>result);
      }
    }

    return Promise.all(promises);
  }

  /**
   * Remove a listener.
   */
  function off<K extends keyof T>(type: K, handler: EventHandler<T[K]>): void {
    const ndx = listeners.findIndex(
      (l: EventListener<T, K>) => type === l.type && handler === l.handler,
    );

    if (ndx !== -1) {
      listeners.splice(ndx, 1);
    }
  }

  /**
   * Remove a listener.
   */
  function offAll(handler: EventHandler<T[keyof T]>): void {
    const ndx = listeners.findIndex(
      (l: EventListener<T, keyof T>) => 'all' === l.type && handler === l.handler,
    );

    if (ndx !== -1) {
      listeners.splice(ndx, 1);
    }
  }

  /**
   * Subscribe to an event.
   */
  function once<K extends keyof T>(type: K, handler: EventHandler<T[K]>): void {
    const listener: EventListener<T, K> = {
      handler: (...args) => {
        off(type, listener.handler);
        handler(...args);
      },
      type,
    };

    listeners.push(listener);
  }
}
