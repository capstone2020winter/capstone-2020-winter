// import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
// import {TestBed, async} from '@angular/core/testing';
//
// import {IonicModule, Platform} from '@ionic/angular';
// import {SplashScreen} from '@ionic-native/splash-screen/ngx';
// import {StatusBar} from '@ionic-native/status-bar/ngx';
//
// import {AppComponent} from './app.component';
//
// import {BudgetItemComponent} from './components/budget-item/budget-item.component';
// import {ExpandableComponent} from './components/expandable/expandable.component';
//
// import {AngularFireAuth} from '@angular/fire/auth';
// import {AppPreferences} from '@ionic-native/app-preferences/ngx';
// import { RouterTestingModule } from '@angular/router/testing';
//
//
// describe('AppComponent', () => {
//
//     let statusBarSpy, splashScreenSpy, platformReadySpy, platformSpy;
//
//     beforeEach(async(() => {
//         statusBarSpy = jasmine.createSpyObj('StatusBar', ['styleDefault']);
//         splashScreenSpy = jasmine.createSpyObj('SplashScreen', ['hide']);
//         platformReadySpy = Promise.resolve();
//         platformSpy = jasmine.createSpyObj('Platform', {ready: platformReadySpy});
//
//         TestBed.configureTestingModule({
//             declarations: [AppComponent, BudgetItemComponent, ExpandableComponent],
//             schemas: [CUSTOM_ELEMENTS_SCHEMA],
//             imports: [RouterTestingModule],
//             providers: [
//                 {provide: StatusBar, useValue: statusBarSpy},
//                 {provide: SplashScreen, useValue: splashScreenSpy},
//                 {provide: Platform, useValue: platformSpy},
//                 {provide: AngularFireAuth},
//                 {provide: AppPreferences}
//             ],
//         }).compileComponents();
//     }));
//
//     it('should create the app', () => {
//         const fixture = TestBed.createComponent(AppComponent);
//         const app = fixture.debugElement.componentInstance;
//         expect(app).toBeTruthy();
//     });
//
//     it('should initialize the app', async () => {
//         TestBed.createComponent(AppComponent);
//         expect(platformSpy.ready).toHaveBeenCalled();
//         await platformReadySpy;
//         expect(statusBarSpy.styleDefault).toHaveBeenCalled();
//         expect(splashScreenSpy.hide).toHaveBeenCalled();
//     });
//
//     // TODO: add more tests!
//
// });
