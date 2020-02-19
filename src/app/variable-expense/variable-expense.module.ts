import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VariableExpensePageRoutingModule } from './variable-expense-routing.module';

import { VariableExpensePage } from './variable-expense.page';

import { ComponentsModule } from '../components/components.module';

import { AddpagePageModule } from '../addpage/addpage.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VariableExpensePageRoutingModule, 
    ComponentsModule,
    AddpagePageModule
  ],
  declarations: [VariableExpensePage]
})
export class VariableExpensePageModule {}
