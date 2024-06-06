import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { ClickOutsideDirective } from '../../../directives/click-outside.directive';
import { NotificationService } from '../../../services/notification.service';
import { Validation } from '../../../utils/constants/user-validation';
import { User } from '../../../entities/User';
import { UserService } from '../../../services/user.service';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner/loading-spinner.component';
import { ModalComponent } from '../../shared/modal/modal.component';

@Component({
  selector: 'cc-navbar',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    ClickOutsideDirective,
    LoadingSpinnerComponent,
    ModalComponent,
  ],
  providers: [AuthService],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  public isUserLoggedIn: boolean = false;
  public isDropdownOpen: boolean = false;
  public dropdownPosition: any;
  public userFullName: string;
  public notification: string;
  public user: User;
  public isModalOpen = false;
  public loading = false;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getLoggedInStatus();
  }

  getLoggedInStatus() {
    this.authService.getLoggedInStatus().subscribe({
      next: (isLoggedIn) => {
        this.isUserLoggedIn = isLoggedIn;
        this.getCurrentLoggedInUserName();
        this.getCurrentLoggedInUser();
      },
      error: () =>
        this.notificationService.error(Validation.login.loginStatusFail),
    });
  }

  logout() {
    this.loading = true;
    setTimeout(() => {
      this.authService.logout().subscribe({
        next: () => {
          this.loading = false;
          this.notificationService.success(Validation.login.logout);
        },
        error: () => {
          this.loading = false;
          this.notificationService.error(Validation.login.failLogout);
        },
      });
    }, 1000);
  }

  getCurrentLoggedInUserName() {
    if (this.isUserLoggedIn) {
      this.authService.getCurrentLoggedInUserName().subscribe((user) => {
        this.userFullName = user;
      });
    }
  }

  getCurrentLoggedInUser() {
    if (this.isUserLoggedIn) {
      this.userService
        .getCurrentLoggedInUser()
        .subscribe((user) => (this.user = user));
    }
  }

  toggleDropdown(event: MouseEvent): void {
    this.isDropdownOpen = !this.isDropdownOpen;
    const screenWidth = window.innerWidth;
    const clickX = event.clientX;
    this.dropdownPosition = clickX > screenWidth / 2 ? 'left' : 'right';
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
