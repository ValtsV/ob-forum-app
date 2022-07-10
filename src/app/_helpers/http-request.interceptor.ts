import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, catchError, filter, Observable, retry, switchMap, take, throwError } from 'rxjs';
import { StorageService } from '../service/storage.service';
import { AuthService } from '../service/auth.service';


@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private hasRefreshed: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private storageService: StorageService, private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    req = req.clone({
      withCredentials: true
    });
    // return next.handle(req);

    

      return next.handle(req).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && !req.url.includes('auth/login') && error.status === 401) {
        return this.handle401Error(req, next);
      }
      if (error.status === 403) {
        this.storageService.logout();
        return throwError(() => error)
      }
      return throwError(() => error);  
      }));
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.hasRefreshed.next(null);

        return this.authService.refreshToken().pipe(
          switchMap((gotRefreshToken) => {
            this.isRefreshing = false;
            this.hasRefreshed.next(gotRefreshToken);
            return next.handle(request);
          }),
          catchError((error) => {
            this.isRefreshing = false;
            //  maybe auth service
            this.storageService.logout();
            return throwError(() => error);
          })
        );
    }
    return this.hasRefreshed.pipe(
      filter(value => value !== null),
      take(1),
      switchMap(() => next.handle(request)));
  }
}

