import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AuthStore } from '../stores/AuthStore';

  export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authStore = inject(AuthStore)
    const authService = inject(AuthService);
    const router = inject(Router);
    const JWT = authStore.getJWT()
    let authRequest = req;
    if(JWT === null){
      return next(req)
    }

      authRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${JWT}`
      }
    })
    return next(authRequest).pipe(
      catchError((error: HttpErrorResponse): Observable<any> => {
        if (error.status === 401 || error.status === 419) {
          authService.logout();
          router.navigate(['/']);
        }
        return throwError(() => error)
      })
    );
  };
