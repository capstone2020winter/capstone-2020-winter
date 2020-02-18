import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FixedIncomePageRoutingModule } from './fixed-income-routing.module';

import { FixedIncomePage } from './fixed-income.page';

import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FixedIncomePageRoutingModule,
    ComponentsModule
  ],
  declarations: [FixedIncomePage]
})
export class FixedIncomePageModule {}
