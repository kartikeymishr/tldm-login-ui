import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RegisterUser} from '../model/register-user';
import {Observable} from 'rxjs';
import {AuthUser} from '../model/auth-user';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    apiUrl = `http://172.23.239.206:8064/user/auth`;

    constructor(private http: HttpClient) {
    }

    register(registerUser: RegisterUser): Observable<RegisterUser> {
        return this.http.post<RegisterUser>(this.apiUrl, registerUser, httpOptions);
    }

    login(authUser: AuthUser): Observable<any> {
        return this.http.post(this.apiUrl + '/login', authUser, httpOptions);
    }
}
