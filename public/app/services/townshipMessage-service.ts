import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Apartment } from '../models/apartment-model'
import {Condominium} from '../models/condominium-model'

@Injectable()
export class TownshipMessageService{
    constructor(private http: Http){

    }

    getAll(){
        return this.http.get('/api/townshipMessages', this.jwt()).map((response: Response) => response.json());
    }

    create(townshipMessage: any){
        return this.http.post('/api/townshipMessages', {townshipMessage}, this.jwt()).map((response: Response) => response.json());
    }

    getByProperties(prop: any){
        return this.http.post('/api/findTownshipMessage', {prop}, this.jwt()).map((response: Response) => response.json());
    }

    private jwt() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}