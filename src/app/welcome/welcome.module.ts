import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WelcomePageRoutingModule } from './welcome-routing.module';

import { WelcomePage } from './welcome.page';
import { ComponentsModule } from '../components/components.module';
// import { RegistrationPageRoutingModule } from '../registration/registration-routing.module';
// import { LoginPageRoutingModule } from '../login/login-routing.module';
// import { LoginPage } from '../login/login.page';
// import { RegistrationPage } from '../registration/registration.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WelcomePageRoutingModule,
    ComponentsModule, 
  ],
  declarations: [WelcomePage]
})
export class WelcomePageModule {}
