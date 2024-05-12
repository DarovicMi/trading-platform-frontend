import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private signupUrl = environment.API_URL;
  constructor(private http: HttpClient) {}

  activateAccount(token: string) {
    const params = new HttpParams().set('token', token);
    return this.http.get(`${this.signupUrl}/api/email/activate`, { params });
  }

  reissueActivationToken(email: string) {
    return this.http.post(
      `${this.signupUrl}/api/email/reissue-activation-token`,
      { email }
    );
  }
}
