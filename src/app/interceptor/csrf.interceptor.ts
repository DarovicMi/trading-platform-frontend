import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { CsrfService } from '../services/csrf.service';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class CsrfInterceptor implements HttpInterceptor {
  constructor(
    private csrfService: CsrfService,
    private localStorageService: LocalStorageService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
      return this.csrfService.getCsrfToken().pipe(
        take(1),
        switchMap((csrfToken) => {
          console.log(csrfToken);
          const modifiedReq = req.clone({
            setHeaders: {
              'CSRF-TOKEN': csrfToken,
            },
            withCredentials: true,
          });
          return next.handle(modifiedReq);
        })
      );
    } else {
      return next.handle(req);
    }
  }
}
