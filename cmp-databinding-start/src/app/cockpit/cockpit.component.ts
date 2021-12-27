import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {ElementComponent} from "../element/element.component";
import {Element} from "@angular/compiler";

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css'],
  encapsulation: ViewEncapsulation.Emulated //None, Native
})

export class CockpitComponent implements OnInit {
  //event emitter allows us to emit our own events
  //@Output helps to make this event accessible by other components
  @Output() serverCreated = new EventEmitter<{ newServerName: string, newServerContent: string }>();
  @Output('bpCreated') bluePrintCreated = new EventEmitter<{ newServerName: string, newServerContent: string }>();
  // newServerName = '';
  // newServerContent = '';

  //string of local reference to local template element
  //this will be referring the element so the type is ElementRef
  @ViewChild('serverContentInput', {static: true}) serverContentInput: ElementRef;

  constructor() {
  }

  ngOnInit(): void {
  }

  //onclicking button it emits event of serverCreated or bluePrintCreateds

  //here serverNameInput is HTML element passed here from local template
  //while serverContentInput is element reference which is obtained by @ViewChild Declaration
  onAddServer(serveNameInput: HTMLInputElement) {
    this.serverCreated.emit({
      newServerName: serveNameInput.value,
      newServerContent: this.serverContentInput.nativeElement.value
    });
  }

  onAddBlueprint(serveNameInput: HTMLInputElement) {
    this.bluePrintCreated.emit({
      newServerName: serveNameInput.value,
      newServerContent: this.serverContentInput.nativeElement.value
    });
  }


}
