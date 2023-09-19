import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'encodingPipe',
})
export class EncodingPipe implements PipeTransform {
  transform(filenetId: string): string {
    return encodeURIComponent(filenetId);
  }
}
