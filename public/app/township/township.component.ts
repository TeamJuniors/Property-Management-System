import { Injectable, Component } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {TownshipMessageService} from '../services/townshipMessage-service'
import 'rxjs/add/operator/map'

@Component({
    moduleId: module.id,
    templateUrl: 'township.component.html'
})

export class TownshipComponent {
    constructor(private http: Http, private townshipMessageService: TownshipMessageService) { }
    IsLogged: boolean = false;
    messages: any[];
    model: any = {};
    showDetail: boolean = false;
    showElement: any;

    login() {
        let authenticationNumber = this.model.number;
        console.log(authenticationNumber);
        this.townshipMessageService.LogLikeTownship(authenticationNumber).subscribe(
            data => {
                console.log(data);
                localStorage.setItem('townshipLogin', JSON.stringify(data));
                this.LoadAfterLoginData();
            },
            err => {
                console.log("Cannot get");
            }
        );
    }
    returnPage(){
        this.showDetail = false;
    }
    showDetailed(index:any){
        console.log(index);
        this.showDetail = true;
        this.showElement = this.messages[index];
    }
    sendAnswerToTownship(){
        let answer = $('#townshipMessage').val();
        $('#townshipMessage').val("");
        
        this.townshipMessageService.setAnswerToTownshipMessage(this.showElement, answer).subscribe(
            data => {
                console.log("Set new answer");
                this.showElement = data;
                this.townshipMessageService.getAll().subscribe(
                    data => {
                        this.messages = data;
                    },
                    err => {

                    }
                );
            },
            err => {
                console.log("Cannot set new asnwer");
            }
        );
    }
    ngOnInit(){
        if(localStorage.getItem('townshipLogin')){
            this.LoadAfterLoginData();
        }else{
            this.IsLogged = false;
        }
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('townshipLogin');
    }
    private LoadAfterLoginData(){
        this.IsLogged = true;
        this.townshipMessageService.getAll().subscribe(
            data => {
                console.log("Get all");
                console.log(data);
                this.messages = data;
            },
            err => {
                console.log("Error get all");
            }
        );
    }
}