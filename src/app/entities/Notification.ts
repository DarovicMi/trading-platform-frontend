export interface Notification {
  id: number;
  type: 'success' | 'error' | 'info' | 'warning' | 'remove';
  message: string;
  duration?: number;
}
