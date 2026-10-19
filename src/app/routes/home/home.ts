import { Component, computed, inject } from '@angular/core';
import { Banner } from './components/banner/banner';
import { Feed } from './components/feed/feed';
import { UserState } from 'src/app/shared/services/user-state';

@Component({
  imports: [Banner, Feed],
  selector: 'app-home',
  template: `
    @if (isAuthorized() === null) {
      <app-banner class="mb-8"/>
    }
    
    <app-feed class="w-full"/>
  `,
  host: {
    class: 'flex flex-col'
  }
})
export class Home {
  $user = inject(UserState).$user;

  isAuthorized = computed(() => this.$user())
}
