import { Component, OnInit } from '@angular/core';
import { PasswordService } from '../../services/password.service';
import { NotificationService } from '../../services/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from '../../components/shared/loading-spinner/loading-spinner.component';
@Component({
  selector: 'cc-password-reset',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingSpinnerComponent],
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.scss',
})
export class PasswordResetComponent implements OnInit {
  token: string;
  newPassword: string = '';
  confirmPassword: string = '';
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private passwordService: PasswordService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParams['token'];

    if (!this.token) {
      this.notificationService.error('Invalid or expired token');
      this.router.navigate(['/login']);
    }
  }

  resetPassword() {
    if (this.newPassword !== this.confirmPassword) {
      this.notificationService.error('Passwords do not match');
      return;
    }

    this.loading = true;
    setTimeout(() => {
      this.passwordService
        .resetPassword(this.token, this.newPassword)
        .subscribe({
          next: (response) => {
            this.loading = false;
            this.notificationService.success(response.message);
            this.router.navigate(['/login']);
          },
          error: (error) => {
            this.loading = false;
            this.notificationService.error(error.error.message);
          },
        });
    }, 1500);
  }
}
