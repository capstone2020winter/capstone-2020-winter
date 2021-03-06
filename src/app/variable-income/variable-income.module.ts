import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VariableIncomePageRoutingModule } from './variable-income-routing.module';

import { VariableIncomePage } from './variable-income.page';

import { ComponentsModule } from '../components/components.module';

import { AddpagePageModule } from '../addpage/addpage.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VariableIncomePageRoutingModule,
    ComponentsModule,
    AddpagePageModule
  ],
  declarations: [VariableIncomePage]
})
export class VariableIncomePageModule {}
