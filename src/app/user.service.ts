import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from './user';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    receiverName: string;
    senderName: string;

    constructor(private httpClient: HttpClient) {
    }

    baseUrl = 'http://172.23.239.62:8080/api/user';


    getAllUsers(): Observable<User[]> {
        return this.httpClient.get<User[]>(this.baseUrl);
    }

    setSender(name: string) {
        this.senderName = name;
    }

    setReceiver(name: string) {
        this.receiverName = name;
    }

    getUserDetailsByName(name: string): Observable<User> {
        return this.httpClient.get<User>(`${this.baseUrl}/name/${name}`);
    }
}
