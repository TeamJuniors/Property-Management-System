"use strict";
var router_1 = require("@angular/router");
var index_1 = require("./home/index");
var index_2 = require("./login/index");
var index_3 = require("./register/index");
var auth_checker_component_1 = require("./autentication-checker/auth-checker.component");
var appRoutes = [
    { path: '', component: index_1.HomeComponent, canActivate: [auth_checker_component_1.AuthChecker] },
    { path: 'home', component: index_1.HomeComponent },
    { path: 'login', component: index_2.LoginComponent },
    { path: 'register', component: index_3.RegisterComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map