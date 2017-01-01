import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Apartment } from '../models/apartment-model'
import {Condominium} from '../models/condominium-model'

@Injectable()
export class ControlUnionService{
    constructor(private http: Http){

    }

    getAll(){
        return this.http.get('/api/controlUnions', this.jwt()).map((response: Response) => response.json());
    }

    create(controlUnion: any){
        return this.http.post('/api/controlUnions', {controlUnion}, this.jwt()).map((response: Response) => response.json());
    }

    getByProperties(prop: any){
        return this.http.post('/api/findControlUnion', {prop}, this.jwt()).map((response: Response) => response.json());
    }
    addMemberToControlUnion(prop: any, member: any){
        return this.http.post('/api/addMemberToControlUnion', {prop, member}, this.jwt()).map((response: Response) => response.json());
    }
    changeLeaderName(prop:any, leader: any){
        return this.http.post('/api/changeLeaderName', {prop, leader}, this.jwt()).map((response: Response) => response.json());
    }
    private jwt() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}