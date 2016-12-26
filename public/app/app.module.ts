import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { HomeModule} from './home/home.module'
import {HomeComponent} from './home/home.component'
import { AppComponent }  from './app.component';
import { appRoutes } from './app.router'

@NgModule({
  imports:      
  [ 
     BrowserModule,
     HomeModule,
     RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  declarations: [ AppComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
