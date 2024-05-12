import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, map, tap, BehaviorSubject, catchError } from 'rxjs';
import { Router } from '@angular/router';
import { CsrfService } from './csrf.service';
import { User } from '../entities/User';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.API_URL;
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private router: Router,
    private csrfService: CsrfService
  ) {
    this.checkInitialLoginStatus();
  }

  private checkInitialLoginStatus(): void {
    this.isUserLoggedIn().subscribe((isLoggedIn) => {
      this.loggedIn.next(isLoggedIn);
    });
  }

  getLoggedInStatus(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  login(email: string, password: string) {
    return this.http
      .post(
        `${this.apiUrl}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      )
      .pipe(
        tap((_) => this.loggedIn.next(true)),
        catchError((error) => {
          throw 'Failed to log in: ' + error;
        })
      );
  }

  logout(): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/api/auth/logout`, {}, { withCredentials: true })
      .pipe(
        tap((_) => {
          this.loggedIn.next(false);
          this.router.navigate(['/login']);
          this.csrfService.clearCsrfToken();
        }),
        catchError((error) => {
          throw 'Failed to log out: ' + error;
        })
      );
  }

  getCurrentLoggedInUserName() {
    return this.http
      .get<User>(`${this.apiUrl}/api/auth/me`, {
        withCredentials: true,
      })
      .pipe(map((user) => user.firstName + ' ' + user.lastName));
  }

  isUserLoggedIn(): Observable<boolean> {
    return this.http
      .get<{ loggedIn: boolean }>(`${this.apiUrl}/api/auth/loggedin`, {
        withCredentials: true,
      })
      .pipe(
        map((response) => response.loggedIn),
        tap((loggedIn) => this.loggedIn.next(loggedIn)),
        catchError((error) => {
          throw 'Failed to determine login status: ' + error;
        })
      );
  }
}
