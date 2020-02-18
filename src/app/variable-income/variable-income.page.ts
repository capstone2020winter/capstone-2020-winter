import { Component, OnInit } from '@angular/core';
import { BudgetItemModelList} from '../models/BudgetItemModelList';
import { BudgetItemModel } from '../models/BudgetItemModel';
import { FirestoreService } from '../services/data/firestore.service';
import { ModalController} from '@ionic/angular';
import { AddpagePage} from '../addpage/addpage.page';

@Component({
  selector: 'app-variable-income',
  templateUrl: './variable-income.page.html',
  styleUrls: ['./variable-income.page.scss'],
})
export class VariableIncomePage implements OnInit {

  budget:any = [];
  public budgetItemModel = [];

  constructor(public firestoreService: FirestoreService, public modalController: ModalController) {
    //This code will add data into budgetItemModel Array on Pageload
    this.getIncome().then(
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

  //This function will get data from the firestore cloud database from Income Collection
  async getIncome(){
    this.firestoreService.getIncomeList().valueChanges().subscribe((res: BudgetItemModel[]) => {
        res.forEach((item) => {
            this.budgetItemModel.push(new BudgetItemModel(item.id, item.name, item.value,item.badge))
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

}
