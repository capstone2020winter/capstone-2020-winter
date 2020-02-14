import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {AddpagePage} from './addpage.page';

describe('AddpagePage', () => {
    let component: AddpagePage;
    let fixture: ComponentFixture<AddpagePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AddpagePage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(AddpagePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('test add new budget item to db', () => {
        expect(component.addItemToDataBase()).toBeTruthy();
    });
});
