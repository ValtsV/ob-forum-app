import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError } from 'rxjs';
import { StorageService } from '../service/storage.service';
import { AuthService } from '../service/auth.service';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private storageService: StorageService, private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      withCredentials: true
    });
    return next.handle(req);
  }

  //   const token = this.storageService.getToken();
  //   console.log('token: ' + token)
  //   if (token != null) {
  //     console.log('here')
  //     req = this.addTokenHeader(req, token);
  //   }
  
  //   return next.handle(req).pipe(catchError(error => {
  //     if (error instanceof HttpErrorResponse && !req.url.includes('auth/login') && error.status === 401) {
  //       return this.handle401Error(req, next);
  //     }
  //     return throwError(() => error);
  //   }));
  // }

  // private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
  //   if (!this.isRefreshing) {
  //     this.isRefreshing = true;
  //     this.refreshTokenSubject.next(null);
  //     const token = this.storageService.getRefreshToken();
  //     if (token)
  //       return this.authService.refreshToken(token).pipe(
  //         switchMap((token: any) => {
  //           this.isRefreshing = false;
  //           this.storageService.saveToken(token.accessToken);
  //           this.refreshTokenSubject.next(token.accessToken);
            
  //           return next.handle(this.addTokenHeader(request, token.accessToken));
  //         }),
  //         catchError((error) => {
  //           this.isRefreshing = false;
            
  //           this.storageService.logout();
  //           return throwError(() => error);
  //         })
  //       );
  //   }
  //   return this.refreshTokenSubject.pipe(
  //     filter(token => token !== null),
  //     take(1),
  //     switchMap((token) => next.handle(this.addTokenHeader(request, token)))
  //   );
  // }

  // private addTokenHeader(request: HttpRequest<any>, token: string) {
  //   return request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
  // }
}

