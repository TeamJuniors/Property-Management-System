import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class FeedbackService {

    constructor(private http: Http) { }

    createFeedbackRequest(name: string, email: string, phoneNumber: string, message: string) {
        return this.http.post('/feedback', { name, email, phoneNumber, message }).map(x => x.json());
    }

    getFeedback() {
        return this.http.post('/receive', {}).map(response => response.json());
    }
}