import { Component, OnInit } from '@angular/core';
import { BudgetItemModelList} from '../models/BudgetItemModelList';
import { BudgetItemModel } from '../models/BudgetItemModel';


@Component({
  selector: 'app-fixed-expense',
  templateUrl: './fixed-expense.page.html',
  styleUrls: ['./fixed-expense.page.scss'],
})
export class FixedExpensePage implements OnInit {
    budget: any

  constructor() {
      this.budget = new BudgetItemModelList('fixed',
          [
              new BudgetItemModel('0', 'Rent', 550.00, 'M'),
              new BudgetItemModel('1', 'Transportation', 122.00, 'M'),
              new BudgetItemModel('2', 'Food', 50.00, 'W')
          ]
      );
  }

  ngOnInit() {
  }
}
