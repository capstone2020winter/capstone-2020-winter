import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AccountPage } from './account.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { AppPreferences } from '@ionic-native/app-preferences/ngx';
import { RouterTestingModule } from '@angular/router/testing';



describe('AccountPage', () => {
  let component: AccountPage;
  let fixture: ComponentFixture<AccountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [IonicModule.forRoot(), FormsModule, ReactiveFormsModule, RouterTestingModule],
        declarations: [ AccountPage ],
        providers: [
            {provide: AngularFireAuth},
            {provide: AppPreferences}
        ]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
