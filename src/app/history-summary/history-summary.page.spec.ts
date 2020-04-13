// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { IonicModule } from '@ionic/angular';
//
// import { HistorySummaryPage } from './history-summary.page';
// import {ExpandableComponent} from '../components/expandable/expandable.component';
// import {AngularFirestore} from '@angular/fire/firestore';
// import {AngularFireAuth} from '@angular/fire/auth';
// import {AppPreferences} from '@ionic-native/app-preferences/ngx';
//
// describe('HistorySummaryPage', () => {
//   let component: HistorySummaryPage;
//   let fixture: ComponentFixture<HistorySummaryPage>;
//
//   beforeEach(async(() => {
//       TestBed.configureTestingModule({
//           declarations: [HistorySummaryPage, ExpandableComponent],
//           imports: [IonicModule.forRoot()],
//           providers: [
//               {provide: AngularFirestore},
//               {provide: AngularFireAuth},
//               {provide: AppPreferences}
//           ]
//       }).compileComponents();
//
//       fixture = TestBed.createComponent(HistorySummaryPage);
//       component = fixture.componentInstance;
//       fixture.detectChanges();
//   }));
//
//   it('should create', () => {
//       expect(component).toBeTruthy();
//   });
//
//   // it('test data base connection', () => {
//   //     expect(component.connectToDataBase()).toBeTruthy();
//   // });
//   //
//   // it('test get total expenses', () => {
//   //     expect(component.getTotalExpenses()).toBeGreaterThan(-1);
//   // });
//   //
//   // it('test get total income', () => {
//   //     expect(component.getTotalIncome()).toBeGreaterThan(-1);
//   // });
// });
