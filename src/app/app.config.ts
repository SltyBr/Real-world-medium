import { ApplicationConfig, inject, PLATFORM_ID, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideConduitApiClient } from "./api/providers";
import { authInterceptor } from './shared/interceptors/auth.interceptor';
import { firstValueFrom, tap } from 'rxjs';
import { UserService } from '@api/services';
import { UserState } from './shared/services/user-state';
import { isPlatformBrowser } from '@angular/common';
import { LOCAL_STORAGE } from './shared/tokens/local-storage';
import { provideSignalFormsConfig } from '@angular/forms/signals';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(() => {
      const platformId = inject(PLATFORM_ID);
      if (!isPlatformBrowser(platformId)) {
        return;
      }

      const token = inject(LOCAL_STORAGE).getItem('jwtToken') ?? '';

      if (!token) {
        return;
      }

      const userService = inject(UserService);
      const userState = inject(UserState);

      return firstValueFrom(userService.getCurrentUserApiUserGet().pipe(
        tap(({ user }) => {
          userState.$user.set(user);
        })
      ));
    }),
    provideSignalFormsConfig({
      classes: {
        'invalid-control': ({ state }) => state().touched() && state().invalid() && state().dirty(),
        'disabled:opacity-20': ({ state }) => state().disabled(),
        'valid-control': ({ state }) => !state().dirty() || state().valid(),
      }
    }),
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    provideRouter(routes),
    provideClientHydration(),
    provideConduitApiClient({
      basePath: 'https://api.realworld.show'
    }),
  ],
};
