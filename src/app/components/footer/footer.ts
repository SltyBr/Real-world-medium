import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  imports: [NgOptimizedImage],
  selector: 'app-footer',
  styles: ``,
  template: `
    <a routerLink="/" class="w-17 shrink-0">
      <img ngSrc="logo.svg" width="68" height="15" alt="Conduit" priority>
    </a>
    <div class="text-xs text-light">
      © {{ currentYear }}. An interactive learning project from
      <a class="text-black hover:text-green-500 hover:underline" href="https://github.com/gothinkster/realworld">RealWorld OSS Project</a>
      . Code licensed under MIT.
    </div>
  `,
  host: {
    class: 'flex justify-center gap-2.5 items-center'
  }
})
export class Footer {
  currentYear = new Date().getFullYear();
}
