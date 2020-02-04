import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FixedExpensePageRoutingModule } from './fixed-expense-routing.module';

import { FixedExpensePage } from './fixed-expense.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FixedExpensePageRoutingModule
  ],
  declarations: [FixedExpensePage]
})
export class FixedExpensePageModule {}
