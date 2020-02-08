import { Component, OnInit } from '@angular/core';
import {BudgetItemModelList} from '../models/BudgetItemModelList';
import {BudgetItemModel} from '../models/BudgetItemModel';

@Component({
  selector: 'app-variable-expense',
  templateUrl: './variable-expense.page.html',
  styleUrls: ['./variable-expense.page.scss'],
})
export class VariableExpensePage implements OnInit {
    budget: any;

  constructor() {

      this.budget = new BudgetItemModelList('fixed',
          [
              new BudgetItemModel('0', 'Entertainment', 100.00, '-')
          ]
      );
  }

  ngOnInit() {
  }

}
