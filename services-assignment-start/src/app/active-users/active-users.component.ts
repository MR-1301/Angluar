import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {UserService} from "../user.service";

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css']
})
export class ActiveUsersComponent implements OnChanges {
  users: string[];

  constructor(private userService: UserService) {
    this.users = this.userService.activeUsers
  }

  ngOnChanges() {
    // this.users = this.userService.activeUsers;
  }

  onSetToInactive(id: number) {
    this.userService.setToInactive(id);
  }
}
