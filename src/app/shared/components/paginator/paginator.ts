import { NgClass } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';

@Component({
  imports: [NgClass],
  selector: 'app-paginator',
  styles: ``,
  template: `
    @for (item of [].constructor(pages()); track $index;) {
      @let i = $index + 1;
      <div
        class="rounded-2xl bg-stone-200 py-1 px-2"
        [ngClass]="{
          'bg-stone-200': active() === i
        }"
        (click)="selectedPage.emit(i)"
      >
        {{ i }}
      </div>
    }
  `,
  host: {
    class: 'flex gap-2'
  }
})
export class Paginator {
  count = input<number>(1);
  pageSize = input<number>(1);
  offset = input<number>(1);

  pages = computed(() => {
    return Math.ceil(this.count() / this.pageSize())
  });

  active = computed(() => {
    return Math.floor(this.offset() / this.pageSize()) + 1;
  });

  selectedPage = output<number>();
}
