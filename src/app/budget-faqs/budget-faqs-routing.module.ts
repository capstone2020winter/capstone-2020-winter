import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BudgetFaqsPage } from './budget-faqs.page';

const routes: Routes = [
  {
    path: '',
    component: BudgetFaqsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BudgetFaqsPageRoutingModule {}
