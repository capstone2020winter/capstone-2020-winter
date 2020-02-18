import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VariableExpensePage } from './variable-expense.page';

const routes: Routes = [
  {
    path: '',
    component: VariableExpensePage,
    children: [
      {
        path: 'addpage',
        children:[
          {
            path: '',
            loadChildren: () => import('../addpage/addpage.module').then( m => m.AddpagePageModule)
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
export class VariableExpensePageRoutingModule {}
