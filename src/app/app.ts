import { httpResource } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';

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
    class: 'flex flex-col',
  },
})
export class App {
  protected readonly title = signal('conduit');
}
