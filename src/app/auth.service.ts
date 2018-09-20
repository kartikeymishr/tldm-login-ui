import {Injectable} from '@angular/core';
import {AuthUser} from './models/auth-user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {RegisterUser} from './models/register-user';
import {Observable} from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    apiUrl = `http://172.23.239.206:8080/user/auth`;

    constructor(private http: HttpClient) {
    }

    register(registerUser: RegisterUser): Observable<RegisterUser> {
        return this.http.post<RegisterUser>(this.apiUrl, registerUser, httpOptions);
    }

    login(authUser: AuthUser): Observable<any> {
        return this.http.post(this.apiUrl + '/login', authUser, httpOptions);
    }
}
