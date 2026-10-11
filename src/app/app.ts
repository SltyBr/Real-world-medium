import { afterNextRender, Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { LOCAL_STORAGE } from './shared/tokens/local-storage';
import { UserState } from './shared/services/user-state';
import { UserService } from '@api/services';
import { catchError, EMPTY, finalize } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  template: `
    <app-header />
    <router-outlet />
    <app-footer class="mt-8"/>
  `,
  styles: ``,
  host: {
    class: 'flex flex-col h-full',
  },
})
export class App {
  protected readonly title = signal('conduit');
  protected readonly localStorage = inject(LOCAL_STORAGE);
  protected readonly user$ = inject(UserService).getCurrentUserApiUserGet();
  protected readonly UserState = inject(UserState);

  constructor() {
    afterNextRender({
      read: () => {
        if (!!this.localStorage.getItem('jwtToken')) {
          this.UserState.$loading.set(true);
          this.user$.pipe(
            catchError(err => {
              const res = (err as HttpErrorResponse).error;
              if ('token' in res.errors) {
                this.localStorage.removeItem('jwtToken');
              }

              return EMPTY;
            }),
            finalize(() => this.UserState.$loading.set(false))
          ).subscribe(({ user }) => {
            this.UserState.$user.set({
              username: user.username,
              email: user.email
            });
          })
        }
      }
    })
  }
}
