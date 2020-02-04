import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FixedExpensePage } from './fixed-expense.page';

describe('FixedExpensePage', () => {
  let component: FixedExpensePage;
  let fixture: ComponentFixture<FixedExpensePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixedExpensePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FixedExpensePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
