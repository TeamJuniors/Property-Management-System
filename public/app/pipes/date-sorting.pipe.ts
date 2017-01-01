import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dateSort' })
export class DateSort implements PipeTransform {
    constructor() { }

    transform(tasks: any[]) {
        if(tasks) {
            tasks.sort((a,b) => {
            if (+a.date.split('-')[0] < +b.date.split('-')[0]) {
                return -1;
            }
            else if (+a.date.split('-')[0] > +b.date.split('-')[0]) {
                return 1;
            }
            else {
                if (+a.date.split('-')[1] < +b.date.split('-')[1]) {
                    return -1;
                }
                else if (+a.date.split('-')[1] > +b.date.split('-')[1]) {
                    return 1;
                } 
                else {
                    if (+a.date.split('-')[2] < +b.date.split('-')[2]) {
                        return -1;
                    }
                    else if (+a.date.split('-')[2] > +b.date.split('-')[2]) {
                        return 1;
                    }
                    else {
                        return 0;
                    }
                }
            }
            })
        }

        return  tasks;
    }
}