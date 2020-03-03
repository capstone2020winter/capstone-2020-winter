import { NgModule } from '@angular/core';
import { BudgetItemComponent} from './budget-item/budget-item.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { StartComponent } from './start/start.component';
import { SlidesComponent } from './slides/slides.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule
    ],
    exports: [
        BudgetItemComponent,StartComponent,SlidesComponent
    ],
    declarations: [BudgetItemComponent,StartComponent,SlidesComponent]
})
export class ComponentsModule {}
