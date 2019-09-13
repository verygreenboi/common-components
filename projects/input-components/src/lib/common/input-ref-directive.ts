import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: 'kobo-input input, kobo-input select'
})
export class InputRefDirective {
  focus = false;

  @HostListener('focus')
  onFocus() {
    this.focus = true;
  }

  @HostListener('blur')
  onBlur() {
    this.focus = false;
  }
}
