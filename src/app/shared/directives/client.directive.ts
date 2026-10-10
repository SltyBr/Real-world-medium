import { isPlatformBrowser } from '@angular/common';
import { Directive, inject, PLATFORM_ID, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[client-render]',
})
export class ClientRender {
  vcr = inject(ViewContainerRef);
  templateRef = inject(TemplateRef);
  platformId = inject(PLATFORM_ID);
  isClient = isPlatformBrowser(this.platformId);

  constructor() {
    if (this.isClient) {
      this.vcr.clear();

      this.vcr.createEmbeddedView(this.templateRef);
    }
  }
}