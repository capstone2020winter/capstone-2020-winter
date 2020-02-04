import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VariableExpensePage } from './variable-expense.page';

describe('VariableExpensePage', () => {
  let component: VariableExpensePage;
  let fixture: ComponentFixture<VariableExpensePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VariableExpensePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VariableExpensePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
