import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexPage } from './index.page';

const routes: Routes = [
  {
    path: '',
    component: IndexPage,
     children:[
      {
        path: 'login',
        loadChildren: () =>
        import('../login/login.module').then(m => m.LoginPageModule)
        },
        {
        path: 'registration',
        loadChildren: () =>
        import('../registration/registration.module').then(m => m.RegistrationPageModule)
        },
        {
          path: 'welcome',
          loadChildren: () =>
          import('../welcome/welcome.module').then(m => m.WelcomePageModule)
          }
        ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndexPageRoutingModule {}
