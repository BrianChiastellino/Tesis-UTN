import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'user',
})
export class UserEliminated implements PipeTransform {

  transform(id: string): string {
    return id == null ? 'Eliminado' : id;
  }

}
