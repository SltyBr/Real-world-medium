import { Component } from '@angular/core';
import { Banner } from './components/banner/banner';
import { Feed } from './components/feed/feed';

@Component({
  imports: [Banner, Feed],
  selector: 'app-home',
  template: `
    @if (!isAuthorized) {
      <app-banner class="mb-8"/>
    }
    
    <app-feed class="w-full"/>
  `,
  host: {
    class: 'flex flex-col'
  }
})
export class Home {
  isAuthorized = false;
}
