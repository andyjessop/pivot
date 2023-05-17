import { Notification, State } from '../types';

export function addNotification(state: State, notification: Notification): State {
  return {
    ...state,
    notifications: [...state.notifications, notification],
  };
}
