import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'filterStatus',
  pure: false
})
export class FilterStatusPipe implements PipeTransform {
  transform(value: any, match: string, propName: string) {
    if (!match.length)
      return value;
    console.log(match)
    return value.filter(x =>
      match === x[propName]
    )

  }


}
