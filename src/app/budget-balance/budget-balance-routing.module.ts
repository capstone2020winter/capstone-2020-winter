import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { BudgetBalancePage } from './budget-balance.page';

const routes: Routes = [
  {
    path: '',
    component: BudgetBalancePage,
    children: [
      {
        path: 'fixed-expense',
        children:[
          {
            path: '',
            loadChildren: '../budget-balance/fixed-expense/fixed-expense.module#FixedExpensePageModule'
          }
        ]
      },
      {
        path: 'variable-expense',
        children:[
          {
            path: '',
            loadChildren: '../budget-balance/variable-expense/variable-expense.module#VariableExpensePageModule'
          }
        ]
      },
      {
        path: 'income',
        children:[
          {
            path: '',
            loadChildren: '../budget-balance/income/income.module#IncomePageModule'
          }
        ]
      },
      {
        path: 'summary',
        children:[
          {
            path: '',
            loadChildren: '../budget-balance/summary/summary.module#SummaryPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/budget-balance/summary',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/budget-balance/summary',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BudgetBalancePageRoutingModule {}