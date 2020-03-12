import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {AddpagePage} from './addpage.page';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {AppPreferences} from '@ionic-native/app-preferences/ngx';

describe('AddpagePage', () => {
    let component: AddpagePage;
    let fixture: ComponentFixture<AddpagePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AddpagePage],
            imports: [IonicModule.forRoot(), FormsModule, ReactiveFormsModule],
            providers: [
                {provide: AngularFirestore},
                {provide: AngularFireAuth},
                {provide: AppPreferences}
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(AddpagePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // it('test add new budget item to db', () => {
    //     expect(component.addItemToDataBase()).toBeTruthy();
    // });
});
