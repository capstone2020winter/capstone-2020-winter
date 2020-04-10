import {Component, OnInit} from '@angular/core';
import {BudgetItemModelList} from '../models/BudgetItemModelList';
import {BudgetItemModel} from '../models/BudgetItemModel';
import {FirestoreService} from '../services/data/firestore.service';
import {ModalController} from '@ionic/angular';
import {AddpagePage} from '../addpage/addpage.page';
import {AuthService} from '../services/auth/auth.service';
import {FixedBudgetItemModel} from 'src/app/models/FixedBudgetItemModel';
import {DateLogic} from 'src/app/models/DateLogic';
import * as moment from 'moment';

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
        this.firestoreService.getCurrentFixedList(this.collectionValue).valueChanges().subscribe((res: FixedBudgetItemModel[]) => {
            this.budgetItemModel = [];
            res.forEach((item) => {
                let sdate = moment(item.startDate);
                let currentDate = moment();
                var percentage = "";
                if (sdate.format("MM") == currentDate.format('MM') && sdate.format('YYYY') == currentDate.format('YYYY')){
                    let date = sdate + "";
                    let count = this.dateLogic.getCount(item.badge, date);
                    let totalCount = this.dateLogic.getTotalCount(item.badge, date);
                    percentage = count + "-" + totalCount;
                }            
                this.budgetItemModel.push(new FixedBudgetItemModel(item.autoId, item.name, item.value, item.description, item.startDate, item.badge, percentage,item.parentId,item.isDeleted))
            });
        });
    }

    // This function will delete item from database and from local array
    deleteItem(passedItem: FixedBudgetItemModel) {
        this.budget.items.forEach((item, index) => {
            if (item === passedItem) {
                this.budget.items.splice(index, 1);
            }
        });

        // console.log(`ITEM ID ${passedItem.name}`)
        this.firestoreService.deleteFixedItem('FixedExpense', passedItem);
    }

    async editItem(pageName: string, passedItem: FixedBudgetItemModel) {
        const modal = await this.modalController.create({
            component: AddpagePage,
            componentProps: {
                'pageTitle': pageName,
                'id': passedItem.autoId,
                'amount': passedItem.value,
                'frequency': passedItem.badge,
                'sdate': passedItem.startDate,
                'category': passedItem.name,
                'description': passedItem.description,
                'parentId': passedItem.parentId
            }
        });

        return await modal.present();
    }
}
