import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../entities/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private signupUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  signup(user: User): Observable<any> {
    return this.http.post(`${this.signupUrl}/api/users/signUp`, user);
  }
}
