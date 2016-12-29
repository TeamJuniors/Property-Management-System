import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Apartment } from '../models/apartment-model'
import {Condominium} from '../models/condominium-model'

@Injectable()
export class CondominiumService{
    constructor(private http: Http){

    }

    getAll(){
        return this.http.get('/api/condominimums', this.jwt()).map((response: Response) => response.json());
    }

    create(condominiumProperties: any){
        return this.http.post('/api/condominimums', condominiumProperties, this.jwt()).map((response: Response) => response.json());
    }

    addApartment(condominium: any, apartment: any){
        return this.http.post('/api/addApartmentToCondominimum', {condominium, apartment}, this.jwt()).map((response: Response) => response.json());
    }
    addUserToApartmentInCondominium(condominium: any, apartment: any, user: any){
        return this.http.post('/api/addUserToApartmentInCondominium', {condominium, apartment, user}, this.jwt()).map((response: Response) => response.json());
    }
    getByProperties(properties: any){
        return this.http.post('/api/findCondominimums', properties, this.jwt()).map((response: Response) => response.json());
    }

    private jwt() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}