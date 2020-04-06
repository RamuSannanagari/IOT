import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    private readonly API_URL = 'https://iot.smarttrak.info';

    constructor(private http: HttpClient,
        private apiService: ApiService
        
        ) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }
    fakeLogin(username:string,password:string){
      const user= {
        username:username,
        firstName:'Dinesh',
        lastName:'Kotni',
        token:'28838378379',
        id: 123,
        type:'others'
      }
      localStorage.setItem('currentUser', JSON.stringify(user));
            //  this.currentUserSubject.next(user);
    }

    login(username: string, password: string) {
        const payload = {
            username: username,
            password: password
        }
        // return this.apiService.login(payload).subscribe((user)=>{
        //     localStorage.setItem('currentUser', JSON.stringify(user));
        //             this.currentUserSubject.next(user);
        // })
        return this.http.post<any>(this.API_URL+'/authenticate',payload)
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user ) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }))
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        
    }
}