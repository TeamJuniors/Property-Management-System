"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var chat_popup_component_1 = require("./chat/chat-popup/chat-popup.component");
var safe_html_pipe_1 = require("./pipes/safe-html.pipe");
var chat_service_1 = require("./services/chat-service");
var chat_component_1 = require("./chat/chat.component");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
// used to create fake backend
var http_2 = require("@angular/http");
var app_component_1 = require("./app.component");
var app_routing_1 = require("./app.routing");
var alert_component_1 = require("./directives/alert.component");
var auth_checker_component_1 = require("./autentication-checker/auth-checker.component");
var authentication_service_1 = require("./services/authentication-service");
var alert_service_1 = require("./services/alert-service");
var user_service_1 = require("./services/user-service");
var index_1 = require("./home/index");
var index_2 = require("./login/index");
var index_3 = require("./register/index");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            app_routing_1.routing
        ],
        declarations: [
            app_component_1.AppComponent,
            alert_component_1.AlertComponent,
            index_1.HomeComponent,
            index_2.LoginComponent,
            index_3.RegisterComponent,
            chat_component_1.ChatComponent,
            safe_html_pipe_1.SafeHtml,
            chat_popup_component_1.ChatPopupComponent
        ],
        providers: [
            auth_checker_component_1.AuthChecker,
            alert_service_1.AlertService,
            authentication_service_1.AuthenticationService,
            user_service_1.UserService,
            chat_service_1.ChatService,
            // providers used to create fake backend
            http_2.BaseRequestOptions
        ],
        bootstrap: [app_component_1.AppComponent]
    }),
    __metadata("design:paramtypes", [])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map