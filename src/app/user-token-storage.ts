import {Injectable} from '@angular/core';

const TOKEN_KEY = 'AuthToken';

@Injectable(
    {providedIn: 'root'}
)
export class UserTokenStorage {

    constructor() {
    }

    public saveToken(token: string) {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.setItem(TOKEN_KEY, token);
    }

    public removeToken() {
        localStorage.removeItem(TOKEN_KEY);
    }
}