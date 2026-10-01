import { Component } from '@angular/core';
import { Banner } from './components/banner/banner';

@Component({
  imports: [Banner],
  selector: 'app-home',
  styles: ``,
  template: `
    @if (!isAuthorized) {
      <app-banner />
    }
    
  `,
})
export class Home {
  isAuthorized = false;
}
