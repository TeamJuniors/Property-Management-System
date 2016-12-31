import { ChatPopupComponent } from './chat/chat-popup/chat-popup.component';
import { SafeHtml } from './pipes/safe-html.pipe';
import { ChatService } from './services/chat-service';
import { ChatComponent } from './chat/chat.component';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';

// used to create fake backend
import { BaseRequestOptions } from '@angular/http';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AlertComponent } from './directives/alert.component';
import { AuthChecker } from './autentication-checker/auth-checker.component';

import { AuthenticationService } from './services/authentication-service';
import { AlertService } from './services/alert-service';
import { UserService } from './services/user-service';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';

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
        ChatPopupComponent
    ],
    providers: [
        AuthChecker,
        AlertService,
        AuthenticationService,
        UserService,
        ChatService,

        // providers used to create fake backend
        BaseRequestOptions
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }