import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Apartment } from '../models/apartment-model'
import {Condominium} from '../models/condominium-model'

@Injectable()
export class ManagerUnionService{
    constructor(private http: Http){

    }

    getAll(){
        return this.http.get('/api/managerUnions', this.jwt()).map((response: Response) => response.json());
    }

    create(managerUnion: any){
        return this.http.post('/api/managerUnions', {managerUnion}, this.jwt()).map((response: Response) => response.json());
    }

    getByProperties(prop: any){
        return this.http.post('/api/findManagerUnion', {prop}, this.jwt()).map((response: Response) => response.json());
    }
    addMemberToManagerUnion(prop: any, member: any){
        return this.http.post('/api/addMemberToManagerUnion', {prop, member}, this.jwt()).map((response: Response) => response.json());
    }
    changeCashierName(prop:any, cashier: any){
        return this.http.post('/api/changeCashierName', {prop, cashier}, this.jwt()).map((response: Response) => response.json());
    }
    private jwt() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}