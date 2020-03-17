import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {BudgetItemComponent} from './budget-item.component';
import {BudgetItemModel} from '../../models/BudgetItemModel';

describe('BudgetItemComponent', () => {
    let component: BudgetItemComponent;
    let fixture: ComponentFixture<BudgetItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BudgetItemComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(BudgetItemComponent);
        component = fixture.componentInstance;
        component.budgetItem = new BudgetItemModel('0', 'Entertainment', 100.00, '-', '05.02.2020');

        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
