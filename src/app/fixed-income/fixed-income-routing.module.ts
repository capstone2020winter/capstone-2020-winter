import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FixedIncomePage } from './fixed-income.page';

const routes: Routes = [
  {
    path: '',
    component: FixedIncomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FixedIncomePageRoutingModule {}
