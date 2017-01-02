import { Directive, ElementRef } from '@angular/core';

@Directive({ selector: '[cursive-directive]' })
export class CursiveDirective {
    constructor(private elementRef: ElementRef) {
        this.elementRef.nativeElement.style.fontStyle = 'italic';
    }
}