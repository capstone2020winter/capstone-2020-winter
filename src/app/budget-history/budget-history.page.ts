import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {HistorySummaryPage} from '../history-summary/history-summary.page';
import { NavController } from '@ionic/angular';


var year;
var month;
year = new Date().toISOString().substring(0, 4);
month = new Date().toISOString().substring(5, 7);

@Component({
    selector: 'app-budget-history',
    templateUrl: './budget-history.page.html',
    styleUrls: ['./budget-history.page.scss'],
})
export class BudgetHistoryPage implements OnInit {

    myDate = new Date().toISOString();


    constructor(public modalController: ModalController, public navCtrl: NavController) {
    }

    dateChanged(date) {
        year = date.detail.value.substring(0, 4);
        month = date.detail.value.substring(5, 7);
    }

    ngOnInit() {
    }

    async presentModal() {

        const modal = await this.modalController.create({
            component: HistorySummaryPage,
            componentProps: {
                'year': year,
                'month': month
            }
        });
        return await modal.present();
    }

    navigateToLogin() {
        this.navCtrl.navigateForward('account');
    }
}
