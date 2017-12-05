import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'placeHolder',
})
export class PlaceHolderPipe implements PipeTransform {

  transform(value: string, defatul: string = "Create New Post") {
    return (value) ? value : defatul;
  }
}
