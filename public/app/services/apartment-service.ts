import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Apartment } from '../models/apartment-model'
import {User} from '../models/user-model'

@Injectable()
export class ApartmentService{
    constructor(private http: Http){

    }

    getAll(){
        return this.http.get('/api/apartments', this.jwt()).map((response: Response) => response.json());
    }

    create(apartment: any){
        return this.http.post('/api/apartments', apartment, this.jwt()).map((response: Response) => response.json());
    }

    addUser(apartment: any, user: User){
        return this.http.post('/api/addUserToApartment', {apartment, user}, this.jwt()).map((response: Response) => response.json());
    }

    getByProperties(properties: any){
        return this.http.post('/api/findApartments', properties, this.jwt()).map((response: Response) => response.json());
    }

    private jwt() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}