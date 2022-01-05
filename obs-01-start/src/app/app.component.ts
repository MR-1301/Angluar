import {Component, OnDestroy, OnInit} from '@angular/core';
import {userService} from "../user.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  toShow = false;
  private subjSub: Subscription;

  constructor(private userService: userService) {

  }

  ngOnInit() {
    this.subjSub = this.userService.activatedEmitter.subscribe(
      (value) => {
        this.toShow = value;
      }
    )
  }

  ngOnDestroy() {
    this.subjSub.unsubscribe();
  }
}
