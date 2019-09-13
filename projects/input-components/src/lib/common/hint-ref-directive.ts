import { Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[koboHint]'
})
export class HintRefDirective {
  constructor(private el: ElementRef) {
  }

  get classes() {
    return this.el.nativeElement.classList;
  }
}
