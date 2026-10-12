import { Component, input } from '@angular/core';
import { FieldState } from '@angular/forms/signals';

@Component({
  imports: [],
  selector: 'app-error-messages',
  styles: ``,
  template: `
    @if (control().touched() && control().dirty() && control().invalid()) {
      @for (error of control().errors(); track error) {
        {{ error.message }} {{ $last ? '' : '; ' }}
      }
    }
  `,
  host: {
    class: 'flex flex-col leading-none absolute text-[10px] text-red-500'
  }
})
export class ErrorMessages<T> {
  control = input.required<FieldState<T>>();
}
