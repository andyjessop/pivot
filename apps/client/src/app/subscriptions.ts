import {
  authRouter,
  selectShouldRedirectToNotFound,
} from '../subscriptions/auth-router';

/**
 * This is the configuration for the subscriptions of the application. The `injectable` property
 * is an instance of an `Injectable` that returns a Subscription instance. The `selector` property
 * is a function that returns a boolean indicating whether the subscription should be called
 */
export const subscriptions = {
  authRouter: {
    active: () => true,
    selector: selectShouldRedirectToNotFound,
    injectable: authRouter,
  },
};
