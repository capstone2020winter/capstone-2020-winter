import { Component, OnInit } from '@angular/core';
import {BudgetItemModelList} from '../models/BudgetItemModelList';
import {BudgetItemModel} from '../models/BudgetItemModel';
import { FirestoreService } from '../services/data/firestore.service';


@Component({
  selector: 'app-variable-expense',
  templateUrl: './variable-expense.page.html',
  styleUrls: ['./variable-expense.page.scss'],
})
export class VariableExpensePage implements OnInit {

    budget: any = [];
    public budgetItemModel = []

  constructor(public firestoreService: FirestoreService) {
      //This code will add data into budgetItemModel Array on Pageload
      this.getVariableExpense().then(
        () => {
          this.budget = new BudgetItemModelList('fixed', this.budgetItemModel);
        },
        error => {
          console.error("error : "+error);
        }
      );
  }

  ngOnInit() {
  }

  //This function will get data from the firestore cloud database from Variable Expense Collection
  async getVariableExpense(){
    this.firestoreService.getVariableExpenseList().valueChanges().subscribe((res: BudgetItemModel[]) => {
        res.forEach((item) => {
            this.budgetItemModel.push(new BudgetItemModel(item.id, item.name, item.value,item.badge))
        });
    });
    return true
  }

}

