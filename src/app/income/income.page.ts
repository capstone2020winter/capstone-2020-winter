import { Component, OnInit } from '@angular/core';
import { BudgetItemModelList} from '../models/BudgetItemModelList';
import { BudgetItemModel } from '../models/BudgetItemModel';
import { FirestoreService } from '../services/data/firestore.service';
import { stringify } from 'querystring';
import { AuthService } from '../services/auth/auth.service';


@Component({
  selector: 'app-income',
  templateUrl: './income.page.html',
  styleUrls: ['./income.page.scss'],
})
export class IncomePage implements OnInit {

    budget: any = [];
    public budgetItemModel = [];
    collectionValue: string = 'FixedIncome';

  constructor(public firestoreService: FirestoreService, public authService: AuthService) {

      const userID = this.authService.getUserId();
      if (userID != null) {
          // This code will add data into budgetItemModel Array on Pageload
          this.getIncome(userID).then(
              () => {
                  this.budget = new BudgetItemModelList(this.collectionValue, this.budgetItemModel);
              },
              error => {
                  console.error('error : ' + error);
              }
          );
      }
  }

  ngOnInit() {
  }

  // This function will get data from the firestore cloud database from Income Collection
  async getIncome(userID: string) {
    this.firestoreService.getList(userID, this.collectionValue).valueChanges().subscribe((res: BudgetItemModel[]) => {
        res.forEach((item) => {
            this.budgetItemModel.push(new BudgetItemModel(item.autoId, item.name, item.value, item.badge));
        });
    });
    return true
  }

  // This function will delete item from database and from local array
  deleteItem(passedItem: BudgetItemModel) {
    this.budget.items.forEach((item, index) => {
        if (item === passedItem) {
            this.budget.items.splice(index, 1);
        }
    });

    // console.log(`ITEM ID ${passedItem.name}`)
    this.firestoreService.deleteItem('Income', passedItem.autoId);
}

}

