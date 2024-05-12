import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const modifiedReq = req.clone({
      withCredentials: true,
      headers: req.headers.set('x_cg_demo_api_key', 'your-api-key-here'),
    });

    return next.handle(modifiedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
        console.error('Error intercepted:', errorMsg);

        switch (error.status) {
          case 401:
            this.router.navigate(['/login']);
            break;
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
        return observableThrowError(() => new Error(errorMsg));
      })
    );
  }
}
