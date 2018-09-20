import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RegisterUser} from '../model/register-user';
import {AuthenticationService} from '../authentication.service';
import {Router} from '@angular/router';
import {MessageService} from '../message.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    user: RegisterUser = new RegisterUser();
    registerForm: FormGroup;
    hide = true;
    hide2 = true;
    userId = new FormControl('', [Validators.required]);
    email = new FormControl('', [Validators.required, Validators.email]);
    password = new FormControl('', [Validators.required, Validators.minLength(6)]);
    password2 = new FormControl('', [Validators.required, Validators.minLength(6)]);
    registerSuccess: boolean;

    constructor(private authService: AuthenticationService,
                private formBuilder: FormBuilder,
                private router: Router,
                private messageService: MessageService) {
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            'userId': [this.user.userId, [
                Validators.required
            ]],
            'email': [this.user.email, [
                Validators.required,
                Validators.email
            ]],
            'password': [this.user.password, [
                Validators.required,
                Validators.minLength(6)
            ]],
            'password2': [this.user.password, [
                Validators.required,
                Validators.minLength(6)
            ]]
        });
    }

    register(password2) {
        if (this.user.password === password2) {
            this.authService.register(this.user)
                .subscribe((user) => {
                    console.log(`Successfully added ${user.userId}`);
                    if (this.user.userId === user.userId) {
                        this.registerSuccess = true;
                    }
                    if (this.registerSuccess) {
                        this.router.navigateByUrl('/dashboard');
                        this.messageService.establishConnection(user.userId);
                    }
                });
        } else {
            console.log('Passwords do not match!');
        }
    }

    getErrorMessage() {
        return this.userId.hasError('required') ? 'You must enter a value' :
                this.email.hasError('email') ? 'Please enter a valid email address' :
                    this.password.hasError('required') ? 'You must enter a value' :
                        this.password.hasError('minLength') ? 'Password must be greater than 6 characters' :
                            this.password2.hasError('required') ? 'You must enter a value' :
                                this.password2.hasError('minLength') ? 'Password mut be greater than 6 characters' : '';
    }

}

