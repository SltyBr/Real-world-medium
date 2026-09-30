import { JsonPipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  template: `
    <app-header />
    <router-outlet />
  `,
  styles: ``,
  host: {
    class: 'flex flex-col mx-auto xl:max-w-xl sm:max-w-sm md:max-w-md lg:max-w-lg'
  }
})
export class App {
  protected readonly title = signal('conduit');
  offset = signal(0);
  
  articles = httpResource(() => `https://api.realworld.show/api/articles?limit=10&offset=${this.offset()}`);
}
