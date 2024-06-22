import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

@Component({
  standalone: true,
  imports: [ CommonModule, SharedModule ],
  selector: 'alone-landing',
  templateUrl: './landing.component.html',
})

export class LandingComponent {

}
