import { NgOptimizedImage } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  imports: [RouterLink, NgOptimizedImage, RouterLinkActive],
  selector: 'app-header',
  styles: ``,
  template: `
    <a routerLink="/" class="w-22">
      <img ngSrc="logo.svg" width="88" height="20" alt="Conduit" priority>
    </a>
    <div class="flex items-center gap-4">
      <a routerLink="/" routerLinkActive="opacity-100" class="opacity-40 hover:opacity-100">Home</a>
      @if (isAuthorized) {
        <a routerLink="editor" routerLinkActive="opacity-100" class="opacity-40 hover:opacity-100">New Article</a>
        <a routerLink="settings" routerLinkActive="opacity-100" class="opacity-40 hover:opacity-100">Settings</a>
        <a [routerLink]="['profile', userName()]" routerLinkActive="opacity-100" class="opacity-40 hover:opacity-100">{{ userName() }}</a>
      } @else {
        <a routerLink="login" routerLinkActive="opacity-100" class="opacity-40 hover:opacity-100">Sign in</a>
        <a routerLink="register" class="bg-green-500 text-white py-2.5 px-6 rounded-4xl">Sign up</a>
      }
    </div>
  `,
  host: {
    class: 'flex w-full items-center justify-between items-center py-4 px-2'
  }
})
export class Header {
  isAuthorized = true;
  userName = signal('UserName');
}
