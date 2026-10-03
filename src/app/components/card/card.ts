import { DatePipe, NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { ArticleSchema } from '@api/models';

@Component({
  imports: [NgOptimizedImage, DatePipe],
  selector: 'app-card',
  styles: `
  `,
  template: `
    @let data = content();
    <div class="flex justify-between mb-4">
      <div class="flex items-center gap-2">
        <img ngSrc="avatar.svg" alt="avatar" width="32" height="32" class="rounded-4xl">
        <div>
          <p class="text-green-500">{{ data.author.username }}</p>
          {{ data.createdAt | date: 'MMMM d, y' }}
        </div>
      </div>
      <div class="
        border
        border-green-500
        rounded-2xl
        py-1
        px-2
        flex
        items-center
        self-start
        gap-0.5
        hover:bg-green-500
        text-green-500
        hover:text-white
        transition-colors
        cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="14" viewBox="0 0 48 48">
          <path fill="currentColor"
            d="M34 9c-4.2 0-7.9 2.1-10 5.4C21.9 11.1 18.2 9 14 9C7.4 9 2 14.4 2 21c0 11.9 22 24 22 24s22-12 22-24c0-6.6-5.4-12-12-12" />
        </svg>
        <span class="text-xs">{{ data.favoritesCount }}</span>
      </div>
    </div>
    <div class="text-2xl font-medium">{{ data.title }}</div>
    <div class="text-light mb-4">{{ data.description }}</div>
    <div class="flex justify-between">
      <a class="text-xs text-light">Read more...</a>
      <div class="flex gap-2 text-light text-[10px]">
        @for (tag of data.tagList; track $index) {
          <a class="border rounded-4xl px-2 cursor-pointer">{{ tag }}</a>
        }
      </div>
    </div>
  `,
  host: {
    class: 'block py-7.5 px-4 hover:bg-green-50'
  }
})
export class Card {
  content = input.required<ArticleSchema>()
}
