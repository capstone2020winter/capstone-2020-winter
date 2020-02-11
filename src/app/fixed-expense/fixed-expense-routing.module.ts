import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FixedExpensePage } from './fixed-expense.page';

const routes: Routes = [
  {
    path: '',
    component: FixedExpensePage,
    children: [
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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FixedExpensePageRoutingModule {}
