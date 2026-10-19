import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { UserState } from './shared/services/user-state';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  template: `
    <app-header [user]="UserState.$user()"/>
    <router-outlet />
    <app-footer class="mt-8"/>
  `,
  styles: ``,
  host: {
    class: 'flex flex-col h-full',
  },
})
export class App {
  protected readonly UserState = inject(UserState);
}
