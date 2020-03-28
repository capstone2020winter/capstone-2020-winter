import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {Events} from '@ionic/angular';
import {Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {AuthService} from '../services/auth/auth.service';
import {AlertController} from '@ionic/angular';
import {Router} from '@angular/router';


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
                private router: Router,
                public formBuilder: FormBuilder,
                public alertCtrl: AlertController) {

        this.loginForm = this.formBuilder.group({
            email: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)
        });

        this.validationMessages = {
            'email': [
                {type: 'required', message: 'Email is required.'}
            ],
            'password': [
                {type: 'required', message: 'Password is required.'}
            ]
        };
    }

    ngOnInit() {
    }

    loginUser() {
        if (this.loginForm.valid) {
            this.authService.login(this.user).then(
                async () => {
                    this.router.navigateByUrl('budget-balance');
                },
                async error => {
                    if (error.code == 'auth/wrong-password') {
                        const errorAlert = await this.alertCtrl.create({
                            message: error.message,
                            buttons: [
                                {text: 'Cancel', role: 'cancel'},
                                {
                                    text: 'Reset Password',
                                    handler: () => {
                                        this.resetPassword();
                                    }
                                }
                            ]
                        });
                        await errorAlert.present();
                    } else {
                        const errorAlert = await this.alertCtrl.create({
                            message: error.message,
                            buttons: [{text: 'Ok', role: 'cancel'}],
                        });
                        await errorAlert.present();
                    }
                }
            );
        }
    }

    resetPassword(): void {

        this.authService.resetPassword(this.user.email).then(
            async () => {
                const alert = await this.alertCtrl.create({
                    message: 'Check ' + this.user.email + ' for a password reset link',
                    buttons: [
                        {
                            text: 'Ok',
                            role: 'cancel'
                        },
                    ],
                });
                await alert.present();
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
