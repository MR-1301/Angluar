import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-no-recipe-selected',
  templateUrl: './no-recipe-selected.component.html',
  styleUrls: ['./no-recipe-selected.component.css']
})
export class NoRecipeSelectedComponent implements OnInit {
  message: string;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.message = this.route.snapshot.data['message'];
    this.route.data.subscribe((data) => {
      this.message = data['message'];
    })
  }

}
