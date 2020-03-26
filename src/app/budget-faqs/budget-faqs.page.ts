import {Component, OnInit} from '@angular/core';
import { NavController } from '@ionic/angular';
import { AirtableService } from '../services/data/airtable.service';

@Component({
    selector: 'app-budget-faqs',
    templateUrl: './budget-faqs.page.html',
    styleUrls: ['./budget-faqs.page.scss'],
})
export class BudgetFaqsPage implements OnInit {
    public questions: any = [];

    constructor(public navCtrl: NavController, private faqService: AirtableService) {

        this.faqService.getFAQ().subscribe((posts) => {
            this.questions = posts;
        });
    }

    ngOnInit() {
    }

    expandQuestion(question): void {

        if (question.fields.Expanded) {
            question.fields.Expanded = false;
        } else {
            this.questions.map(listItem => {
                if (question == listItem) {
                    listItem.fields.Expanded = !listItem.fields.Expanded;
                } else {
                    listItem.fields.Expanded = false;
                }
                return listItem;
            });
        }
    }

    navigateToLogin() {
        this.navCtrl.navigateForward('account');
    }


}

