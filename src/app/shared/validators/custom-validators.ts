import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';



export class CustomValidators {

  static emailPattern: string = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$';


  // Validador para asegurar que el nombre no contenga números
  static noNumbers(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const hasNumbers = /\d/.test(value);
      return hasNumbers ? { hasNumbers: true } : null;
    };
  }

  // Validador para asegurar que el documento solo contenga números
  static onlyNumbers(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const hasLetters = /[a-zA-Z]/.test(value);
      return hasLetters ? { hasLetters: true } : null;
    };
  }
}
