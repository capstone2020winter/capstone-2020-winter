import { Component, OnInit } from '@angular/core';
import { BudgetItemModelList} from '../models/BudgetItemModelList';
import { BudgetItemModel } from '../models/BudgetItemModel';

@Component({
  selector: 'app-income',
  templateUrl: './income.page.html',
  styleUrls: ['./income.page.scss'],
})
export class IncomePage implements OnInit {

    budget:any;

  constructor() {
      this.budget = new BudgetItemModelList('fixed',
          [
              new BudgetItemModel('0', 'Checking', 550.00, '-'),
              new BudgetItemModel('1', 'Savings', 5022.00, '-'),
              new BudgetItemModel('2', 'PayCheck', 300.00, '2W')
          ]
      );
  }

  ngOnInit() {
  }

}
