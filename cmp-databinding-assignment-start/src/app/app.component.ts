import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {
  totalNumber: number[] = [];

  addNewComponenet(eventData: { num: number }) {
    this.totalNumber.push(eventData.num);
  }
}
