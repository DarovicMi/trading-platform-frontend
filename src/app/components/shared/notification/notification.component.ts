import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NotificationService } from '../../../services/notification.service';
import { Notification } from '../../../entities/Notification';

@Component({
  selector: 'cc-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
})
export class NotificationComponent {
  notifications: Notification[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService.notifications$.subscribe((notification) => {
      if (notification.type === 'remove') {
        this.notifications = this.notifications.filter(
          (n) => n.id !== notification.id
        );
      } else {
        this.notifications.push(notification);
      }
    });
  }

  removeNotification(id: number) {
    this.notificationService.removeNotification(id);
  }
}
