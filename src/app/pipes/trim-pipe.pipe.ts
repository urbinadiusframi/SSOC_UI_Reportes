import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trim',
})
export class TrimPipe implements PipeTransform {
  transform(value: string): string {
    if (value === '' || value === ' ' || !value) {
      return value;
    }

    return value.trim().replaceAll(/(?<=\s)\s+/g, '');
  }
}
