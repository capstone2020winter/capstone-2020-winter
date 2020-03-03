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

        this.userID = this.authService.getUserId();
        if (this.userID != null) {
            // This code will add data into budgetItemModel Array on Pageload
            this.getVariableExpense(this.userID).then(
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

    // This function will get data from the firestore cloud database from Variable Expense Collection
    async getVariableExpense(userID: string) {
        this.firestoreService.getList(userID, this.collectionValue).valueChanges().subscribe((res: BudgetItemModel[]) => {
            this.budgetItemModel = []
            res.forEach((item) => {
                this.budgetItemModel.push(new BudgetItemModel(item.autoId, item.name, item.value, item.badge))
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
        this.firestoreService.deleteItem(this.userID, 'VariableExpense', passedItem.autoId);
    }

}

