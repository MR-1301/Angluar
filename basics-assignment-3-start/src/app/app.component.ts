import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // styleUrls: ['./app.component.css']
  styles: [`
    .whiteText {
      color: white;
    }
  `]
})

export class AppComponent {
  displayStatus = false;

  clickRecords = [];

  changeDisplayStatus() {
    this.displayStatus = !this.displayStatus;
    this.clickRecords.push(new Date())
  }

  getColor(recordIndex) {
    if (recordIndex >= 5) {
      return 'blue';
    }
  }
}
