import { ChatPopupComponent } from './chat/chat-popup/chat-popup.component';
import { SafeHtml } from './pipes/safe-html.pipe';
import { DateSort } from './pipes/date-sorting.pipe';
import { UppercasePipe } from './pipes/uppercase.pipe';
import { ChatService } from './services/chat-service';
import { ChatComponent } from './chat/chat.component';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';

// used to create fake backend
import { BaseRequestOptions } from '@angular/http';

//Facebook api
import {FacebookService} from '../node_modules/ng2-facebook-sdk/dist/ng2-facebook-sdk.js';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AlertComponent } from './directives/alert.component';
import { AuthChecker } from './autentication-checker/auth-checker.component';

import { AuthenticationService } from './services/authentication-service';
import { AlertService } from './services/alert-service';
import { UserService } from './services/user-service';
import {ApartmentService} from './services/apartment-service'
import {CondominiumService} from './services/condominium-service'
import {ProtocolService} from './services/protocol-service'
import {ManagerUnionService} from './services/managerUnion-service'
import {ControlUnionService} from './services/controlUnion-service'
import {TownshipMessageService} from './services/townshipMessage-service'

import {ManagerComponent} from './manager/index'
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { FacebookComponent } from './facebookLogin/index';
import {NotFoundComponent} from './notfound/index'
import {TownshipComponent} from './township/index'

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        ChatComponent,
        SafeHtml,
        DateSort,
        ChatPopupComponent,
        FacebookComponent,
        ManagerComponent,
        UppercasePipe,
        NotFoundComponent,
        TownshipComponent
    ],
    providers: [
        AuthChecker,
        AlertService,
        AuthenticationService,
        UserService,
        ChatService,
        ManagerUnionService,
        ControlUnionService,
        TownshipMessageService,

        ApartmentService,
        CondominiumService,
        ProtocolService,
        // providers used to create fake backend
        BaseRequestOptions,
        FacebookService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }