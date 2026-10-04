import { afterNextRender, Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { LOCAL_STORAGE } from './shared/tokens/local-storage';
import { UserResource } from '@api/resources';
import { UserState } from './shared/services/user-state';
import { UserService } from '@api/services';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  template: `
    <!-- <app-header /> -->
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
  protected readonly $user = inject(UserState).$user;

  constructor() {
    // afterNextRender({
    //   read: () => {
    //     if (!!this.localStorage.getItem('jwtToken')) {
    //       this.user$.subscribe(({ user }) => {
    //         this.$user.set({
    //           username: user.username,
    //           email: user.email
    //         })
    //       })
    //     }
    //   }
    // })
  }
}
