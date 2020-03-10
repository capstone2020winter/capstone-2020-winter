import {Component} from '@angular/core';
import {AuthService} from './services/auth/auth.service';
import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        public authService: AuthService,
        public navCtrl: NavController,
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();

            this.authService.authenticationState.subscribe(state => {
                if (state) {
                    console.log("user is logged in");
                    this.navCtrl.navigateRoot(['budget-balance']);

                } else if (!state) {
                    console.log("user is NOT logged in");
                    this.navCtrl.navigateRoot('login');

                }
            });
        });
    }
}
