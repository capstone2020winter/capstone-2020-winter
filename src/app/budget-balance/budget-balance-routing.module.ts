import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BudgetBalancePage } from './budget-balance.page';

const routes: Routes = [
  {
    path: '',
    component: BudgetBalancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BudgetBalancePageRoutingModule {}
