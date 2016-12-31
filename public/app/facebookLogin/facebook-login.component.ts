import { Component } from '@angular/core';
import { Router } from '@angular/router';
declare var $:JQueryStatic;
import { UserService } from '../services/user-service';
import {AlertService} from '../services/alert-service';
import {ApartmentService} from '../services/apartment-service'
import {Apartment} from '../models/apartment-model'
import {CondominiumService} from '../services/condominium-service'

@Component({
    moduleId: module.id,
    templateUrl: 'facebook-login.component.html'
})

export class FacebookComponent {
    model: any = {
        
    };
    loading = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService,
        private apartmentService: ApartmentService,
        private condominiumService: CondominiumService) {
            this.model.password = localStorage.getItem("facebookAuthToken") || '';
            if(!this.model.password) {
                this.router.navigateByUrl('/home');
            }
            this.model.facebookAuthToken = this.model.password;
            this.model.imgUrl = 'http://graph.facebook.com/' + localStorage.getItem("facebookAuthToken") + '/picture?type=square';
            this.userService.getByFacebookAuthToken(this.model.password).subscribe(
                user => {
                     console.log("Found User");
                     localStorage.setItem('currentUser', JSON.stringify(user));
                     this.router.navigateByUrl('/home');
                 },
                 error => {
                     console.log("User not found");
                 })
        }

    register() {
        console.log('Register user by facebook')
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
       this.apartmentService.getByProperties(apartmentProperties)
             .subscribe(
                 data => {
                     console.log("Found apartment");
                     this.apartmentService.addUser(apartmentProperties, this.model).subscribe(
                         data => {
                             console.log("Successfully added user");
                         },
                         error => {
                             console.log("Cannot add user");
                         }
                     );
                 },
                 error => {
                     this.apartmentService.create(apartmentProperties).subscribe(
                         data => {
                            console.log("Successfully created apartment");
                             let apartments: any = [];
                             let condominiumProperties = {
                                apartments: apartments,
                                floatNumber: this.model.flatNumber,
                                entrance: this.model.exitNumber,
                                city: this.model.city,
                                neighborhood: this.model.neighborhood
                             }
                             this.condominiumService.getByProperties(condominiumProperties).subscribe(
                                 data => {
                                     console.log("Find condominium");
                                     this.condominiumService.addApartment(condominiumProperties, apartmentProperties).subscribe(
                                         data => {
                                             console.log("Successfully added apartment");
                                         },
                                         err => {
                                             console.log("Cannot add apartment");
                                         }
                                     );
                                 },
                                 err => {
                                     console.log("Cannot find condominium");
                                     apartments.push(data);
                                     this.condominiumService.create(condominiumProperties).subscribe(
                                         data => {
                                             console.log("Create condominium");
                                         },
                                         err => {
                                             console.log("Cannot create condominium");
                                         }
                                     );
                                 }
                             );
                             
                         },
                         error => {
                             console.log("Cannot add apartment");
                         }
                     );
                 }
             );

       this.userService.create(this.model)
            .subscribe(
                user => {
                    this.alertService.success('Registration facebook successful', true);
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.router.navigateByUrl('/home');
                },
                error => {
                    console.log('Register facebook failed')
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
