import { Api, Notification } from './types';

export function service(api: Api) {
  return {
    addNotification,
  };

  function addNotification(notification: Notification) {
    api.addNotification(notification);
  }
}
