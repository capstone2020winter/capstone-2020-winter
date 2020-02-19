import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { BudgetBalancePage } from './budget-balance.page';

const routes: Routes = [
  {
    path: '',
    component: BudgetBalancePage,
    children: [
      {
        path: 'expense',
        children:[
          {
            path: '',
            loadChildren: () => import('../expense/expense.module').then( m => m.ExpensePageModule)
          }
        ]
      },
      {
        path: 'income',
        children:[
          {
            path: '',
            loadChildren: () => import('../income/income.module').then( m => m.IncomePageModule)
          }
        ]
      },
      {
        path: 'summary',
        children:[
          {
            path: '',
            loadChildren: () => import('../summary/summary.module').then( m => m.SummaryPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/budget-balance/summary',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BudgetBalancePageRoutingModule {}