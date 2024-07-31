import { FormGroup, ValidationErrors, AbstractControl } from "@angular/forms";

export class CustomHelpers {

  /**
   * Devuelve los errores de validación para un campo específico en el formulario dado.
   * @param field - El nombre del campo del formulario.
   * @param form - El grupo de formulario en el que se encuentra el campo.
   * @returns Los errores de validación para el campo, o null si no hay errores.
   */
  static getFieldErrors(field: string, form: FormGroup): ValidationErrors | null {
    const control: AbstractControl | null = form.controls[field];
    return control ? control.errors : null;
  }

  static isValidField (field: string, form: FormGroup) : boolean {
    return form.get(field)!.invalid && form.get(field)!.touched;
  }

  static messageFieldFormEditOrRegister(field: string, form: FormGroup): string | null {
    const errors: ValidationErrors | null = CustomHelpers.getFieldErrors(field, form);

    if (!errors) return null;

    const errorMessages: { [key: string]: { [key: string]: string } } = {
      name: {
        required: 'Este campo es requerido',
        hasSymbols: 'Ingrese un nombre válido',
        hasNumbers: 'Ingrese un nombre válido',
      },
      email: {
        required: 'Este campo es requerido',
        pattern: 'El email no tiene un formato válido'
      },
      document: {
        required: 'Este campo es requerido',
        hasSymbols: 'Ingrese un documento válido',
        hasLetters: 'Ingrese un documento válido',
        minlength: 'Ingrese un documento válido',
        maxlength: 'Ingrese un documento válido'
      },
      username: {
        required: 'Este campo es requerido',
        minlength: `El usuario debe tener al menos ${errors['minlength']?.requiredLength} caracteres`,
      },
      password: {
        required: 'Este campo es requerido',
        minlength: `La contraseña debe tener al menos ${errors['minlength']?.requiredLength} caracteres`,
        pattern: 'La contraseña debe contener al menos una letra mayuscula, un número y un símbolo'
      }
    };

    const fieldErrors = errorMessages[field];

    if (!fieldErrors) return 'Campo inválido';

    for (const errorKey in errors) {
      if (fieldErrors[errorKey]) {
        return fieldErrors[errorKey];
      }
    }

    return 'Campo inválido';
  }
}
