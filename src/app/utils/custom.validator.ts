import { AbstractControl } from '@angular/forms';
import { ValidationErrors } from '@angular/forms';

export class CustomValidator {
  static validCountry(
    phoneNumbers: { text: string; code: string; country: string }[]
  ) {
    return (control: AbstractControl): ValidationErrors | null => {
      const isValid = phoneNumbers.some(
        (country) => country.text.toLowerCase() === control.value.toLowerCase()
      );
      return isValid ? null : { invalidCountry: true };
    };
  }
}
