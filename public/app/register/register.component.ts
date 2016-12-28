import { Component } from '@angular/core';
import { Router } from '@angular/router';
declare var $:JQueryStatic;
import { UserService } from '../services/user-service';
import {AlertService} from '../services/alert-service';

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html'
})

export class RegisterComponent {
    model: any = {
        
    };
    loading = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

    register() { 
       this.loading = true;
       this.userService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    ngAfterViewInit(){
        console.log("Click")
        $('#radioBtn a').on('click', function() {
        var sel = $(this).data('title');
        var tog = $(this).data('toggle');
        $('#' + tog).prop('value', sel);
        //console.log(this.model);
        if(sel == "Y"){
            this.model.manager = true;
        }
        if(sel == "N"){
            //this.model.manager = false;
        }
        //console.log(this.model.password);
        $('a[data-toggle="' + tog + '"]').not('[data-title="' + sel + '"]').removeClass('active').addClass('notActive');
        $('a[data-toggle="' + tog + '"][data-title="' + sel + '"]').removeClass('notActive').addClass('active');
    })
    }
}
