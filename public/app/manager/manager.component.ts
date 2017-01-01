import {CondominiumService} from '../services/condominium-service'
import {ApartmentService} from '../services/apartment-service'
import { UserService } from '../services/user-service';
import { ChatService } from '../services/chat-service';
import { Component } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router';
import { FacebookService, FacebookLoginResponse, FacebookInitParams } from '../../node_modules/ng2-facebook-sdk/dist/ng2-facebook-sdk.js';
import { User } from '../models/user-model'
import { ProtocolService } from '../services/protocol-service'
import {ManagerUnionService} from '../services/managerUnion-service'
import { AuthenticationService } from '../services/authentication-service';
import { AlertService} from '../services/alert-service';

@Component({
    moduleId: module.id,
    templateUrl: 'manager.component.html'
})

export class ManagerComponent {
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
    theManager: User;
    isManager: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private condominiumService:CondominiumService,
        private apartmentService:ApartmentService,
        private userService: UserService) { 
            if(localStorage.getItem('currentUser') != undefined){
                let userNow: User = JSON.parse(localStorage.getItem('currentUser'));
                this.authenticationService.login(userNow.username, userNow.password)
                    .subscribe(
                    data => {
                        this.user = JSON.parse(localStorage.getItem('currentUser'));
                        this.isLogged = true;
                        this.isManager = this.user.manager;
                        this.tasks = this.user.tasks;

                        this.apartments = [];
                        this.condominiumService.getByProperties(this.user).subscribe(
                            data => {
                                for(let i = 0; i < data.apartments.length; i++){
                                    this.apartmentService.getByProperties(data.apartments[i]).subscribe(
                                        app => {
                                            for(let j = 0; j < data.apartments[i].users.length; j+=1) {
                                                if(data.apartments[i].users[j].manager || data.apartments[i].users[j].isManager) {
                                                    this.theManager = data.apartments[i].users[j];
                                                    break;
                                                }
                                            }
                                            
                                            this.apartments.push(app);
                                        },
                                        err => {
                                            console.log("Cannot get apartment");
                                        }
                                    );
                                }
                                this.condominium = data;
                            },
                            err => {
                                console.log("Error in home get condominium");
                            }
                        );
                    },
                    error => {
                        this.alertService.error('Your cerdenials are not valid please log in again', true);
                        localStorage.removeItem('currentUser');
                        this.router.navigateByUrl('/login');
                    });
            } else{
                this.router.navigateByUrl('/home');
            }

            this.taskTitle = '';
            this.comment = '';
            this.checkboxes = {};
            this.maxDate = '';
        }

    onApartmentTableClick(index: any){
        this.showingApartment = this.apartments[index];
        this.showApartment = true;
    }

    returnApartmentPage(){
        this.showApartment = false;
    }

    logout(){
        localStorage.removeItem('currentUser');
        this.isLogged = false;
    }

    changeCheckbox(index: any) {
        this.checkboxes[index] = !this.checkboxes[index];
    }

    addTasks() {
        let task = {
            title: this.taskTitle,
            description: this.comment,
            date: this.maxDate
        };

        if (!this.taskTitle) {
            this.alertService.error('Въведете заглавие')
            return ;
        }
        if(this.taskTitle.length < 3) {
            this.alertService.error('Заглавието трябва да бъде по-дълго от 3 символа')
            return ;
        }
        if (!this.comment) {
            this.alertService.error('Въведете описание')
            return ;
        }
        if(this.comment.length < 10) {
            this.alertService.error('Описанието трябва да бъде по-дълго от 10 символа')
            return ;
        }
        if (!this.maxDate) {
            this.alertService.error('Въведете дата')
            return ;
        }
        if (new Date(+this.maxDate.split('-')[0], +this.maxDate.split('-')[1], +this.maxDate.split('-')[2]).getTime() < new Date().getTime()) {
            this.alertService.error('Въведената дата трябва да е след сегашната')
            return ;
        }

        for(let i = 0; i < this.apartments.length; i+=1) {
            if(this.checkboxes[i]) {
                for(let j = 0; j < this.apartments[i].users.length; j+=1) {
                    this.userService.addTask(this.apartments[i].users[j].username, task).subscribe(data => {
                        if(data.username === this.user.username) {
                            this.user.tasks.push(task);
                        }
                    },
                    err => {
                        console.log("Error in addtask");
                    });
                }
            }
        }

        this.alertService.success('Успешно добавено!')
    }
}