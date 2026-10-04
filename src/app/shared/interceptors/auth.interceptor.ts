import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LOCAL_STORAGE } from '../tokens/local-storage';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(LOCAL_STORAGE).getItem('jwtToken') ?? '';
  console.log(token)
  req = req.clone({
    setHeaders: {
      Authorization: token ? `Token ${token}` : ''
    }
  });

  return next(req);
}