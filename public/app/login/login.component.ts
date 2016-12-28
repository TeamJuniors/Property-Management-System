import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService} from '../services/alert-service';
import { AuthenticationService } from '../services/authentication-service';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { 
            console.log("Login init");
        }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        console.log("Model");
        console.log(this.model);
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    console.log("From data");
                    this.router.navigate(['/home']);
                },
                error => {
                    console.log("From error");
                    this.alertService.error(error);
                    this.loading = false;
                });

        return true;
    }
}