import {Component, OnInit} from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {NavController} from '@ionic/angular';
import {Events} from '@ionic/angular';
import { AuthService } from '../services/auth/auth.service';
import {AlertController} from '@ionic/angular';


@Component({
    selector: 'app-registration',
    templateUrl: './registration.page.html',
    styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

    backButtonPressed;
    user = {
        email: '',
        password: '',
        password_repeat: ''
    };

    public registrationForm: FormGroup;
    public validationMessages;

    constructor(public navCtrl: NavController,
                public events: Events,
                public authService: AuthService,
                public formBuilder: FormBuilder,
                public alertCtrl: AlertController) {
        this.backButtonPressed = false;
        this.registrationForm = this.formBuilder.group({
            email: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$')
            ])),
            password: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(6)
            ])),
            // password_repeat: new FormControl('', Validators.compose([
            //     Validators.required
            // ]))
        });

        this.validationMessages = {
            'email': [
                { type: 'required', message: 'Email is required.' },
                { type: 'pattern', message: 'Email is wrong formatted.' }
            ],
            'password': [
                { type: 'required', message: 'Password is required.' },
                { type: 'minlength', message: 'Password must be at least 6 characters long.' },
            ]
        };

   }

    ngOnInit() {
    }

    backToLogin() {
        this.backButtonPressed = true;
    }

    registerUser() {
        if (this.registrationForm.valid) {
            this.authService.register(this.user).then(
                async () => {
                    this.navCtrl.back();
                },
                async error => {
                    const errorAlert = await this.alertCtrl.create({
                        message: error.message,
                        buttons: [{text: 'Ok', role: 'cancel'}],
                    });
                    await errorAlert.present();
                }
            );
        }
    }
}
