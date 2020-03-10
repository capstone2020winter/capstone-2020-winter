import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BudgetFaqsPageRoutingModule } from './budget-faqs-routing.module';

import { BudgetFaqsPage } from './budget-faqs.page';
import { ComponentsModule } from '../components/components.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BudgetFaqsPageRoutingModule, ComponentsModule
  ],
  declarations: [BudgetFaqsPage]
})
export class BudgetFaqsPageModule {}
