import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthUser} from '../model/auth-user';
import {Router} from '@angular/router';
import {AuthenticationService} from '../service/authentication.service';
import {MessageService} from '../service/message.service';
import {UserService} from '../service/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    user: AuthUser = new AuthUser();
    loginForm: FormGroup;
    hide = true;
    isValidated: boolean;
    userId = new FormControl('', [Validators.required]);
    password = new FormControl('', [Validators.required, Validators.minLength(6)]);

    constructor(private authService: AuthenticationService,
                private formBuilder: FormBuilder,
                private router: Router,
                private messageService: MessageService,
                private userService: UserService) {
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
                // this.token.saveToken(data.token);
                if (data.userId === this.user.userId) {
                    this.isValidated = true;
                    console.log('Welcome ' + data.userId);
                } else {
                    this.isValidated = false;
                }
                if (this.isValidated) {
                    this.messageService.clearMessages();
                    this.router.navigateByUrl('/dashboard');
                    this.messageService.establishConnection(data.userId);
                    this.userService.getUserDetailsById(data.userId)
                        .subscribe(user => {
                        this.messageService.setSender(user);
                        console.log('from login component');
                        console.log(user);
                    });
                }
            });
        console.log(this.user);
    }

    getErrorMessage() {
        return this.userId.hasError('required') ? 'Cannot be left empty' :
            this.password.hasError('required') ? 'Cannot be left empty' :
                this.password.hasError('minLength') ? 'Password must contain 6 or more characters' : '';
    }

}
