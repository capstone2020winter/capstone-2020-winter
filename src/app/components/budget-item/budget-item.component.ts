import {Component, OnInit, Input} from '@angular/core';
import {BudgetItemModel} from '../../models/BudgetItemModel';

@Component({
    selector: 'app-budget-item',
    templateUrl: './budget-item.component.html',
    styleUrls: ['./budget-item.component.scss']
})

export class BudgetItemComponent implements OnInit {

    @Input('theItem') budgetItem: BudgetItemModel;


    constructor() {
    }

    ngOnInit() {
    }

}
