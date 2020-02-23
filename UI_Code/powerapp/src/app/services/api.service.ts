import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private readonly API_URL = 'http://0.0.0.0:7199';
    appConfig = {};

    constructor(private http: HttpClient) { }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error);
    }
    getData() {
        return this.http.get(this.API_URL+'/search?deviceid=D206172').pipe(catchError(this.handleError))

    }

}
