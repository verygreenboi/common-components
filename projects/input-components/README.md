# Kobo Inputs

[![Actions Status](https://github.com/verygreenboi/common-components/workflows/Build%20Common%20Components%20Library/badge.svg)](https://github.com/verygreenboi/common-components/actions)

This library abstracts some of the most repetitive chores while building form elements.

### Demo

[See demo](https://stackblitz.com/edit/angular-qjw4sx)

### Installation
```npm install @codehaven/kobo-inputs --save```

This library uses Angular Material Components so be sure to [install](https://material.angular.io/guide/getting-started) that before use. If you want to display icons in your form fields, you have to include the material icons css (typically in your index.html file).

```
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```
 
 ## Use
 
 ```
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { hasRequiredField } from '@codehaven/input-components';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KoboInputModule } from '@codehaven/input-components';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    KoboInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

@Component({
  template: `
    <kobo-input [formGroup]="testForm" direction="reverse" icon="waves">
      <label for="email">Email <span *ngIf="isRequired(emailControl)">*</span></label>
      <input formControlName="email" id="email" type="email" placeholder="eg. me@gmail.com">
      <span class="hint" koboHint>Only valid emails</span>
      <span *ngIf="emailControl.invalid && emailControl.touched" class="error" koboHint>Email is not valid</span>
    </kobo-input>
  `,
  styles: `
    kobo-input label span {
        color: red;
    }
  `
})
export class AppComponent {
  testForm: FormGroup;

  get emailControl(): FormControl {
    return this.testForm.controls.email as FormControl;
  }

  constructor(fb: FormBuilder) {
    this.testForm = fb.group({
      email: ['', Validators.compose([Validators.email, Validators.required])]
    });
  }

  isRequired(control): boolean {
    return hasRequiredField(control);
  }
}
```
