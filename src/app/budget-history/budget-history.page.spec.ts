import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BudgetHistoryPage } from './budget-history.page';
import {AppPreferences} from '@ionic-native/app-preferences/ngx';
describe('BudgetHistoryPage', () => {
  let component: BudgetHistoryPage;
  let fixture: ComponentFixture<BudgetHistoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetHistoryPage ],
      imports: [IonicModule.forRoot()],
      providers: [
        {provider: AppPreferences}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BudgetHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
