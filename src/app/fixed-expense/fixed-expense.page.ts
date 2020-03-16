import {Component, OnInit} from '@angular/core';
import {BudgetItemModelList} from '../models/BudgetItemModelList';
import {BudgetItemModel} from '../models/BudgetItemModel';
import {FirestoreService} from '../services/data/firestore.service';
import {ModalController} from '@ionic/angular';
import {AddpagePage} from '../addpage/addpage.page';
import {AuthService} from '../services/auth/auth.service';
import {FixedBudgetItemModel} from 'src/app/models/FixedBudgetItemModel';
import {DateLogic} from 'src/app/models/DateLogic';

@Component({
    selector: 'app-fixed-expense',
    templateUrl: './fixed-expense.page.html',
    styleUrls: ['./fixed-expense.page.scss'],
})
export class FixedExpensePage implements OnInit {
    budget: any = [];
    public budgetItemModel = [];
    collectionValue: string = 'FixedExpense';
    userID = null;

    public dateLogic: DateLogic = new DateLogic();

    constructor(public firestoreService: FirestoreService,
                public modalController: ModalController,
                public authService: AuthService) {

        
            // This code will add data into budgetItemModel Array on Pageload
            this.getFixedExpense().then(
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

    // This function will get data from the firestore cloud database from Fixed Expense Collection

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
        this.firestoreService.getFixedList(this.collectionValue).valueChanges().subscribe((res: FixedBudgetItemModel[]) => {
            this.budgetItemModel = [];
            res.forEach((item) => {
                let sdate = new Date(item.startDate);
                let currentDate = new Date();
                var percentage = "";
                if (sdate.getMonth() == currentDate.getMonth() && sdate.getFullYear() == currentDate.getFullYear()){
                    let date = sdate.getDate() + "";
                    let count = this.dateLogic.getCount(item.badge, date);
                    let totalCount = this.dateLogic.getTotalCount(item.badge, date);
                    percentage = count + "-" + totalCount;
                }            
                this.budgetItemModel.push(new FixedBudgetItemModel(item.autoId, item.name, item.value, item.description, item.startDate, item.badge, percentage))
            });
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
        this.firestoreService.deleteItem('FixedExpense', passedItem.autoId);
    }
}
