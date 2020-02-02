import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BudgetHistoryPageRoutingModule } from './budget-history-routing.module';

import { BudgetHistoryPage } from './budget-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BudgetHistoryPageRoutingModule
  ],
  declarations: [BudgetHistoryPage]
})
export class BudgetHistoryPageModule {}
