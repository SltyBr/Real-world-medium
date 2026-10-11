import { Component, input } from '@angular/core';
import { FieldTree } from '@angular/forms/signals';
import { ErrorMessages } from '../error-messages';

@Component({
  imports: [ErrorMessages],
  selector: 'app-input',
  styles: ``,
  template: `
    @let field = control();
    <label class="block w-full">
      <ng-content slot="[input-label]"/>
      <ng-content slot="[coInput]"/>
    </label>
    <app-error-messages [control]="field()" />
  `,
})
export class Input<T extends string | number> {
  control = input.required<FieldTree<string, T, "writable">>();
}
