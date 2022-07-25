import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {

  transform(value: string): string {
    if (value === 'theme') {
      return 'tema'
    } 
    if (value === 'question') {
      return 'pregunta'
    }
    return value;
  }

}
