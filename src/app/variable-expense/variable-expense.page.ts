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

    budget: any;
    public budgetItemModel = [
      new BudgetItemModel('0', 'Entertainment', 100.00, '-')
  ]

  constructor(public firestoreService: FirestoreService) {

    //This code will add budgetItemModel Array to database on Pageload
    // - Any data new which needs to be added to database has to be pushed to budgetItemModel Array 
      this.budget = new BudgetItemModelList('fixed',this.budgetItemModel);
      for(var index in this.budgetItemModel)
      { 
        this.addVariableExpense(this.budgetItemModel[index].id, this.budgetItemModel[index].name, this.budgetItemModel[index].value, this.budgetItemModel[index].badge)
      }
  }

  ngOnInit() {
  }

  //Function which calls Our firestore Service to add data to firestore cloud database
  async addVariableExpense(id: string, name: string, value:number, badge:string){
 
    this.firestoreService.createVariableExpense(id,name,value,badge)
     .then(
       () => {
         console.log("in then");
       },
       error => {
         console.error("in error");
       }
     );
  }

}

