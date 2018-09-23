import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RegisterUser} from '../model/register-user';
import {AuthenticationService} from '../service/authentication.service';
import {Router} from '@angular/router';
import {MessageService} from '../service/message.service';
import {User} from '../model/user';
import {UserService} from '../service/user.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    authUser: RegisterUser = new RegisterUser();
    user: User;
    registerForm: FormGroup;
    hide = true;
    hide2 = true;
    userId = new FormControl('', [Validators.required]);
    name: string;
    userName = new FormControl('', [Validators.required, Validators.minLength(3)]);
    email = new FormControl('', [Validators.required, Validators.email]);
    password = new FormControl('', [Validators.required, Validators.minLength(6)]);
    password2 = new FormControl('', [Validators.required, Validators.minLength(6)]);
    registerSuccess: boolean;

    constructor(private authService: AuthenticationService,
                private userService: UserService,
                private formBuilder: FormBuilder,
                private router: Router,
                private messageService: MessageService) {
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            'userId': [this.authUser.userId, [
                Validators.required,
                Validators.minLength(3)
            ]],
            'userName': [this.userName, [
                Validators.required
            ]],
            'email': [this.authUser.email, [
                Validators.required,
                Validators.email
            ]],
            'password': [this.authUser.password, [
                Validators.required,
                Validators.minLength(6)
            ]],
            'password2': [this.authUser.password, [
                Validators.required,
                Validators.minLength(6)
            ]]
        });
    }

    register(userId, userName, userMail, password, password2) {
        this.user = new User(userId, userName, password, userMail);
        if (password === password2) {
            this.userService.registerUser(this.user).subscribe(data => {
                console.log('successfully registered ' + data.userName);
                this.router.navigateByUrl('/dashboard');
                this.messageService.establishConnection(data.userId);
                this.messageService.setSender(this.user);
            });
        } else {
            console.log('Passwords do not match!');
        }
    }

    // TODO: proper error handling
    getErrorMessage() {
        return this.userId.hasError('required') ? 'You must enter a value' :
            this.userName.hasError('required') ? 'You must enter a value' :
                this.email.hasError('email') ? 'Please enter a valid email address' :
                    this.password.hasError('required') ? 'You must enter a value' :
                        this.password.hasError('minLength') ? 'Password must be greater than 6 characters' :
                            this.password2.hasError('required') ? 'You must enter a value' :
                                this.password2.hasError('minLength') ? 'Password mut be greater than 6 characters' : '';
    }

}

