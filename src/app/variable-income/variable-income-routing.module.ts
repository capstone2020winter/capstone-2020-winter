import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VariableIncomePage } from './variable-income.page';

const routes: Routes = [
  {
    path: '',
    component: VariableIncomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VariableIncomePageRoutingModule {}
