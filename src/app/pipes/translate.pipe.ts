import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {

  // TODO: change to switch
  transform(value: string): string {
    if (value === 'theme') {
      return 'tema'
    } 
    if (value === 'question') {
      return 'pregunta'
    }
    if (value === 'course') {
      return 'curso'
    }
    if (value === 'answer') {
      return 'respuesta'
    }
    return value;
  }

}
