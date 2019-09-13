import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { hasRequiredField } from '@codehaven/input-components';

@Component({
  selector: 'kobo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'common-components';
  testForm: FormGroup;

  @ViewChild('phone', {static: false})
  phoneRef: ElementRef;

  get phoneControl(): FormControl {
    return this.testForm.controls.phone as FormControl;
  }

  constructor(fb: FormBuilder) {
    this.testForm = fb.group({
      phone: ['234']
    });
  }

  isRequired(control): boolean {
    return hasRequiredField(control);
  }

}
