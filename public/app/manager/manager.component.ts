import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService} from '../services/alert-service';
import { AuthenticationService } from '../services/authentication-service';
import {User} from '../models/user-model'
import {CondominiumService} from '../services/condominium-service'
import {ApartmentService} from '../services/apartment-service'
import { UserService } from '../services/user-service';

@Component({
    moduleId: module.id,
    templateUrl: 'manager.component.html'
})

export class ManagerComponent implements OnInit {
    user: User;
    isLogged: boolean = false;
    apartments: any;
    condominium: any;
    showApartment: boolean = false;
    showingApartment: any;
    taskTitle: string;
    comment: string;
    checkboxes: any;
    maxDate: string;
    tasks: any[];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private condominiumService:CondominiumService,
        private apartmentService:ApartmentService,
        private userService: UserService) { 
            console.log("manager init");
            if(localStorage.getItem('currentUser') != undefined){
                this.isLogged = true;
                this.user = JSON.parse(localStorage.getItem('currentUser'));
                this.tasks = this.user.tasks;
                if(!this.user.manager) {
                    this.router.navigateByUrl('/home');
                }
            } else{
                this.router.navigateByUrl('/home');
            }

            this.taskTitle = '';
            this.comment = '';
            this.checkboxes = {};
            this.maxDate = '';
        }

    ngOnInit() {
        this.apartments = [];
            this.condominiumService.getByProperties(this.user).subscribe(
                data => {
                    for(let i = 0; i < data.apartments.length; i++){
                        this.apartmentService.getByProperties(data.apartments[i]).subscribe(
                            data => {
                                this.apartments.push(data);
                            },
                            err => {
                                console.log("Cannot get apartment");
                            }
                        );
                    }
                    this.condominium = data;

                    console.log('condiminum')
                    console.log(this.condominium);
                },
                err => {
                    console.log("Error in home get condominium");
                }
            );
    }

    onApartmentTableClick(index: any){
        this.showingApartment = this.apartments[index];
        this.showApartment = true;
    }

    returnApartmentPage(){
        this.showApartment = false;
    }

    logout(){
        console.log("Test");
        localStorage.removeItem('currentUser');
        this.isLogged = false;
    }

    changeCheckbox(index: any) {
        this.checkboxes[index] = !this.checkboxes[index];
        console.log(this.checkboxes);
    }

    addTasks() {
        let task = {
            title: this.taskTitle,
            description: this.comment,
            date: this.maxDate
        };

        if (new Date(+this.maxDate.split('-')[0], +this.maxDate.split('-')[1], +this.maxDate.split('-')[2]).getTime() < new Date().getTime()) {
            this.alertService.error('Въведената дата трябва да е след сегашната')
            return ;
        }

        for(let i = 0; i < this.apartments.length; i+=1) {
            if(this.checkboxes[i]) {
                for(let j = 0; j < this.apartments[i].users.length; j+=1) {
                    this.userService.addTask(this.apartments[i].users[j].username, task).subscribe(data => {
                        this.apartments[i].users[j].tasks = this.apartments[i].users[j].tasks || [];
                        this.apartments[i].users[j].tasks.push(task)
                    },
                    err => {
                        console.log("Error in addtask");
                    });
                }
            }
        }
    }
}