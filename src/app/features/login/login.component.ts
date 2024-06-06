import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserValidators } from '../../utils/user.validators';
import { Router, RouterModule } from '@angular/router';
import { CsrfService } from '../../services/csrf.service';
import { NotificationService } from '../../services/notification.service';
import { Validation } from '../../utils/constants/user-validation';
import { LoadingSpinnerComponent } from '../../components/shared/loading-spinner/loading-spinner.component';
import { ModalComponent } from '../../components/shared/modal/modal.component';
import { PasswordService } from '../../services/password.service';

@Component({
  selector: 'cc-login',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    LoadingSpinnerComponent,
    ModalComponent,
    FormsModule,
  ],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public loginForm: FormGroup;
  public requiredPassword = Validation.login.requiredPassword;
  public invalidPassword = Validation.login.invalidPassword;
  public invalidEmail = Validation.login.invalidEmail;
  public requiredEmail = Validation.login.requiredEmail;
  public successLogin = Validation.login.successLogin;
  public errorLogin = Validation.login.errorLogin;
  public minLength = Validation.common.minLength(3);
  public maxLength = Validation.common.minLength(255);
  public loading: boolean = false;
  public isFormSubmitted: boolean = false;
  public isForgotPasswordOpen = false;
  public forgotPasswordEmail: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private csrfService: CsrfService,
    private notificationService: NotificationService,
    private passwordService: PasswordService
  ) {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.email,
          Validators.required,
          Validators.minLength(UserValidators.EMAIL_MIN_LENGTH),
          Validators.maxLength(UserValidators.EMAIL_MAX_LENGTH),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(UserValidators.PASSWORD_MIN_LENGTH),
          Validators.maxLength(UserValidators.PASSWORD_MAX_LENGTH),
        ],
      ],
    });
  }

  onSubmit() {
    this.loading = true;
    setTimeout(() => {
      if (this.loginForm.valid) {
        this.isFormSubmitted = true;
        const { email, password } = this.loginForm.value;
        this.authService.login(email, password).subscribe({
          next: () => {
            this.loading = false;
            this.notificationService.success(this.successLogin);
            this.csrfService.fetchCsrfToken();
            this.router.navigate(['/dashboard']);
          },
          error: () => {
            this.loading = false;
            this.notificationService.error(this.errorLogin, 5000);
          },
        });
      }
    }, 2000);
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  openForgotPasswordModal() {
    this.isForgotPasswordOpen = true;
  }
  closeForgotPasswordModal() {
    this.isForgotPasswordOpen = false;
  }

  submitForgotPassword() {
    this.passwordService
      .initiatePasswordReset(this.forgotPasswordEmail)
      .subscribe({
        next: (response: any) => {
          this.closeForgotPasswordModal();
          this.notificationService.success(response.message, 5000);
        },
        error: () => {
          this.closeForgotPasswordModal();
          this.notificationService.error(Validation.email.errorPasswordReset);
        },
      });
  }
}
