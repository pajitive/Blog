import { FormGroup } from '@angular/forms';

// tslint:disable-next-line: ban-types
export function MustMatch(controlName: any, matchingControlName: any) {
  return (formGroup: FormGroup) => {
    const Console = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors.MustMatch) {
      return;
    }
    if (Console.value !== matchingControl.value) {
      matchingControl.setErrors({ MustMatch: true});
    } else {
      matchingControl.setErrors(null);
    }
  };

}
