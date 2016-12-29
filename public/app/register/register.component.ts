import { Component } from '@angular/core';
import { Router } from '@angular/router';
declare var $:JQueryStatic;
import { UserService } from '../services/user-service';
import {AlertService} from '../services/alert-service';
import {ApartmentService} from '../services/apartment-service'
import {Apartment} from '../models/apartment-model'

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
        private alertService: AlertService,
        private apartmentService: ApartmentService) { }

    register() {
       let users:any = [];
       this.loading = true;
       let apartmentProperties = {
           floatNumber: this.model.flatNumber,
           entrance: this.model.exitNumber,
           city: this.model.city,
           neighborhood: this.model.neighborhood,
           apartmentNumber: this.model.apartmentNumber,
           users: users
       }
       console.log(apartmentProperties);
       this.apartmentService.getByProperties(apartmentProperties)
             .subscribe(
                 data => {
                     console.log("Found apartment");
                 },
                 error => {
                     this.apartmentService.create(apartmentProperties, this.model).subscribe(
                         data => {
                            console.log("Successfully created apartment");
                         },
                         error => {
                             console.log("Cannot add apartment");
                         }
                     );
                 }
             );

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
