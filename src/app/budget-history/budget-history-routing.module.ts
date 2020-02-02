import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BudgetHistoryPage } from './budget-history.page';

const routes: Routes = [
  {
    path: '',
    component: BudgetHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BudgetHistoryPageRoutingModule {}
