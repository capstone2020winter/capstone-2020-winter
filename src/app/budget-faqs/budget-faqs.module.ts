import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BudgetFaqsPageRoutingModule } from './budget-faqs-routing.module';

import { BudgetFaqsPage } from './budget-faqs.page';
import { ComponentsModule } from '../components/components.module';
import { AirtableService } from '../services/data/airtable.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BudgetFaqsPageRoutingModule, ComponentsModule
  ],
  declarations: [BudgetFaqsPage],
    providers: [AirtableService]
})
export class BudgetFaqsPageModule {}
