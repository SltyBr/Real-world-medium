import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideConduitApiClient } from "./api/providers";
import { authInterceptor } from './shared/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(
      // withInterceptors([authInterceptor])
    ),
    provideRouter(routes),
    provideClientHydration(),
    provideConduitApiClient({
      basePath: 'https://api.realworld.show'
    }),
  ],
};
