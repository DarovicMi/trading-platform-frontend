import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Notification } from '../entities/Notification';
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationsSubject = new Subject<Notification>();
  notifications$ = this.notificationsSubject.asObservable();
  private nextId = 0;

  private addNotification(notification: Omit<Notification, 'id'>) {
    const id = this.nextId++;

    const newNotification: Notification = { id, ...notification };
    this.notificationsSubject.next(newNotification);

    if (newNotification.duration) {
      setTimeout(() => this.removeNotification(id), newNotification.duration);
    }
  }

  success(message: string, duration = 3000) {
    this.addNotification({ type: 'success', message, duration });
  }

  error(message: string, duration = 3000) {
    this.addNotification({ type: 'error', message, duration });
  }

  info(message: string, duration = 3000) {
    this.addNotification({ type: 'info', message, duration });
  }

  warning(message: string, duration = 3000) {
    this.addNotification({ type: 'warning', message, duration });
  }

  removeNotification(id: number) {
    this.notificationsSubject.next({ id, type: 'remove', message: '' });
  }
}
