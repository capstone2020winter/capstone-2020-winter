import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FixedExpensePage } from './fixed-expense.page';

const routes: Routes = [
  {
    path: '',
    component: FixedExpensePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FixedExpensePageRoutingModule {}
