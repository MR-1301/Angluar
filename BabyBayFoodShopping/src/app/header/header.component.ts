import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

  collapsed = true;

  recipeClicked() {
    this.router.navigate(['recipes'], {relativeTo: this.route})
  }

  shoppingClicked() {
    this.router.navigate(['shopping-list'], {relativeTo: this.route})
  }

}
