import { Component, OnInit } from '@angular/core';
import { BudgetItemModelList} from '../models/BudgetItemModelList';
import { BudgetItemModel } from '../models/BudgetItemModel';
import { FirestoreService } from '../services/data/firestore.service';



@Component({
  selector: 'app-fixed-expense',
  templateUrl: './fixed-expense.page.html',
  styleUrls: ['./fixed-expense.page.scss'],
})
export class FixedExpensePage implements OnInit {
    budget: any;
    public budgetItemModel = [
      new BudgetItemModel('0', 'Rent', 550.00, 'M'),
      new BudgetItemModel('1', 'Transportation', 122.00, 'M'),
      new BudgetItemModel('2', 'Food', 50.00, 'W')
  ]

  constructor(public firestoreService: FirestoreService) {
      //This code will add budgetItemModel Array to database on Pageload
    // - Any data new which needs to be added to database has to be pushed to budgetItemModel Array 
    this.budget = new BudgetItemModelList('fixed', this.budgetItemModel);
    for(var index in this.budgetItemModel)
    { 
      this.addFixedExpense(this.budgetItemModel[index].name, this.budgetItemModel[index].value, this.budgetItemModel[index].badge)
    }
  }

  ngOnInit() {
  }

  //Function which calls Our firestore Service to add data to firestore cloud database
  async addFixedExpense(name: string, value:number, badge:string){
 
    this.firestoreService.createFixedExpense(name,value,badge)
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
