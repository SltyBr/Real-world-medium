import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LOCAL_STORAGE } from '../tokens/local-storage';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(LOCAL_STORAGE).getItem('jwtToken') ?? '';

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Token ${token}`
      }
    });
  }

  return next(req);
}