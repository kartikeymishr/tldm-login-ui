import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../model/user';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
    providedIn: 'root'
})
export class UserService {

    receiverName: string;
    senderName: string;

    baseUrl = 'http://172.23.239.62:8069/api/user';

    constructor(private httpClient: HttpClient) {
    }

    setSender(name: string) {
        this.senderName = name;
    }

    setReceiver(name: string) {
        this.receiverName = name;
    }

    registerUser(user: User): Observable<User> {
        return this.httpClient.post<User>(this.baseUrl, user, httpOptions);
    }

    getAllUsers(): Observable<User[]> {
        return this.httpClient.get<User[]>(this.baseUrl);
    }

    getUserDetailsByName(name: string): Observable<User> {
        return this.httpClient.get<User>(`${this.baseUrl}/name/${name}`);
    }

    getUserDetailsById(userId: string): Observable<User> {
        return this.httpClient.get<User>(`${this.baseUrl}/${userId}`);
    }
}
