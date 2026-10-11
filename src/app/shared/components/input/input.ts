import { Component, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { FieldTree, FormField } from '@angular/forms/signals';
import { ErrorMessages } from '../error-messages';

@Component({
  imports: [ErrorMessages, NgClass, FormField],
  selector: 'app-input',
  styles: ``,
  template: `
    @let field = control();
    <label class="block w-full">
      <ng-content />
      <input
        [type]="type()"
        [placeholder]="placeholder()"
        class="w-full text-xl px-3 py-2 border border-light rounded-xl focus:outline-2 focus:outline-green-500"
        [formField]="field"
        [ngClass]="{
          'focus:outline-2 focus:outline-red-500 border-red-500': field().touched() && field().invalid() && field().dirty()
        }" />
    </label>
    <app-error-messages [control]="field()" />
  `,
})
export class Input<T extends string | number> {
  control = input.required<FieldTree<string, T, "writable">>();
  type = input('input');
  placeholder = input('');
}
