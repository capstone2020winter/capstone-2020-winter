import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth/auth.service';
import {NavController} from '@ionic/angular';
import {AlertController} from '@ionic/angular';
import {Router} from '@angular/router';
import {Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';

@Component({
    selector: 'app-account',
    templateUrl: './account.page.html',
    styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

    public userEmail;
    public updateEmailForm: FormGroup;
    public validationMessages;

    constructor(public authService: AuthService,
                public navCtrl: NavController,
                private router: Router,
                private alertCtrl: AlertController,
                public formBuilder: FormBuilder) {
        const email = this.authService.getUserEmail();

        this.userEmail = email != null ? email : 'anEmail@gmail.com';

        this.updateEmailForm = this.formBuilder.group({
            email: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('^(?!' + this.userEmail + ')\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$')
            ]))
        });

        this.validationMessages = {
            'email': [
                { type: 'required', message: 'Email is required for update.' }
            ]
        };
    }

    ngOnInit() {
    }

    register() {
        this.navCtrl.navigateForward('registration');
    }

    login() {
        this.navCtrl.navigateForward('login');
    }

    logout() {
        this.authService.logout();
    }

    updateEmail() {
        if (this.updateEmailForm.valid) {
            this.authService.updateEmail(this.updateEmailForm.get('email').value);
        }
    }

    resetPassword(): void {

        if (this.userEmail == null) {
            return;
        }
        this.authService.resetPassword(this.userEmail).then(
            async () => {
                const alert = await this.alertCtrl.create({
                    message: 'Check your email for a password reset link',
                    buttons: [
                        {
                            text: 'Ok',
                            role: 'cancel',
                            handler: () => {
                                this.authService.logout();
                                this.router.navigateByUrl('login');
                            },
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
