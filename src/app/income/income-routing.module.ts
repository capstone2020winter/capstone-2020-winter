import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IncomePage } from './income.page';

const routes: Routes = [
  {
    path: '',
    component: IncomePage,
    children: [
      {
        path: 'fixed-income',
        children:[
          {
            path: '',
            loadChildren: () => import('../fixed-income/fixed-income.module').then( m => m.FixedIncomePageModule)
          }
        ]
      },
      {
        path: 'variable-income',
        children:[
          {
            path: '',
            loadChildren: () => import('../variable-income/variable-income.module').then( m => m.VariableIncomePageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/budget-balance/income/variable-income',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IncomePageRoutingModule {}
