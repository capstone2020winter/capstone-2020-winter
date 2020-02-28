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
    public budgetItemModel = [];
    collectionValue: string = "FixedExpense";

  constructor(public firestoreService: FirestoreService, public modalController: ModalController) {
    //This code will add data into budgetItemModel Array on Pageload
    this.getFixedExpense().then(
      () => {
        this.budget = new BudgetItemModelList(this.collectionValue, this.budgetItemModel);
      },
      error => {
        console.error("error : "+error);
      }
    );
  }

    ngOnInit() {
    }

    //This function will get data from the firestore cloud database from Fixed Expense Collection

  async presentModal(pageName: string) {
    const modal = await this.modalController.create({
      component: AddpagePage,
      componentProps: {
        'pageTitle': pageName
      }
    });
    
    return await modal.present();
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
    async getFixedExpense() {
        this.firestoreService.getList(this.collectionValue).valueChanges().subscribe((res: BudgetItemModel[]) => {
          this.budgetItemModel = []
            res.forEach((item) => {
                this.budgetItemModel.push(new BudgetItemModel(item.autoId, item.name, item.value, item.badge));
            });
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
        this.firestoreService.deleteItem('FixedExpense', passedItem.autoId);
    }
}
