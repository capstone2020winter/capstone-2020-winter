import {Component, OnInit} from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
    selector: 'app-budget-balance',
    templateUrl: './budget-balance.page.html',
    styleUrls: ['./budget-balance.page.scss'],
})
export class BudgetBalancePage implements OnInit {

    constructor(public navCtrl: NavController) {
    }

    ngOnInit() {
    }

    ionTabChange(budgetBalaceTabs) {
        let selectedTabName: string = budgetBalaceTabs.getSelected();
        let finalName: string = selectedTabName.substring(0, 1).toUpperCase() + selectedTabName.substring(1);
        document.getElementsByTagName("ion-title")[1].innerHTML = finalName;
    }

    navigateToLogin() {
        this.navCtrl.navigateForward('login');
    }

}
