import { Component, OnInit } from '@angular/core';
import { BudgetItemModelList} from '../models/BudgetItemModelList';
import { BudgetItemModel } from '../models/BudgetItemModel';
import { FirestoreService } from '../services/data/firestore.service';
import { ModalController} from '@ionic/angular';
import { AddpagePage} from '../addpage/addpage.page';


@Component({
  selector: 'app-fixed-expense',
  templateUrl: './fixed-expense.page.html',
  styleUrls: ['./fixed-expense.page.scss'],
})
export class FixedExpensePage implements OnInit {
    budget: any = [];
    public budgetItemModel = []

  constructor(public firestoreService: FirestoreService, public modalController: ModalController) {
    //This code will add data into budgetItemModel Array on Pageload
    this.getFixedExpense().then(
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

    //This function will get data from the firestore cloud database from Fixed Expense Collection
  async getFixedExpense(){
    this.firestoreService.getFixedExpenseList().valueChanges().subscribe((res: BudgetItemModel[]) => {
        res.forEach((item) => {
            this.budgetItemModel.push(new BudgetItemModel(item.id, item.name, item.value,item.badge));
        });
    });
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

}
