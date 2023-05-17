export interface Notification {
  content: string;
  title: string;
  type?: 'error' | 'info' | 'success' | 'warning';
}
