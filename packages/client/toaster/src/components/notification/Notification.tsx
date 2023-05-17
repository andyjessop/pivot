import { Notification } from '../../types';

interface Props {
  notification: Notification;
}

export function Notification({ notification }: Props) {
  return (
    <div>
      <div>
        <span>{notification.type}</span>
        <span>{notification.title}</span>
      </div>
      <div>
        <span>{notification.content}</span>
      </div>
    </div>
  );
}
