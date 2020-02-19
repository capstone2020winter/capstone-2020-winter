import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExpensePage } from './expense.page';

const routes: Routes = [
  {
    path: '',
    component: ExpensePage,
    children: [
      {
        path: 'fixed-expense',
        children:[
          {
            path: '',
            loadChildren: () => import('../fixed-expense/fixed-expense.module').then( m => m.FixedExpensePageModule)
          }
        ]
      },
      {
        path: 'variable-expense',
        children:[
          {
            path: '',
            loadChildren: () => import('../variable-expense/variable-expense.module').then( m => m.VariableExpensePageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/budget-balance/expense/variable-expense',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpensePageRoutingModule {}
