import { Directive, ElementRef } from '@angular/core';

@Directive({ selector: '[highlight-directive]' })
export class HighlightDirective {
    constructor(private elementRef: ElementRef) {
        this.elementRef.nativeElement.style.color = '#00284d';
    }
}