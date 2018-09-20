import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {RegisterUser} from '../models/register-user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    user: RegisterUser = new RegisterUser();
    registerForm: FormGroup;
    hide = true;

    constructor(private authService: AuthService,
                private formBuilder: FormBuilder) {
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
                Validators.minLength(6),
                Validators.maxLength(16)
            ]]
        });
    }

    register(password2) {
        if (this.user.password === password2) {
            this.authService.register(this.user)
                .subscribe((user) => console.log(`Successfully added ${user.userId}`));
        } else {
            console.log('Passwords do not match!');
        }
    }

}
