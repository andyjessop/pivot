import { headMetadata } from './head-metadata';
import { unauthorizedRedirect } from './unauthorized-redirect';

/**
 * This is the configuration for the subscriptions of the application. Each
 * subscription has a selector, and a handler. The selector is used to select
 * the value from the state that the subscription is interested in. The handler
 * is called whenever the value changes.
 *
 * The handler can also accept dependencies. These are other services that the
 * handler can use. The dependencies are injected into the handler when it is
 * called.
 *
 * @example
 *
 * const mySubscription = {
 *   selector: (state) => state.myValue,
 *   handler: (service) => (myValue) => {
 *     service.doSomething(myValue);
 *   },
 *   dependencies: [MyService],
 * };
 */
export const subscriptions = {
  headMetadata,
  unauthorizedRedirect,
};
