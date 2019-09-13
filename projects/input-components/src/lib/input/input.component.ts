import {
  AfterContentInit,
  Component,
  ContentChild,
  ContentChildren,
  HostBinding,
  Input, OnChanges,
  QueryList
} from '@angular/core';
import { InputRefDirective } from '../common/input-ref-directive';
import { HintRefDirective } from '../common/hint-ref-directive';
import { map } from 'rxjs/operators';

@Component({
  selector: 'kobo-input',
  templateUrl: './kobo-input.html',
  styleUrls: ['../common/input-core.scss']
})
export class InputComponent implements AfterContentInit, OnChanges {

  @Input()
  icon: string;

  @Input()
  direction: 'normal' | 'reverse' = 'normal';

  @ContentChild(InputRefDirective, { static: false })
  input: InputRefDirective;

  @ContentChildren(HintRefDirective)
  hint: QueryList<HintRefDirective>;

  hasError = false;

  constructor() {
  }

  ngAfterContentInit(): void {
    this.hint.changes.pipe(
      map((el: QueryList<HintRefDirective>) => el.filter(e => e.classes.contains('error')).length > 0)
    ).subscribe(
      hasError => this.hasError = hasError,
      err => console.error(err),
      () => console.log('Done')
    );
  }

  ngOnChanges(): void {
    if (this.hint) {
      this.hasError = this.hint.filter((el) => el.classes.contains('error')).length > 0;
    }
  }

  @HostBinding('class.input-focus')
  get isInputFocus(): boolean {
    return this.input ? this.input.focus : false;
  }

  @HostBinding('class.reverse')
  get reverse(): boolean {
    return this.direction === 'reverse';
  }

  @HostBinding('class.hasIcon')
  get hasIcon(): boolean {
    return !!this.icon;
  }

  @HostBinding('class.withError')
  get error(): boolean {
    return this.hasError;
  }

}
