import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'reverseString',
  pure: false
})
export class ReversePipe implements PipeTransform {
  transform(value: string) {
    let reversed: any = value.split('');
    reversed.reverse();
    reversed = reversed.join('');
    return reversed;
  }

}
