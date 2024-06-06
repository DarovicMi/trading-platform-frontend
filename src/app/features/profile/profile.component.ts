import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../entities/User';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/layout/navbar/navbar.component';
import { FooterComponent } from '../../components/layout/footer/footer.component';
import { PasswordService } from '../../services/password.service';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { Validation } from '../../utils/constants/user-validation';
import { LoadingSpinnerComponent } from '../../components/shared/loading-spinner/loading-spinner.component';

@Component({
  selector: 'cc-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NavbarComponent,
    FooterComponent,
    ClickOutsideDirective,
    LoadingSpinnerComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  public user: User;
  public loading: boolean = false;
  public isEditing: boolean = false;
  public accountStatus: string;
  public formattedBalance: string;
  public showChangePasswordPopup: boolean = false;
  public showDeleteAccountPopup: boolean = false;
  public showAddMoneyPopup: boolean = false;
  public currentPassword: string = '';
  public newPassword: string = '';
  public amountToAdd: number;
  public cardNumber: string;
  public cardExpiry: string;
  public cardCvv: string;
  public isExpiryValid: boolean = true;
  public processingPayment: boolean = false;

  constructor(
    private userService: UserService,
    private passwordService: PasswordService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile() {
    this.loading = true;
    setTimeout(() => {
      this.userService.getCurrentLoggedInUser().subscribe({
        next: (user) => {
          this.user = user;
          this.loading = false;
          this.accountStatus = this.user.isActive ? 'Active' : 'Inactive';
          this.formattedBalance = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(this.user.balance);
        },
        error: () => {
          this.notificationService.error(Validation.profile.failToGetProfile);
          this.loading = false;
        },
      });
    }, 2000);
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  saveChanges() {
    this.loading = true;
    setTimeout(() => {
      this.userService.updateUser(this.user.id, this.user).subscribe({
        next: () => {
          this.loading = false;
          this.isEditing = false;
          this.getUserProfile();
        },
        error: () => {
          this.notificationService.error(
            Validation.profile.failToUpdateProfile
          );
          this.loading = false;
        },
      });
    }, 2000);
  }

  confirmDeleteAccount(): void {
    this.loading = true;
    this.closeDeleteAccountPopup();
    setTimeout(() => {
      this.userService.deleteUser(this.user.id).subscribe({
        next: () => {
          this.loading = false;
          this.authService.logout().subscribe({
            next: () => {
              this.router.navigate(['/dashboard']);
            },
          });
        },
        error: () => {
          this.loading = false;
          this.notificationService.error(
            Validation.profile.failToDeleteProfile
          );
        },
      });
    }, 1500);
  }

  openDeleteAccountPopup(): void {
    this.showDeleteAccountPopup = true;
  }

  closeDeleteAccountPopup(): void {
    this.showDeleteAccountPopup = false;
  }
  goBack() {
    this.router.navigate(['/']);
  }

  cancel() {
    this.toggleEdit();
  }

  openChangePasswordPopup(): void {
    this.showChangePasswordPopup = true;
  }

  closeChangePasswordPopup(): void {
    this.showChangePasswordPopup = false;
    this.currentPassword = '';
    this.newPassword = '';
  }

  changePassword(): void {
    this.loading = true;
    this.showChangePasswordPopup = false;
    setTimeout(() => {
      this.passwordService
        .changePassword(this.currentPassword, this.newPassword)
        .subscribe({
          next: (pass) => {
            this.loading = false;
            this.notificationService.success(pass.message, 5000);
            this.authService.logout().subscribe({
              next: () => {
                this.router.navigate(['/login']);
              },
            });
          },
          error: () => {
            this.notificationService.error(
              Validation.profile.failToChangePassword
            );
            this.loading = false;
          },
        });
    }, 1500);
  }

  openAddMoneyPopup(): void {
    this.showAddMoneyPopup = true;
  }

  closeAddMoneyPopup(): void {
    this.showAddMoneyPopup = false;
    this.amountToAdd = null;
    this.cardNumber = '';
    this.cardExpiry = '';
    this.cardCvv = '';
  }

  addMoney(): void {
    this.processingPayment = true;
    setTimeout(() => {
      this.user.balance = Number(this.user.balance) + Number(this.amountToAdd);
      this.saveChanges();
      this.processingPayment = false;
      this.closeAddMoneyPopup();
    }, 3000);
  }

  formatCardNumber(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, '').substring(0, 16);
    const formattedValue = value.match(/.{1,4}/g)?.join(' ') ?? value;
    input.value = formattedValue;
    this.cardNumber = formattedValue;
  }

  formatCardExpiry(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, '').substring(0, 4);
    let formattedValue = value;
    if (value.length >= 2) {
      const month = parseInt(value.substring(0, 2), 10);
      if (month > 12 || month < 1) {
        this.isExpiryValid = false;
      } else {
        this.isExpiryValid = true;
        formattedValue = `${value.substring(0, 2)}/${value.substring(2, 4)}`;
      }
    }
    input.value = formattedValue;
    this.cardExpiry = input.value;
  }

  isAddMoneyFormValid(): boolean {
    return (
      this.amountToAdd > 0 &&
      this.cardNumber.length === 19 &&
      this.cardExpiry.length === 5 &&
      this.isExpiryValid &&
      this.cardCvv.length === 3
    );
  }
}
