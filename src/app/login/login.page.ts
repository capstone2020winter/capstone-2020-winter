import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {Events} from '@ionic/angular';
import {Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {AuthService} from '../services/auth/auth.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    public loginForm: FormGroup;

    user = {
        email: '',
        password: ''
    };

    public validationMessages;

    constructor(public navCtrl: NavController,
                public events: Events,
                public authService: AuthService,
                public formBuilder: FormBuilder) {
        this.events.subscribe('registration:closed', () => this.handleBackFromRegister());

        this.loginForm = this.formBuilder.group({
            email: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)
        });

        this.validationMessages = {
            'email': [
                { type: 'required', message: 'Email is required.' }
            ],
            'password': [
                { type: 'required', message: 'Password is required.' }
            ]
        };
    }

    handleBackFromRegister() {
        console.log('Read event');
        this.navCtrl.pop();
    }

    ngOnInit() {
    }

    navigateToRegister() {
        this.navCtrl.navigateForward('registration');
    }

    loginUser() {
        if (this.loginForm.valid) {
            this.authService.login(this.user);
        }
    }

    checkIfLogged() {
        console.log(this.authService.getUserId());
    }

    logout() {
        this.authService.logout();
    }
}
