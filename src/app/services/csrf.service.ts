import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CsrfService {
  private apiUrl = environment.API_URL;
  private csrfTokenKey = 'csrfToken';
  private csrfToken = new BehaviorSubject<string>(
    this.localStorageService.getItem(this.csrfTokenKey) || ''
  );

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  fetchCsrfToken(): void {
    this.http
      .get<{ csrfToken: string }>(`${this.apiUrl}/api/csrf-token`, {
        withCredentials: true,
      })
      .subscribe({
        next: (response) => {
          this.csrfToken.next(response.csrfToken);
          this.localStorageService.setItem(
            this.csrfTokenKey,
            response.csrfToken
          );
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  getCsrfToken() {
    return this.csrfToken.asObservable();
  }
  clearCsrfToken() {
    this.localStorageService.removeItem(this.csrfTokenKey);
    this.csrfToken.next('');
  }
}
