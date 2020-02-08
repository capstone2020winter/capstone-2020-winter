import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FixedExpensePageRoutingModule } from './fixed-expense-routing.module';

import { FixedExpensePage } from './fixed-expense.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FixedExpensePageRoutingModule, ComponentsModule
  ],
  declarations: [FixedExpensePage]
})
export class FixedExpensePageModule {}
