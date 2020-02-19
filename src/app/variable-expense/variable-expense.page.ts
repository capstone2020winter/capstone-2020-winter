import { Component, OnInit } from '@angular/core';
import {BudgetItemModelList} from '../models/BudgetItemModelList';
import {BudgetItemModel} from '../models/BudgetItemModel';
import { FirestoreService } from '../services/data/firestore.service';
import { ModalController} from '@ionic/angular';
import { AddpagePage} from '../addpage/addpage.page';

@Component({
  selector: 'app-variable-expense',
  templateUrl: './variable-expense.page.html',
  styleUrls: ['./variable-expense.page.scss'],
})
export class VariableExpensePage implements OnInit {

    budget: any = [];
    public budgetItemModel = []

  constructor(public firestoreService: FirestoreService, public modalController: ModalController) {
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
            this.budgetItemModel.push(new BudgetItemModel(item.autoId, item.name, item.value,item.badge))
        });
    });
    return true
  }


  async presentModal() {
    const modal = await this.modalController.create({
      component: AddpagePage
    });
    return await modal.present();
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  //This function will delete item from database and from local array
  deleteItem(passedItem: BudgetItemModel) {
    this.budget.items.forEach((item, index) => {
        if (item === passedItem) {
            this.budget.items.splice(index, 1);
        }
    });

    // console.log(`ITEM ID ${passedItem.name}`)
    this.firestoreService.deleteItem('VariableExpense', passedItem.autoId);
}

}

