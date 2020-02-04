import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VariableExpensePage } from './variable-expense.page';

const routes: Routes = [
  {
    path: '',
    component: VariableExpensePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VariableExpensePageRoutingModule {}
