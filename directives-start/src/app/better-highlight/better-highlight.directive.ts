import {Directive, ElementRef, OnInit, Renderer2, HostListener, HostBinding, Input} from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  @Input() defaultColor: string = 'transparent';
  @Input() highlightColor: string = 'cyan'

  @HostBinding('style.backgroundColor') bgColor: string = this.defaultColor;

  @HostListener('mouseenter') mouseOver(eventData: Event) {
    // this.renderer.setStyle(this.ElRef.nativeElement, 'background-color', 'cyan');
    this.bgColor = this.highlightColor;
  }

  @HostListener('mouseleave') mouseLeave(eventData: Event) {
    // this.renderer.setStyle(this.ElRef.nativeElement, 'background-color', 'transparent');
    this.bgColor = this.defaultColor;
  }

  constructor(private ElRef: ElementRef, private renderer: Renderer2) {

  }

  ngOnInit() {
    this.bgColor = this.defaultColor;
  }
}
