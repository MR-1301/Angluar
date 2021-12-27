import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GameControlComponent implements OnInit {
  @Output() myGame = new EventEmitter<{ num: number }>()
  refToInterval;
  curr: number = 1;

  constructor() {
  }

  ngOnInit(): void {
  }


  onStartGame() {
    if (!this.refToInterval) {
      this.refToInterval = setInterval(() => {
        this.myGame.emit({num: this.curr})
        this.curr++;
      }, 1000)
    }
  }

  onStopGame() {
    if (this.refToInterval) {
      clearInterval(this.refToInterval);
      this.refToInterval = ""
    }
  }
}
