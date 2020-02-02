import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BudgetBalancePage } from './budget-balance.page';

describe('BudgetBalancePage', () => {
  let component: BudgetBalancePage;
  let fixture: ComponentFixture<BudgetBalancePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetBalancePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BudgetBalancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
