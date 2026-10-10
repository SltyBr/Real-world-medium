import { NgOptimizedImage } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CONTAINER } from '../../tailwind-classes';
import { UserState } from 'src/app/shared/services/user-state';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ClientRender } from 'src/app/shared/directives/client.directive';

@Component({
  imports: [RouterLink, NgOptimizedImage, RouterLinkActive, MatProgressSpinnerModule, ClientRender],
  selector: 'app-header',
  styles: ``,
  template: `
    <a routerLink="/" class="flex min-h-[36px] shrink-0">
      <img ngSrc="logo.svg" width="88" height="20" alt="Conduit" priority>
    </a>
    <div *client-render class="flex items-center gap-4">
      <a routerLink="/" routerLinkActive="opacity-100" [routerLinkActiveOptions]="{ exact: true }" class="opacity-40 hover:opacity-100">Home</a>
      @if ($user()) {
        <a routerLink="editor" routerLinkActive="opacity-100" class="opacity-40 hover:opacity-100">New Article</a>
        <a routerLink="settings" routerLinkActive="opacity-100" class="opacity-40 hover:opacity-100">Settings</a>
        <a [routerLink]="['profile', $user()?.username]" routerLinkActive="opacity-100" class="opacity-40 hover:opacity-100">{{ $user()?.username }}</a>
      } @else {
        <a routerLink="sign-in" routerLinkActive="opacity-100" class="opacity-40 hover:opacity-100">Sign in</a>
        <a routerLink="sign-up" class="bg-green-500 text-white py-2 px-4 rounded-4xl transition-colors hover:bg-green-600">Sign up</a>
      }
    </div>
  `,
  host: {
    class: `${CONTAINER} flex w-full items-center justify-between items-center py-4 px-2`
  }
})
export class Header {
  $user = inject(UserState).$user;

  $username = computed(() => {
    return this.$user()?.username;
  })
}
