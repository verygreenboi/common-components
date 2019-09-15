import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { hasRequiredField } from '@codehaven/input-components';
import { Dummy } from './custom-decorators';

@Dummy
@Component({
  selector: 'kobo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'common-components';
  testForm: FormGroup;
  defaultCountry = 'ng';

  get phoneControl(): FormControl {
    return this.testForm.controls.phone as FormControl;
  }

  constructor(fb: FormBuilder) {
    this.testForm = fb.group({
      phone: ['234', Validators.required]
    });

    this.phoneControl.valueChanges.subscribe((val) => console.log(val));
  }

  isRequired(control): boolean {
    return hasRequiredField(control);
  }

  ngOnInit(): void {
    console.log(this);
  }

}
