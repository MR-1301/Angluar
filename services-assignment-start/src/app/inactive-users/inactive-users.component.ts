import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {UserService} from "../user.service";

@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.css']
})
export class InactiveUsersComponent implements OnChanges {
  users: string[];

  constructor(private userService: UserService) {
    this.users = this.userService.inactiveUsers
  }

  ngOnChanges() {
    // this.users = this.userService.inactiveUsers;
  }

  onSetToActive(id: number) {
    this.userService.setToActive(id);
  }
}
