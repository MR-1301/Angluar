import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  username: string = '';

  isClickable() {
    return this.username.length > 0;
  }

  resetUsername() {
    this.username = ""
  }
}
