import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UserValidators } from '../../utils/user.validators';
import { phoneNumbers } from '../../utils/phone.numbers';
import { CustomValidator } from '../../utils/custom.validator';
import { UserService } from '../../services/user.service';
import { User } from '../../entities/User';
import { HttpClientModule } from '@angular/common/http';
import { LocalStorageService } from '../../services/local-storage.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'cc-sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule],
  providers: [UserService, LocalStorageService],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  public signupForm: FormGroup;
  public hide: boolean = true;
  public isSubmitting = false;
  public isFormSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private localStorageService: LocalStorageService
  ) {
    this.signupForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(UserValidators.USERNAME_MIN_LENGTH),
          Validators.maxLength(UserValidators.USERNAME_MAX_LENGTH),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
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
          Validators.pattern(UserValidators.PASSWORD_PATTERN),
        ],
      ],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      country: [
        '',
        [Validators.required, CustomValidator.validCountry(phoneNumbers)],
        ,
      ],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(UserValidators.PHONE_PATTERN)],
      ],
      termsAndConditions: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.signupForm.get('country')?.valueChanges.subscribe((countryName) => {
      const matchedCountry = phoneNumbers.find(
        (country) => country.text === countryName
      );
      if (matchedCountry) {
        this.signupForm
          .get('phoneNumber')
          ?.setValue(matchedCountry.code, { emitEvent: false });
      }
    });
  }

  onFocusPhoneNumber() {
    const countryName = this.signupForm.value.country;
    const matchedCountry = phoneNumbers.find(
      (country) => country.text === countryName
    );
    if (
      matchedCountry &&
      !this.signupForm.value.phoneNumber.startsWith(matchedCountry.code)
    ) {
      this.signupForm.get('phoneNumber')?.setValue(matchedCountry.code);
    }
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.isSubmitting = true;
      const {
        username,
        email,
        firstName,
        lastName,
        country,
        phoneNumber,
        password,
      } = this.signupForm.value;

      const newUser = new User(
        username,
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
        country
      );

      setTimeout(() => {
        this.userService.signup(newUser).subscribe({
          next: () => {
            this.isFormSubmitted = true;
            this.isSubmitting = false;
            this.localStorageService.setItem('userEmail', email);
            this.resetForm();
          },
          error: (error) => {
            console.error('Signup failed:', error);
            this.isSubmitting = false;
          },
        });
      }, 2000);
    }
  }

  resetForm() {
    this.signupForm.reset();
    this.signupForm.reset({
      phoneNumber: '',
    });
  }

  toggleHide() {
    this.hide = !this.hide;
  }
}
