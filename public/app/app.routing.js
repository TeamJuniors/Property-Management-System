"use strict";
var router_1 = require("@angular/router");
var index_1 = require("./home/index");
var index_2 = require("./login/index");
var index_3 = require("./facebookLogin/index");
var index_4 = require("./register/index");
var auth_checker_component_1 = require("./autentication-checker/auth-checker.component");
var index_5 = require("./manager/index");
var index_6 = require("./notfound/index");
var index_7 = require("./township/index");
var appRoutes = [
    { path: '', component: index_1.HomeComponent, canActivate: [auth_checker_component_1.AuthChecker] },
    { path: 'home', component: index_1.HomeComponent },
    { path: 'login/facebook', component: index_3.FacebookComponent },
    { path: 'login', component: index_2.LoginComponent },
    { path: 'register', component: index_4.RegisterComponent },
    { path: 'manager', component: index_5.ManagerComponent },
    { path: '404', component: index_6.NotFoundComponent },
    { path: 'township', component: index_7.TownshipComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '/404' }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map