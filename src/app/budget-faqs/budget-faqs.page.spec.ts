import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BudgetFaqsPage } from './budget-faqs.page';

describe('BudgetFaqsPage', () => {
  let component: BudgetFaqsPage;
  let fixture: ComponentFixture<BudgetFaqsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetFaqsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BudgetFaqsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
