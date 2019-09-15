import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { KoboInputServiceService } from '../service/kobo-input-service.service';
import { SPECIAL_CHARACTERS } from '../common/mask-utils';
import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';

@Component({
  selector: 'kobo-phone-number',
  templateUrl: './phone-number.component.html',
  styleUrls: ['../common/input-core.scss', './phone-number.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneNumberComponent),
      multi: true
    }
  ]
})
export class PhoneNumberComponent implements OnInit, ControlValueAccessor, OnDestroy {

  @Input() country: string;
  @Input() mask: string;
  @Input() icon: string;
  @Input() hasError = false;
  @Input() direction: 'reverse' | 'normal' = 'normal';
  @Input() value = '';
  @Input() hint: string;

  private util = PhoneNumberUtil.getInstance();


  disabled = false;
  // tslint:disable:ban-types
  private onChange: Function;
  private onTouched: Function;
  private subs: Subscription[] = [];
  countrySelectorId = 'kobo-phone-number-selector-' + Date.now();

  constructor(private inputService: KoboInputServiceService) {
  }

  ngOnInit() {
    this.value = '';
    this.onChange = (_: any) => {
    };
    this.onTouched = () => {
    };
  }

  keyUp(event) {
    let value = event.target.value;
    if (value && this.cleanNumber(value).length > 1) {
      value = this.formatNumber(this.cleanNumber(value));
      this.doChange(value);
    }
  }

  onClick(country: string, phoneNumber?: string) {
    this.country = country;
    this.inputService.dismissSelect(this.countrySelectorId);
    let value = this.cleanNumber(phoneNumber);
    if (value && value.length > 1) {
      value = this.formatNumber(this.cleanNumber(value));
      this.doChange(value);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(val: any): void {
    this.value = val;
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  private cleanNumber(value) {
    SPECIAL_CHARACTERS.forEach((el) => value = value.replace(el, ''));
    [' ', '_'].forEach((el) => value = value.split(el).filter(el2 => el2 !== el).join(''));
    return value;
  }

  private doChange(value: string) {
    this.onChange(value);
    this.onTouched();
  }

  private formatNumber(value: string) {
    try {
      if (value.length > 1) {
        const phoneNumber = this.util.parseAndKeepRawInput(value, this.country);
        if (this.util.isPossibleNumber(phoneNumber)) {
          value = this.util.format(phoneNumber, PhoneNumberFormat.E164);
          this.hasError = false;
        } else {
          value = undefined;
          this.hasError = true;
        }
      }
    } catch (e) {
      value = undefined;
    }
    return value;
  }

}
