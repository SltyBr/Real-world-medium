import { Component, inject, signal } from '@angular/core';
import { CONTAINER } from '../../../../tailwind-classes';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ArticlesResource } from '@api/resources';
import { withPreviousValue } from '../../../../shared/resources/utils';
import { Card } from 'src/app/components/card/card';
import { Tags } from '../tags/tags';

@Component({
  imports: [MatTabsModule, MatProgressSpinnerModule, Card, Tags],
  selector: 'app-feed',
  template: `
    <mat-tab-group class="md:col-span-9" animationDuration="0ms" mat-stretch-tabs="false" mat-align-tabs="start">

      @if (isAuthorized) {
        <mat-tab label="Your Feed">
        </mat-tab>
      }
      <mat-tab label="Global Feed">
        @if (articles.isLoading()) {
          loading...
        }

        @if (articles.error()) {
          error with request
        }

        @if (articles.hasValue()) {
          @for (article of articles.value().articles; track article.slug) {
            <app-card [content]="article" />
          }
        }
      </mat-tab>
    </mat-tab-group>
    <app-tags class="md:col-span-3"/>
  `,
  styles: `
    ::ng-deep mat-tab-group {
      width: 100% !important;
    }
  `,
  host: {
    class: `${CONTAINER} grid md:grid-cols-12 gap-4`
  },
})
export class Feed {
  isAuthorized = false;
  offset = signal(0);

  articleResource = inject(ArticlesResource);
  limit = signal(10);

  articles = withPreviousValue(this.articleResource.listArticlesApiArticlesGet(this.limit(), this.offset()));
}
