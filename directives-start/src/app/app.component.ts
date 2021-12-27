import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  numbers = [1, 2, 3, 4, 5];
  onlyOdd = false;

  value = 10;

  newOddArray() {
    if (this.onlyOdd)
      return this.numbers.filter(e => e % 2 === 1)
  }

  newEvenArray() {
    return this.numbers.filter(e => e % 2 === 0)
  }
}
