import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  private apiUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  changePassword(currentPassword: string, newPassword: string) {
    return this.http.post<{ message: string }>(
      `${this.apiUrl}/api/change-password`,
      {
        currentPassword,
        newPassword,
      }
    );
  }
  initiatePasswordReset(email: string) {
    return this.http.post(`${this.apiUrl}/api/password-reset-initiate`, {
      email,
    });
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    const params = new HttpParams().set('token', token);
    return this.http.post(
      `${this.apiUrl}/api/password-reset`,
      {
        newPassword,
      },
      { params }
    );
  }
}
