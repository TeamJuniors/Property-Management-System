import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { FacebookComponent } from './facebookLogin/index';
import { RegisterComponent } from './register/index';
import { AuthChecker } from './autentication-checker/auth-checker.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthChecker] },
    { path: 'home', component: HomeComponent},
    { path: 'login/facebook', component: FacebookComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);