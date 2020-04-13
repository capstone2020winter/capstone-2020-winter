import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BudgetHistoryPageRoutingModule } from './budget-history-routing.module';
import { ComponentsModule } from '../components/components.module';
import { BudgetHistoryPage } from './budget-history.page';
import {HistorySummaryPageModule} from '../history-summary/history-summary.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BudgetHistoryPageRoutingModule,
    ComponentsModule,
    HistorySummaryPageModule
  ],
  declarations: [BudgetHistoryPage]
})
export class BudgetHistoryPageModule {}
