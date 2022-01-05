import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'sortByName',
  pure: false
})


export class sortPipe implements PipeTransform {
  transform(value: any) {
    value.sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    })
    return value;
  }
}
