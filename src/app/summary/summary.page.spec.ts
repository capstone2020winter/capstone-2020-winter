import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {SummaryPage} from './summary.page';
import {ExpandableComponent} from '../components/expandable/expandable.component';

describe('SummaryPage', () => {
    let component: SummaryPage;
    let fixture: ComponentFixture<SummaryPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SummaryPage, ExpandableComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(SummaryPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('test data base connection', () => {
        expect(component.connectToDataBase()).toBeTruthy();
    });

    it('test get total expenses', () => {
        expect(component.getTotalExpenses()).toBeGreaterThan(-1);
    });

    it('test get total income', () => {
        expect(component.getTotalIncome()).toBeGreaterThan(-1);
    });
});
