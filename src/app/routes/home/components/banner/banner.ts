import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  imports: [NgOptimizedImage],
  selector: 'app-banner',
  styles: ``,
  template: `
    <img class="pb-2" ngSrc="logo.svg" width="210" height="48" alt="Conduit" priority />
    <p class="text-light">
      This is the
      <a class="text-green-500 underline" href="https://github.com/realworld-apps/angular-realworld-example-app">Angular frontend</a>
      demo from the <a class="text-green-500 underline" href="https://github.com/realworld-apps/realworld">Realworld</a> project.
    </p>
    <p class="text-light">
      This demo is connected to a demo backend that enforces session isolation.
    </p>
  `,
  host: {
    class: 'flex items-center flex-col p-8 border-y-1 border-light border-solid',
  },
})
export class Banner {}
