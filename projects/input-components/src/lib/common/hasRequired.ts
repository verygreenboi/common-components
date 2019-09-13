/* tslint:disable:no-string-literal */
import { AbstractControl } from '@angular/forms';

export const hasRequiredField = (abstractControl: AbstractControl): boolean => {
  if (abstractControl.validator) {
    const validator = abstractControl.validator({}as AbstractControl);
    if (validator && validator.required) {
      return true;
    }
  }
  if (abstractControl['controls']) {
    for (const controlName in abstractControl['controls']) {
      // noinspection JSUnfilteredForInLoop
      if (abstractControl['controls'][controlName] && hasRequiredField(abstractControl['controls'][controlName])) {
        return true;
      }
    }
  }
  return false;
};
