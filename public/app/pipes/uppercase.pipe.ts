import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'uppercasePipe' })
export class UppercasePipe implements PipeTransform {
    constructor() { }

    transform(str: string) {
        return str.toUpperCase();
    }
}