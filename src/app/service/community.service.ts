import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserService} from './user.service';
import {Community} from '../model/community';
import {Observable} from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({'content-Type': 'application/json'})
};

@Injectable({
    providedIn: 'root'
})
export class CommunityService {
    constructor(private http: HttpClient, private userService: UserService) {
    }

    private baseUrl = 'http://172.23.239.237:8066/api/v1/community';

    inviteUsers(userMail: string): Observable<Community> {
        return this.http.post<Community>(this.baseUrl + '/signup-success/' + userMail, httpOptions);
    }

    createCommunity(community: Community): Observable<Community> {
        return this.http.post<Community>(this.baseUrl, community, httpOptions);
    }

    getAllCommunityUsers() {
        return this.userService.getAllUsers();
    }
}