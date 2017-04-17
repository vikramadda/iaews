import { AbstractControl, ValidatorFn } from '@angular/forms';

export class NumberValidators {

    static range(min: number, max: number): ValidatorFn {
        return (c: AbstractControl): { [key: string]: boolean } | null => {
            if (c.value && (isNaN(c.value) || c.value < min || c.value > max)) {
                return { 'range': true };
            }
            return null;
        };
    }
}

export class MyValidators {

    static passwordMatcher(c: AbstractControl): {[key: string]: boolean} | null {
        let passwordControl = c.get('password');
        let confirmControl = c.get('confirmPassword');

        if (passwordControl.pristine || confirmControl.pristine) {
          return null;
        }
        if (passwordControl.value === confirmControl.value) {
            return null;
        }
        return { 'match': true };
    }

}