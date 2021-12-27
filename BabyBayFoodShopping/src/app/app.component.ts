import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  inRecipe: boolean = true;

  changeContent() {
    console.log("LOLLLLLLLLLLL!")
    this.inRecipe = !this.inRecipe;
  }
}
