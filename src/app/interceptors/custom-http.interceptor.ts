import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AppRoutes } from '../routing/route.model';


@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  constructor(private router: Router) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((errorRes: HttpErrorResponse) => {
        // Check error type -> URL, Offline, HTTP status.

        this.router.navigate([AppRoutes.Error], { state: { error: { ...errorRes.error } } });

        return throwError(`URL: ${req.url} :: Error : ${errorRes}`);
      })
    );
  }
}
