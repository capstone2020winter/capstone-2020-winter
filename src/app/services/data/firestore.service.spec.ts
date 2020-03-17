import {TestBed} from '@angular/core/testing';

import {FirestoreService} from './firestore.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import { AppPreferences } from '@ionic-native/app-preferences/ngx';


describe('FirestoreService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            {provide: AngularFirestore},
            {provide: AngularFireAuth},
            { provide: AppPreferences}
        ]
    }));

    it('should be created', () => {
        const service: FirestoreService = TestBed.get(FirestoreService);
        expect(service).toBeTruthy();
    });
});
