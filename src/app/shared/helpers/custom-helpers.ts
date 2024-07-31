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
}
