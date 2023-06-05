# eventEmitter

`eventEmitter` is a simple event emitter library for TypeScript. It allows you to subscribe to events and emit events with data.

To use `eventEmitter`, you need to create an instance of the emitter and subscribe to events using the `on` function. You can then emit events using the `emit` function.

```typescript
import eventEmitter from '@pivot/util/event-emitter';

interface MyEvents {
  event1: string;
  event2: number;
}

const emitter = eventEmitter<MyEvents>();

emitter.on('event1', (data) => {
  console.log(`Received event1 with data: ${data}`);
});

emitter.emit('event1', 'test');
```

In this example, we're creating an instance of the `eventEmitter` function with a generic type `MyEvents` that defines the events that the emitter can emit. We're then subscribing to the `event1` event using the `on` function and emitting the `event1` event with the data `'test'` using the `emit` function.

You can also subscribe to all events using the `onAll` function:

```typescript
emitter.onAll((data) => {
  console.log(`Received event with data: ${data}`);
});
```

You can remove all listeners of a specific event using the `offAll` function:

```typescript
emitter.offAll('event1');
```

You can remove a listener using the `off` function:

```typescript
const handler = (data) => {
  console.log(`Received event with data: ${data}`);
};

emitter.on('event1', handler);

// ...

emitter.off('event1', handler);
```

In this example, we're creating a handler function and subscribing to the `event1` event using the `on` function. We're then removing the listener using the `off` function.

You can emit an event once using the `once` function:

```typescript
emitter.once('event1', (data) => {
  console.log(`Received event1 with data: ${data}`);
});

emitter.emit('event1', 'test');
emitter.emit('event1', 'test');
```

In this example, we're subscribing to the `event1` event using the `once` function, which will only be called once. We're then emitting the `event1` event twice using the `emit` function.

## API

### `eventEmitter`

```typescript
function eventEmitter<T>(): {
  on: <K extends keyof T>(type: K, handler: EventHandler<T[K]>) => () => void;
  onAll: (handler: EventHandler<T[keyof T]>) => void;
  emit: <K extends keyof T>(type: K, data: T[K]) => Promise<unknown[]>;
  off: <K extends keyof T>(type: K, handler: EventHandler<T[K]>) => void;
  offAll: (type: keyof T) => void;
  once: <K extends keyof T>(type: K, handler: EventHandler<T[K]>) => void;
};
```

The `eventEmitter` function creates a new instance of the emitter.

### `on`

```typescript
function on<K extends keyof T>(type: K, handler: EventHandler<T[K]>): () => void;
```

The `on` function subscribes to an event. It takes a `type` parameter that specifies the type of the event and a `handler` parameter that specifies the function to call when the event is emitted. It returns a function that can be called to remove the listener.

### `onAll`

```typescript
function onAll(handler: EventHandler<T[keyof T]>): void;
```

The `onAll` function subscribes to all events. It takes a `handler` parameter that specifies the function to call when an event is emitted.

### `emit`

```typescript
function emit<K extends keyof T>(type: K, data: T[K]): Promise<unknown[]>;
```

The `emit` function emits an event. It takes a `type` parameter that specifies the type of the event and a `data` parameter that specifies the data to pass to the listeners. It returns a promise that resolves when all listeners have been called.

### `off`

```typescript
function off<K extends keyof T>(type: K, handler: EventHandler<T[K]>): void;
```

The `off` function removes a listener. It takes a `type` parameter that specifies the type of the event and a `handler` parameter that specifies the function to remove.

### `offAll`

```typescript
function offAll(type: keyof T): void;
```

The `offAll` function removes all listeners of a specific event. It takes a `type` parameter that specifies the type of the event.

### `once`

```typescript
function once<K extends keyof T>(type: K, handler: EventHandler<T[K]>): void;
```

The `once` function subscribes to an event once. It takes a `type` parameter that specifies the type of the event and a `handler` parameter that specifies the function to call when the event is emitted. The listener will only be called once.