import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserValidators } from '../../utils/user.validators';
import { Router, RouterModule } from '@angular/router';
import { CsrfService } from '../../services/csrf.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'cc-login',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, RouterModule],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private csrfService: CsrfService,
    private localStorageService: LocalStorageService
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
          //  Validators.pattern(UserValidators.PASSWORD_PATTERN),
          Validators.minLength(UserValidators.PASSWORD_MIN_LENGTH),
          Validators.maxLength(UserValidators.PASSWORD_MAX_LENGTH),
        ],
      ],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: () => {
          this.csrfService.fetchCsrfToken();
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Login failed:', error);
        },
      });
    }
  }
}
