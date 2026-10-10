import { Directive, HostBinding, HostListener, Input } from '@angular/core';

export function toBooleanProperty(value: any): boolean {
  return value != null && `${value}` !== 'false';
}

@Directive({
  selector: '[dfCanDisable]',
})
export class CanDisable {
  @Input()
  set disabled(value: any) {
    this.#disabled = toBooleanProperty(value);
  }
  get disabled(): boolean {
    return this.#disabled;
  }
  #disabled = false;

  @HostBinding('attr.disabled')
  protected get nativeDisabled(): '' | null {
    return this.disabled ? '' : null;
  }

  @HostListener('click', ['$event'])
  @HostListener('dblclick', ['$event'])
  onClick(e: Event) {
    if (this.disabled) {
      e.preventDefault();
      e.stopImmediatePropagation();
    }
  }
}
