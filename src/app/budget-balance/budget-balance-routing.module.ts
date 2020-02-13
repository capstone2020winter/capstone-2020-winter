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
            loadChildren: () => import('../fixed-expense/fixed-expense.module').then( m => m.FixedExpensePageModule)
            // loadChildren: '../fixed-expense/fixed-expense.module#FixedExpensePageModule'
            // loadChildren: './fixed-expense/fixed-expense.module#FixedExpensePageModule'
          }
        ]
      },
      {
        path: 'variable-expense',
        children:[
          {
            path: '',
            loadChildren: () => import('../variable-expense/variable-expense.module').then( m => m.VariableExpensePageModule)
            // loadChildren: '../variable-expense/variable-expense.module#VariableExpensePageModule'
            // loadChildren: './variable-expense/variable-expense.module#VariableExpensePageModule'
          }
        ]
      },
      {
        path: 'income',
        children:[
          {
            path: '',
            loadChildren: () => import('../income/income.module').then( m => m.IncomePageModule)
            // loadChildren: '../income/income.module#IncomePageModule'
            // loadChildren: './income/income.module#IncomePageModule'
          }
        ]
      },
      {
        path: 'summary',
        children:[
          {
            path: '',
            loadChildren: () => import('../summary/summary.module').then( m => m.SummaryPageModule)
            // loadChildren: '../summary/summary.module#SummaryPageModule'
            // loadChildren: './summary/summary.module#SummaryPageModule'
          }
        ]
      },
      {
        path: 'addpage',
        children:[
          {
            path: '',
            loadChildren: () => import('../addpage/addpage.module').then( m => m.AddpagePageModule)
            // loadChildren: '../summary/summary.module#SummaryPageModule'
            // loadChildren: './summary/summary.module#SummaryPageModule'
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