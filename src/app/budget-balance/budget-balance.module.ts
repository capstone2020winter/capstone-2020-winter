import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BudgetBalancePageRoutingModule } from './budget-balance-routing.module';

import { BudgetBalancePage } from './budget-balance.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BudgetBalancePageRoutingModule
  ],
  declarations: [BudgetBalancePage]
})
export class BudgetBalancePageModule {}
