import { Pipe, PipeTransform } from '@angular/core';
import { isString } from '../helpers/helpers';

@Pipe({
  name: 'test',
  standalone: true,
})
export class TestPipe implements PipeTransform {
  transform(text: string, pattern: string | RegExp, flags?: string): boolean;
  transform<T>(text: T, pattern: string | RegExp, flags?: string): T;

  transform(text: any, pattern: string | RegExp, flags?: string): any {
    if (!isString(text)) {
      return text;
    }

    return new RegExp(pattern, flags).test(text);
  }
}
