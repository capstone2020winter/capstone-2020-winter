import { NgModule } from '@angular/core';
import { BudgetItemComponent} from './budget-item/budget-item.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule
    ],
    exports: [
        BudgetItemComponent
    ],
    declarations: [BudgetItemComponent]
})
export class ComponentsModule {}
