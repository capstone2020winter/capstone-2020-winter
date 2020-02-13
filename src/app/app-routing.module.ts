import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'budget-balance', pathMatch: 'full' },
  {
    path: 'budget-balance',
    loadChildren: () => import('./budget-balance/budget-balance.module').then( m => m.BudgetBalancePageModule)
  },
  {
    path: 'budget-history',
    loadChildren: () => import('./budget-history/budget-history.module').then( m => m.BudgetHistoryPageModule)
  },
  {
    path: 'budget-faqs',
    loadChildren: () => import('./budget-faqs/budget-faqs.module').then( m => m.BudgetFaqsPageModule)
  },  {
    path: 'about-us',
    loadChildren: () => import('./about-us/about-us.module').then( m => m.AboutUsPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
