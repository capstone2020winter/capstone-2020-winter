import {Injectable} from '@angular/core';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {BehaviorSubject} from 'rxjs';
import {Platform} from '@ionic/angular';
import {AppPreferences} from '@ionic-native/app-preferences/ngx';
import {AlertController} from '@ionic/angular';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    authenticationState = new BehaviorSubject(false);

    LOGIN_STATUS = 'login_status';

    constructor(firebaseAuth: AngularFireAuth,
                private platform: Platform,
                private appPreferences: AppPreferences,
                public alertCtrl: AlertController) {
        console.log("AuthService constructor");

        this.platform.ready().then(async () => {
            this.checkUserLogin();
        });
    }

    private checkUserLogin() {
        this.appPreferences.fetch('login', this.LOGIN_STATUS).then((res) => {
            console.log('checkUserLogin ' + res);
            this.authenticationState.next(true);
        });
    }

    // Function to register with passed email and password
    public register(value) {
        return new Promise<any>((resolve, reject) => {
            firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
                .then(res => {
                    resolve(res);
                    let user = firebase.auth().currentUser;
                    user.sendEmailVerification();
                }, err => reject(err));
        });
    }

    // Function to login with passed email and password
    public login(value) {
        return new Promise<any>((resolve, reject) => {
            firebase.auth().signInWithEmailAndPassword(value.email, value.password)
                .then(res => {
                    let user = firebase.auth().currentUser;
                    if (user.emailVerified) {
                        this.authenticationState.next(true);
                        this.appPreferences.store('login', this.LOGIN_STATUS, true);
                        resolve(res);
                    } else {
                        this.presentAlert('Email address is not verified');
                    }
                }, err => reject(err));
        });
    }

    async presentAlert(mes: string) {
        const errorAlert = await this.alertCtrl.create({
            message: mes,
            buttons: [{text: 'Ok', role: 'cancel'}],
        });
        await errorAlert.present();
    }

    // Function to check if user is logged in
    public isUserSigned(): boolean {
        if (firebase.auth().currentUser != null) {
            return true;
        } else {
            return false;
        }
    }

    // Function to loggout current user
    logout() {
        return new Promise<any>((resolve, reject) => {
            firebase.auth().signOut()
                .then(res => {
                    this.authenticationState.next(false);
                    this.appPreferences.remove('login', this.LOGIN_STATUS);
                    resolve(res);
                }, err => reject(err));
        });
    }

    // Function return users ID if signed in, null if is not
    public getUserId(): any {
        if (this.isUserSigned()) {
            return firebase.auth().currentUser.uid;
        } else {
            return null;
        }
    }

    // Function return users email if signed in, null if is not
    public getUserEmail(): any {
        if (this.isUserSigned()) {
            return firebase.auth().currentUser.email;
        } else {
            return null;
        }
    }

    public updateEmail(email: string): any {
        if (this.isUserSigned()) {
            firebase.auth().currentUser.updateEmail(email);
        }
    }

    public resetPassword(email: string): any {
        return firebase.auth().sendPasswordResetEmail(email);
    }

    public getAuthUser(): any {
        return firebase.auth().currentUser;
    }
}
