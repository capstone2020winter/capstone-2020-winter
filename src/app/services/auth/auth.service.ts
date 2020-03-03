import {Injectable} from '@angular/core';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from 'angularfire2/auth';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    userID: string;

    constructor(firebaseAuth: AngularFireAuth) {
        console.log("AuthService constructor")
    }

    // Function to register with passed email and password
    public register(value) {
        return new Promise<any>((resolve, reject) => {
            firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
                .then(res => {
                    resolve(res);
                }, err => reject(err));
        });
    }

    // Function to login with passed email and password
    public login(value) {
        return new Promise<any>((resolve, reject) => {
            firebase.auth().signInWithEmailAndPassword(value.email, value.password)
                .then(res => {
                    this.userID = firebase.auth().currentUser.uid;
                    console.log("login=="+this.userID)
                    resolve(res);
                }, err => reject(err));
        });
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
                    resolve(res);
                }, err => reject(err));
        });
    }

    // Function return users ID if signed in, null if is not
    public getUserId(): any {
        if (this.isUserSigned()) {
            console.log("getUserId=="+firebase.auth().currentUser.uid)
            return firebase.auth().currentUser.uid;
        } else {
            return null;
        }
    }
}
