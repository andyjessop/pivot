# Pivot

[![ci](https://github.com/andyjessop/pivot/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/andyjessop/pivot/actions/workflows/ci.yml)

Pivot is a tool for managing deployment of your projects. It is also a framework for building application code in a way that is fast, easy to test, and maintainable.

In the new paradigm of AI-driven development, it is important to make it easy for AI helpers to understand your code. Pivot decouples state updates from services from business logic, giving AI helpers a clear path to hyper-rapid development.

## Motivation

The motivation behind this modular service management framework is to simplify the development, maintenance, and testing of complex web applications by offering a structured and organized way to manage services, state, and dependencies. Key motivations include:

1. **Modularity**: The framework encourages a modular approach to application development. By defining services and slices in a consistent and organized manner, it becomes easier to separate concerns and promote reusability of components across the application.

2. **Dependency Injection**: The injectable system allows developers to manage dependencies explicitly, making it easier to understand the relationships between components. This approach promotes loose coupling and enhances testability by enabling developers to replace dependencies with mocks or stubs during testing.

3. **Scalability**: The framework's structure makes it easier to add new services, slices, and dependencies as the application grows, reducing the complexity that comes with larger applications.

4. **Application-First, UI-Independent Design**: The framework is designed to be application-first and independent of the UI, enabling the entire app to run without a user interface. It is state-driven, which means that the UI is always a representation of the state. This design approach minimizes the need for useState and useEffect, simplifying the overall development process and allowing developers to focus on application logic.

5. **Ease of Testing**: This framework is designed with testing as a first-class citizen. Integration tests can be performed using Jest, Vitest, or other testing tools, and can be debugged in the IDE without needing a UI. This design choice allows developers to focus on application logic and correctness before implementing the user interface.

Overall, the motivation behind this framework is to provide developers with a toolset that streamlines the development process, enhances maintainability, and improves testability of web applications by introducing a well-defined structure for managing services, state, and dependencies.

## Usage

### Folder Structure

The code is split between framework (dirty) code, and domain (clean) code. The framework code is found in `apps/client/src` and the domain code is found in `packages/client/[module-name]`.

```bash
├── apps
│   └── client
│       ├── src
│       │   ├── app
│       │   │   ├── modules
│       │   │   │   ├── project
│       │   │   │   │   ├── selectors.ts
│       │   │   │   │   ├── service.ts
│       │   │   │   │   ├── slice.ts
│       │   │   │   │   ├── index.ts
│       │   │   ├── subscriptions
│       │   │   ├── test
│       │   │   ├── index.ts
│       │   │   ├── services.ts
│       │   │   └── slices
│       │   ├── ui
│       │   │   ├── App.tsx
│       │   │   ├── project
│       │   │   │   ├── Project.tsx
│       │   ├── main.tsx
│       │   └── routes.ts

├── packages
│   └── client
│       ├── project
│       │   ├── components
│       │   │   ├── ProjectTable.tsx
│       │   ├── reducers.ts
│       │   ├── selectors.ts
│       │   ├── service.ts
│       │   ├── index.ts
```

### Domain Code

A crucial aspect of Pivot is that business logic is kept separate and isolated from framework code. The `packages/client/[module-name]` folders contain isolated functions whose dependencies are injected by the framwork. This allows for easy testing and reuse of code within this folder.

#### Reducers

Let's take reducers for example. Now, these aren't your classical Redux reducers, because they don't take actions as parameters, instead they are of the form:

```ts
type Reducer = (state: State, ...args: any[]) => State;
```

For example:

```ts
export function setFlag(state: State, someFlag: boolean): State {
  return {
    ...state,
    flag: someFlag,
  };
}
```

Notice how there is no framework code in this function. This is a pure function that takes a state and returns a new state. This makes it easy to test, and easy to reuse.

#### Services

A "Service" in pivot is really just any function that performs some business logic. Usually this involves side effects, so think of it in terms of Sagas or Epics. The difference here is that services are just functions that define the shape of the parameters they use, and return some API that the framework can use to interact with them. For example:

```ts
export function toasterService(toaster: ToasterRepository) {
  return {
    toast: (message: string) => {
      toaster.add(message);

      setTimeout(() => {
        toaster.remove(message);
      }, 5000);
    },
  };
}
```

Notice how the service is just a function that returns an object. The function defines the shape of its arguments (in this case `Toaster`) and the returned object defines the API that the framework can use to interact with the service. 

#### Selectors

Selectors are functions that transform some object passed to them. They could just as well be called "transformers" or "mappers". For example:

```ts
export function projectId(project: Project): string {
  return project.id;
}
```

Again, notice how we're not using `createSelector` here, this is just domain code, no framework or library code. That will come later.

#### Components

Components are just React components. They can be as simple or as complex as you want. The only requirement is that they are pure functions that take props as arguments and return JSX. For example:

```tsx
export function ProjectTable({ projects }: { projects: Project[] }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Id</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project) => (
          <tr key={project.id}>
            <td>{project.name}</td>
            <td>{project.id}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

With these four structures: Reducers, Services, and Selectors, and Components we can build out most of the functionality of the app. It's now up to the framework to link them all together.

### Framework Code

Pivot is app-first, UI-second, so let's leave discussion of the React side of things until later. For now, we'll build a headless app.

The first thing we need to look at is the dependency injection system. It's central to Pivot.

#### Injectable

An app is a `headless` instance, which takes services, slices, and subscriptions as arguments. The form they take, however, is very specific: they need to be _injectable_. `Injectable` objects are those which can be injected into services, and used by the app themselves. In order to create an injectable, you need to use the `injectable` function to wrap the domain code we wrote in the previous section. For example:

```ts

const serviceA = injectable({
  importFn: (dep1) => import('./serviceA').then(mod => mod.serviceA(dep1)),
  dependencies: [dep1Injectable], // <-- this is an array of injectables
});
```

Let's take a look at this more closely. The `importFn` is a function that takes the dependencies as arguments, and returns a promise that resolves to the injectable. The `dependencies` are the injectables that this injectable depends on. This is how the framework knows how to resolve the dependencies of the injectable.

So we've just created a service. This service can either be used directly by the app, or it can be used by other services. Let's create another service that depends on serviceA:

```ts
const serviceB = injectable({
  importFn: (a) => import('./serviceB').then(mod => mod.serviceB(a)),
  dependencies: [serviceA],
});
```

So now we have two services, `serviceA` and `serviceB`. `serviceB` depends on `serviceA`, so the framework will make sure that `serviceA` is available before `serviceB` is available. When it's ready to instantiate `serviceB`, Pivot will also instantiate `serviceA` if it hasn't been already. This is how the framework manages dependencies.

Let's define the services that are available to the app:

```ts
const services = {
  serviceB,
};
```

Before we see how to add that object to the app, let's look at slices:

#### Slices

Slices are Redux slices, and are created with the `slice` function that takes the framework-agnostic "reducers" we created earlier. Slices also need to be injectable. Let's put all that together now:

```ts
import { slice } from '@pivot/lib/slice';

const sliceA = injectable({
  importFn: () => import('./sliceA').then(mod => slice('a', mod.initialState, mod.reducers)),
});
```

The `slice` function returns an object with an `api` property, which is an API that allows you to dispatch actions directly, without actually calling `dispatch`. This means that we can use the slice as a service:

```ts

const serviceA = injectable({
  importFn: (slice) => import('./serviceA').then(mod => mod.serviceA(slice.api)),
  dependencies: [sliceA],
});
```

`serviceA` now has access to the slice's API:

```ts
export function serviceA(api: SliceApi) {
  return {
    setFlag: (flag: boolean) => api.setFlag(flag),
  };
}
```

Notice how we're not using `dispatch` here. This is because the `api.setFlag` is calling `dispatch` behind the scenes. 

So, now we have a slice that is injectable, and is also dynamically-loaded. This is important to understand for the next step: how to add this slice to the app:

```ts
const slices = {
  a: {
    active: (state) => isRouteA(state),
    injectable: sliceA,
  },
};
```

This is slightly different from how we defined services. Services are available on-demand, but slices must be registered and unregisted by the application according to some logic. The logic we use is a standard selector. So, in this case, we're registering the `a` slice whenever we're on the `A` route. By registering/unregistering the slice dynamically, we're able to keep the number of reducers in the Redux store to a minimum, which is important for performance. It also frees us up to put as much as possible into the store.

#### Subscriptions

Pivot is a state-driven app, and that counts for reacting to events as well. The way we do this is with subscriptions. Subscriptions are functions that take the state as an argument, and return an object that contains the subscriptions. Let's take a look at an example:

```ts
export const unauthorizedRedirect = {
  dependencies: [routerService],
  handler: (router: Router) => (shouldRedirect: boolean) => {
    if (shouldRedirect) {
      router.navigate({ name: 'notFound' });
    }
  },
  selector: selectShouldRedirectToNotFound,
};
```

Here, we have a selector that determines - from the state - whether or not we should redirect to `notFound`. If this selector returns `true`, then the handler is first called with its dependency injectables, and then the resulting function is called with the result of the selector. This function will be called whenever the selected value changes (and is not `null` or `undefined`).

Subscriptions can be used to connect different slices. For example, maybe you want to clear the state of a slice when the user logs out. You can do that with subscriptions.

#### Putting it all together

Now that we have services, slices, and subscriptions, we can put them all together into a headless app:

```ts
const app = headless({
  services,
  slices,
  subscriptions,
});

app.init();
```

We now have a fully-functioning headless app. We can use this for integration testing our various modules within Node (e.g. Jest or Vitest). But how do we interact with it. Well, if we're doing integration tests, we can use the `app` object directly. It provides handy methods like:

```ts
{
  getService,
  getSlice,
  getState,
  select,
  waitFor,
  waitForState,
}

```

We can write a test like this, for instance:

```ts
it('should login', async () => {
  const auth = await app.getService('auth');

  const login = await auth.login('user@user.com', 'password');

  expect(await app.getSlice('auth')).toEqual({
    isChecking: false,
    isLoggingIn: false,
    isLoggingOut: false,
    user: {
      email: 'user@user.com',
    },
  });
});
```

Or like this, using `waitFor` to wait for a selector before testing the state (great for testing async code): 

```ts
it('should navigate to notFound on authorized route then logged out', async () => {
  visit('/projects');

  const auth = await app.getService('auth');

  await auth.logout();

  const route = await app.waitFor(selectRoute, (route) => route?.name === 'notFound');

  expect(route?.name).toEqual('notFound');
});
```

This test will run without a UI, and will be very fast.
