import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User } from '../models/user-model'

@Injectable()
export class UserService{
    constructor(private http: Http){

    }

    getAll(){
        return this.http.get('/api/users', this.jwt()).map((response: Response) => response.json());
    }

    getById(id: string){

    }

    create(user: User){
        return this.http.post('/api/users', user, this.jwt()).map((response: Response) => response.json());
    }

     private jwt() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}