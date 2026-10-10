import { Directive, input } from '@angular/core';

function toBooleanProperty(value: any): boolean {
  return value != null && `${value}` !== 'false';
}

@Directive({
  selector: '[disabled]',
  host: {
    '[attr.disabled]': 'disabled() ? "" : null',
    '(click)': 'onClick($event)',
    '(dblclick)': 'onClick($event)'
  }
})
export class CanDisable {
  disabled = input<any, boolean>('false', {
    transform: toBooleanProperty
  });

  onClick(e: Event) {
    if (this.disabled()) {
      e.preventDefault();
      e.stopImmediatePropagation();
    }
  }
}
