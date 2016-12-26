import { Routes } from '@angular/router';
import { HomeComponent } from './home/index'

export const appRoutes: Routes = [
    { path: '**', component: HomeComponent}
];
