import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Events } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public navCtrl: NavController, public events: Events) {
      this.events.subscribe('registration:closed', () => this.handleBackFromRegister());
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

}
