import {
  AfterViewInit, ChangeDetectorRef,
  Directive,
  ElementRef,
  EmbeddedViewRef, EventEmitter,
  HostListener,
  Input,
  NgZone, OnInit, Output,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { InputComponent } from '../input/input.component';
import Popper from 'popper.js';
import { KoboInputServiceService } from '../service/kobo-input-service.service';
import { fromEvent, Subscription } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[koboFlag]'
})
export class FlagDirective implements OnInit, AfterViewInit {
  @Input() country: string;
  @Input() optionsRef: TemplateRef<any>;
  @Input() inputRef: TemplateRef<InputComponent>;
  @Input() id: string;
  @Output() closed = new EventEmitter();
  isOpen = false;
  private view: EmbeddedViewRef<any>;
  private popperRef: Popper;
  private width = 0;
  private subs: Subscription[] = [];

  constructor(
    private el: ElementRef,
    private vcr: ViewContainerRef,
    private zone: NgZone,
    private inputService: KoboInputServiceService,
    private cdr: ChangeDetectorRef
  ) {}

  @HostListener('click', ['$event'])
  onClick($event) {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.open();
    } else {
      this.vcr.clear();
    }
  }

  open() {
    this.view = this.vcr.createEmbeddedView(this.optionsRef);
    const dropdown = this.view.rootNodes[0];
    this.inputRef.elementRef.nativeElement.appendChild(dropdown);
    dropdown.style.width = `${this.width}px`;

    this.zone.runOutsideAngular(() => {
      this.popperRef = new Popper(this.inputRef.elementRef.nativeElement, dropdown, {
        removeOnDestroy: true,
        placement: 'bottom-start',
        modifiers: {
          offset: {
            offset: '0px, -47px',
            enabled: true
          },
          flip: {
            enabled: false
          }
        }
      });
    });
    this.handleClickOutside();
  }

  ngAfterViewInit(): void {
    this.width = this.inputRef.elementRef.nativeElement.offsetWidth;
  }

  ngOnInit(): void {
    this.subs.push(
      this.inputService.dismissSelectObservable.pipe(
        filter((id) => id === this.id)
      ).subscribe( val => this.close())
    );
  }

  private handleClickOutside() {
    fromEvent(document, 'click')
      .pipe(
        filter(({ target }) => {
          const origin = this.popperRef.reference as HTMLElement;
          return origin.contains(target as HTMLElement) === false;
        }),
        takeUntil(this.closed)
      )
      .subscribe(() => {
        this.close();
      });
  }

  private close() {
    this.isOpen = false;
    this.vcr.clear();
    this.cdr.detectChanges();
  }
}
