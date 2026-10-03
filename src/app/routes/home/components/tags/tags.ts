import { Component, inject } from '@angular/core';
import { TagsResource } from '@api/resources';

@Component({
  imports: [],
  selector: 'app-tags',
  styles: ``,
  template: `
    <div class="border-l border-light px-4">
      <p class="text-lg mb-4">Popular tags</p>
      @if (tags.hasValue()) {
        <div class="flex flex-wrap gap-1.5">
          @for (tag of tags.value().tags; track $index) {
            <p class="border border-light rounded-4xl px-2 cursor-pointer">{{ tag }}</p>
          }
        </div>
      } @else if (tags.error()) {
        error with request popular tags <button (click)="tags.reload()">reload</button>
      } @else if (tags.isLoading()) {
        Loading...
      }
    </div>
  `,
})
export class Tags {
  tagResource = inject(TagsResource);
  tags = this.tagResource.getTagsApiTagsGet();
}
