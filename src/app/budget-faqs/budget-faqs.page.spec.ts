import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import {ExpandableComponent} from '../components/expandable/expandable.component';
import { BudgetFaqsPage } from './budget-faqs.page';
import { RouterTestingModule } from '@angular/router/testing';


describe('BudgetFaqsPage', () => {
  let component: BudgetFaqsPage;
  let fixture: ComponentFixture<BudgetFaqsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetFaqsPage, ExpandableComponent ],
      imports: [IonicModule.forRoot(), RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(BudgetFaqsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
