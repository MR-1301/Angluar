import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

  transform(value: any, limit: number, extender: string) {
    if (value.length > limit + 3)
      return value.substr(0, limit) + extender;
    return value;
  }

}
