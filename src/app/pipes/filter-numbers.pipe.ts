import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterNumbers'
})
export class FilterNumbersPipe implements PipeTransform {

  transform(value: string): string {
    return value.replace(/\D/g,'') ;
  }

}
