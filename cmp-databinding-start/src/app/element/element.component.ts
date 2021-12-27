import {
  AfterContentChecked,
  AfterContentInit, AfterViewChecked, AfterViewInit,
  Component, ContentChild,
  DoCheck, ElementRef,
  Input,
  OnChanges, OnDestroy,
  OnInit,
  SimpleChanges, ViewChild
} from '@angular/core';

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.css']
})
export class ElementComponent implements OnInit,
  OnChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy {
  //the @Input('alias name') helps to bind the property outside the component
  @Input('srvElement') element: { type: string, name: string, content: string };
  @Input() name: string;

  @ViewChild('heading', {static: true}) heading: ElementRef;

  //to access the elements injected through ng-content
  @ContentChild('contentParagraph', {static: true}) contentParagraph: ElementRef;

  constructor() {
    console.log('constructor called!');
  }

  //manages @Input properties and looks at change in them
  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges called!');
    console.log(changes);
  }

  ngOnInit(): void {
    console.log('ngOnInit called!');
    console.log('name content:', this.heading.nativeElement.textContent)
    console.log("contentParagraph:", this.contentParagraph.nativeElement.textContent)
  }

  ngDoCheck() {
    console.log('ngDoCheck Ran!');
  }

  ngAfterContentInit() {
    console.log('ngAfterContentInit called!')
    console.log("contentParagraph:", this.contentParagraph.nativeElement.textContent)
  }

  ngAfterContentChecked() {
    console.log("ngAfterContentChecked Called!")
  }

  //after view Init only we can get access to values in the dom
  ngAfterViewInit() {
    console.log('ngAfterViewInit called!')
    console.log('name content:', this.heading.nativeElement.textContent)
  }

  ngAfterViewChecked() {
    console.log("ngAfterViewChecked Called!")
  }

  ngOnDestroy() {
    console.log('ngOnDestroy Called!')
  }
}
