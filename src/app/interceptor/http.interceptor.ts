import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpClient,
} from '@angular/common/http';
import {
  Observable,
  throwError as observableThrowError,
  switchMap,
} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  public apiUrl = environment.API_URL;
  constructor(private router: Router, private http: HttpClient) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const modifiedReq = req.clone({
      withCredentials: true,
    });

    return next.handle(modifiedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return this.handle401Error(modifiedReq, next);
        }
        let errorMsg = `Error Code: ${error.status}, Message: ${error.message}`;
        console.error('Error intercepted:', errorMsg);
        this.handleErrorNavigation(error.status);
        return observableThrowError(() => new Error(errorMsg));
      })
    );
  }

  private handle401Error(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.http
      .post(
        `${this.apiUrl}/api/auth/refresh-token`,
        {},
        { withCredentials: true }
      )
      .pipe(
        switchMap(() => {
          return next.handle(
            req.clone({
              withCredentials: true,
            })
          );
        }),
        catchError((error: HttpErrorResponse) => {
          this.router.navigate(['/login']);
          return observableThrowError(() => new Error(error.message));
        })
      );
  }

  private handleErrorNavigation(status: number) {
    switch (status) {
      case 403:
        this.router.navigate(['/login']);
        break;
      case 404:
        this.router.navigate(['/not-found']);
        break;
      case 429:
        this.router.navigate(['/rate-limit-exceeded']);
        break;
      case 500:
        this.router.navigate(['/server-error']);
        break;
      default:
        this.router.navigate(['/not-found']);
        break;
    }
  }
}
