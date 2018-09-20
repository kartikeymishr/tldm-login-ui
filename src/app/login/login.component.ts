import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {AuthUser} from '../models/auth-user';
import {UserTokenStorage} from '../user-token-storage';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    user: AuthUser = new AuthUser();
    loginForm: FormGroup;
    hide = true;

    constructor(private authService: AuthService,
                private token: UserTokenStorage,
                private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            'userId': [this.user.userId, [
                Validators.required
            ]],
            'password': [this.user.password, [
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(16)
            ]]
        });
    }

    login() {
        this.authService.login(this.user)
            .subscribe(data => {
                this.token.saveToken(data.token);
                console.log(data);
            });
        console.log(this.user);
    }

    logout() {
        this.token.removeToken();
        console.log('removed token');
    }

}
