import { isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { Component, computed, inject, linkedSignal, PLATFORM_ID, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CONTAINER } from '../../tailwind-classes';
import { UserState } from 'src/app/shared/services/user-state';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  imports: [RouterLink, NgOptimizedImage, RouterLinkActive, MatProgressSpinnerModule],
  selector: 'app-header',
  styles: ``,
  template: `
    <a routerLink="/" class="w-22 shrink-0">
      <img ngSrc="logo.svg" width="88" height="20" alt="Conduit" priority>
    </a>
    <div class="flex items-center gap-4">
      <a routerLink="/" routerLinkActive="opacity-100" [routerLinkActiveOptions]="{ exact: true }" class="opacity-40 hover:opacity-100">Home</a>
      @if (isClient) {
        @if (isAuthorized()) {
          <a routerLink="editor" routerLinkActive="opacity-100" class="opacity-40 hover:opacity-100">New Article</a>
          <a routerLink="settings" routerLinkActive="opacity-100" class="opacity-40 hover:opacity-100">Settings</a>
          <a [routerLink]="['profile', this.$user()?.username]" routerLinkActive="opacity-100" class="opacity-40 hover:opacity-100">{{ this.$user()?.username }}</a>
        } @else {
          <a routerLink="sign-in" routerLinkActive="opacity-100" class="opacity-40 hover:opacity-100">Sign in</a>
          <a routerLink="sign-up" class="bg-green-500 text-white py-2 px-4 rounded-4xl transition-colors hover:bg-green-600">Sign up</a>
        }
      }
    </div>
  `,
  host: {
    class: `${CONTAINER} flex w-full items-center justify-between items-center py-4 px-2`
  }
})
export class Header {
  $user = inject(UserState).$user;
  isClient = isPlatformBrowser(inject(PLATFORM_ID))

  isAuthorized = linkedSignal({
    source: this.$user,
    computation: (source, prev) => {
      console.log('source ', source)
      console.log('prev ', source)
      return source ? source : false;
    }
  });

  $username = computed(() => {
    return this.$user()?.username;
  })
}
