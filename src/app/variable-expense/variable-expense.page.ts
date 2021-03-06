import {Component, OnInit} from '@angular/core';
import {BudgetItemModelList} from '../models/BudgetItemModelList';
import {BudgetItemModel} from '../models/BudgetItemModel';
import {FirestoreService} from '../services/data/firestore.service';
import {ModalController} from '@ionic/angular';
import {AddpagePage} from '../addpage/addpage.page';
import {AuthService} from '../services/auth/auth.service';

@Component({
    selector: 'app-variable-expense',
    templateUrl: './variable-expense.page.html',
    styleUrls: ['./variable-expense.page.scss'],
})
export class VariableExpensePage implements OnInit {

    budget: any = [];
    public budgetItemModel = [];
    collectionValue: string = 'VariableExpense';
    userID = null;
    constructor(public firestoreService: FirestoreService,
                public modalController: ModalController,
                public authService: AuthService) {

        
            // This code will add data into budgetItemModel Array on Pageload
            this.getVariableExpense().then(
                () => {
                    this.budget = new BudgetItemModelList(this.collectionValue, this.budgetItemModel);
                },
                error => {
                    console.error('error : ' + error);
                }
            );
        
    }

    ngOnInit() {
    }

    // This function will get data from the firestore cloud database from Variable Expense Collection
    async getVariableExpense() {
        this.firestoreService.getCurrentVariableList(this.collectionValue).valueChanges().subscribe((res: BudgetItemModel[]) => {
            this.budgetItemModel = []
            //console.log("userID=="+userID)
            res.forEach((item) => {
                this.budgetItemModel.push(new BudgetItemModel(item.autoId, item.name, item.value, item.description,item.date))
            });
        });
        return true
    }


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

    // This function will delete item from database and from local array
    deleteItem(passedItem: BudgetItemModel) {
        this.budget.items.forEach((item, index) => {
            if (item === passedItem) {
                this.budget.items.splice(index, 1);
            }
        });

        // console.log(`ITEM ID ${passedItem.name}`)
        this.firestoreService.deleteItem('VariableExpense', passedItem.autoId);
    }

    async editItem(pageName: string, passedItem: BudgetItemModel) {
        const modal = await this.modalController.create({
            component: AddpagePage,
            componentProps: {
                'pageTitle': pageName,
                'id': passedItem.autoId,
                'amount': passedItem.value,
                'category': passedItem.name,
                'description': passedItem.description,
                'date': passedItem.date
            }
        });

        return await modal.present();
    }

}

