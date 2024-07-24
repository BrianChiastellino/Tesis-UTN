import { Pipe, type PipeTransform } from '@angular/core';
import { User } from "../../auth/models/user.model";



@Pipe({
  name: 'userType'
})

export class UserType implements PipeTransform {
  transform (admin: boolean): string {
    return admin ? 'Si' : 'No';
  }
}
