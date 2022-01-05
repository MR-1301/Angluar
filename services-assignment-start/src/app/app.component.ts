import {Component} from '@angular/core';
import {UserService} from "./user.service";
import {CounterService} from "./counter.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private userService: UserService, private counterService: CounterService) {
  }

  onSetToActive(id: number) {
    this.userService.setToInactive(id);
  }
}
