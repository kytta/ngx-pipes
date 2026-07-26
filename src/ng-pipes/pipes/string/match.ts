import { Pipe, PipeTransform } from '@angular/core';
import { isString } from '../helpers/helpers';

@Pipe({
  name: 'match',
  standalone: true,
})
export class MatchPipe implements PipeTransform {
  transform(text: string, pattern: string | RegExp, flags?: string): RegExpMatchArray | null;
  transform<T>(text: T, pattern: string | RegExp, flags?: string): T;

  transform(text: any, pattern: string | RegExp, flags?: string): any {
    if (!isString(text)) {
      return text;
    }

    return text.match(new RegExp(pattern, flags));
  }
}
