import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'range',
  standalone: true,
})
export class RangePipe implements PipeTransform {
  transform(start = 1, count = 0, step = 1): any {
    return Array(count)
      .fill('')
      .map((v, i) => step * i + start);
  }
}
