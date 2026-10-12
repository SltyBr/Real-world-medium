import { NgClass } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormRoot, FormField, schema, required, form, FieldState } from '@angular/forms/signals';
import { NewArticleBody } from '@api/models';
import { ArticlesService } from '@api/services';
import { Input } from 'src/app/shared/components/input/input';
import { CanDisable } from 'src/app/shared/directives/disabled';
import { CONTAINER } from 'src/app/tailwind-classes';

type ArticleWithoutTagList = Omit<NewArticleBody, 'tagList'>

type IArticle = {
  [K in keyof ArticleWithoutTagList]-?: NonNullable<ArticleWithoutTagList[K]> 
}


const INITIAL_DATA: IArticle & { tagList: string } = {
  title: '',
  description: '',
  body: '',
  tagList: '',
};

const articleSchema = schema<IArticle & { tagList: string }>(fieldPath => {
  required(fieldPath.title, { message: 'title required' });
  required(fieldPath.description, { message: 'description required' });
  required(fieldPath.body, { message: 'content required' });
});

@Component({
  imports: [CanDisable, FormRoot, Input, FormField, NgClass],
  selector: 'app-editor',
  template: `
    <form [formRoot]="articleForm" class="flex flex-col gap-3" (submit)="onSubmit($event)">
      <app-input [control]="articleForm.title">
        <input
          coInput
          placeholder="Article Title"
          class="w-full text-xl px-3 py-2 border border-light rounded-xl focus:outline-2 focus:outline-green-500"
          [formField]="articleForm.title"
          [ngClass]="{
            'focus:outline-2 focus:outline-red-500 border-red-500': canCheck(articleForm.title)
          }" />
      </app-input>
      <app-input [control]="articleForm.description">
        <input
          coInput
          placeholder="What's this article about"
          class="w-full text-base px-3 py-2 border border-light rounded-xl focus:outline-2 focus:outline-green-500"
          [formField]="articleForm.description"
          [ngClass]="{
            'focus:outline-2 focus:outline-red-500 border-red-500': canCheck(articleForm.description)
          }"
        />
      </app-input>
      <app-input [control]="articleForm.body">
        <textarea
          coInput
          placeholder="White your article (in markdown)"
          rows="10"
          class="w-full text-base px-3 py-2 border border-light rounded-xl focus:outline-2 focus:outline-green-500"
          [formField]="articleForm.body"
          [ngClass]="{
            'focus:outline-2 focus:outline-red-500 border-red-500': canCheck(articleForm.body)
          }"
        ></textarea>
      </app-input>
      <input
        placeholder="Enter tags"
        (keyup.enter)="addTag($event)"
        class="w-full text-base px-3 py-2 border border-light rounded-xl focus:outline-2 focus:outline-green-500"
        [formField]="articleForm.tagList"
        [ngClass]="{
          'focus:outline-2 focus:outline-red-500 border-red-500': canCheck(articleForm.tagList)
        }"
      />
      <div class="flex gap-2">
        @for (tag of tags(); track $index) {
          <span class="relative border rounded-4xl border-light py-1 pl-1 pr-4">
            {{ tag }}
            <span (click)="deleteTag($index)" class="cursor-pointer absolute top-[0] text-green-500">x</span>
          </span>
        }
      </div>

      <div class="text-end">
        <button
          canDisable
          [disabled]="articleForm().submitting() || articleForm().invalid()"
          class="disabled:opacity-20 w-fit py-2 px-4 bg-green-500 rounded-xl text-white enabled:hover:bg-green-600 enabled:cursor-pointer text-xl"
          type="submit"
        >
          Publish Article
        </button>
      </div>
    </form>
  `,
  host: {
    class: `${CONTAINER} mt-8 w-[60%] max-md:w-full`
  }
})
export class Editor {
  articleService = inject(ArticlesService);
  articleModel = signal<IArticle & { tagList: string }>(INITIAL_DATA);
  articleForm = form(this.articleModel, articleSchema, {
    submission: {
      action: async () => {
        try {
          const credentials = this.articleModel();
          // const v = await firstValueFrom(this.articleService.createArticleApiArticlesPost({ article: credentials }));
        } catch (err) {
          // TODO
        }
      }
    }
  });
  tags = signal<string[]>([]);

  canCheck = (state: () => FieldState<string, string>) => computed(() => {
    const control = state();

    return control.touched() && control.invalid() && control.dirty();
  })

  onSubmit(event: SubmitEvent) {
    event.preventDefault();
  }

  addTag(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    const tag = this.articleForm.tagList().value();
    this.tags.update((v) => ([...v, tag]));
    this.articleForm.tagList().reset('');
  }

  deleteTag(index: number): void {
    const tags = this.tags();
    tags.splice(index, 1);
    this.tags.set(tags);
  }
}
