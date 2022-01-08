import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DataHandlingService} from "../shared/data-handling.service";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  userSub: Subscription;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private dataHandlingService: DataHandlingService) {
  }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    })
  }

  collapsed = true;

  recipeClicked() {
    this.router.navigate(['recipes'], {relativeTo: this.route})
  }

  onSaveData() {
    this.dataHandlingService.storeRecipes();
  }

  onFetchData() {
    this.dataHandlingService.fetchRecipe().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}
