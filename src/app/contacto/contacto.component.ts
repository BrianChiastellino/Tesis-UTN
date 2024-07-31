import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CustomValidators } from '../shared/validators/custom-validators';
import { ToastService } from '../shared/services/toast.service';
import { CustomHelpers } from '../shared/helpers/custom-helpers';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [SharedModule, MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})


export class ContactComponent implements OnInit {

  public contactForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, CustomValidators.noNumbers(), CustomValidators.noSymbols()]],
    email: ['', [Validators.required, Validators.pattern(CustomValidators.emailPattern)]],
    subject: ['', Validators.required],
    message: ['', Validators.required]
  });;

  constructor(private fb: FormBuilder, private toastService: ToastService) {}

  public ngOnInit(): void {}

  public onSubmit(): void {
    if (this.contactForm.valid) {
      this.toastService.showSuccess('Éxito', 'Email enviado con exito')
      this.contactForm.reset();
    }
  }

  public navigateToLinkedIn(): void {
    window.open('https://www.linkedin.com/in/brian-chiastellino/', '_blank');
  }

  public navigateToGitHub(): void {
    window.open('https://github.com/BrianChiastellino/Tesis-UTN', '_blank');
  }

  public isValidField ( field: string ) : boolean {
    return CustomHelpers.isValidField( field, this.contactForm );
  }

  public messageFieldError ( field: string ) : string | null{

    return CustomHelpers.messageFieldFormEditOrRegister( field, this.contactForm)

    // const errors: ValidationErrors | null = CustomHelpers.getFieldErrors(field, this.contactForm);

    // if (errors) {
    //   for (const key of Object.keys(errors)) {
    //     switch (key) {

    //       case 'required':
    //         return 'Este campo es requerido';

    //       case 'pattern':
    //         return 'Ingrese un mail valido';

    //       case 'hasNumbers':
    //         return 'Nombre invalido';

    //       case 'hasSymbols':
    //         return 'Nombre invalido';
    //     }
    //   }
    // }

    // return null;

  }

}
