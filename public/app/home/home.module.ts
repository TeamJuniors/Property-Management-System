import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as ComponentsList from './index';

@NgModule({
    imports: [CommonModule],
    declarations: [ComponentsList.HomeComponent],
    exports: [ComponentsList.HomeComponent]
})
export class HomeModule {}
