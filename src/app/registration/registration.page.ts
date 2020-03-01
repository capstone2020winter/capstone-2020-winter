import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {Events} from '@ionic/angular';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.page.html',
    styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

    backButtonPressed;

    constructor(public navCtrl: NavController, public events: Events) {
        this.backButtonPressed = false;
    }

    ngOnInit() {
    }

    ionViewWillLeave() {
        if (this.backButtonPressed) {
            this.events.publish('registration:closed');
        }
    }

    backToLogin() {
        this.backButtonPressed = true;
    }

    navigateToLogin() {
        this.navCtrl.navigateBack('login');
    }
}
