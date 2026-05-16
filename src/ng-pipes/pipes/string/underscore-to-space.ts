import { Pipe, PipeTransform } from '@angular/core';
import { isString } from '../helpers/helpers';

@Pipe({ name: 'underscoreToSpace' })
export class UnderscoreToSpacePipe implements PipeTransform {
  transform(value: any): any {
    return isString(value) ? value.replace(/_/g, ' ') : value;
  }
}
