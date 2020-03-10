import {Component, OnInit} from '@angular/core';
import { NavController } from '@ionic/angular';
import {FaqAnswers} from '../models/FaqAnswers';

@Component({
    selector: 'app-budget-faqs',
    templateUrl: './budget-faqs.page.html',
    styleUrls: ['./budget-faqs.page.scss'],
})
export class BudgetFaqsPage implements OnInit {
    public questions: any = [];

    public faqAnswersArray1: any = new FaqAnswers().faqAnswers1();
    public faqAnswersArray2: any = new FaqAnswers().faqAnswers2();
    public faqAnswersArray3: any = new FaqAnswers().faqAnswers3();
    public faqAnswersArray4: any = new FaqAnswers().faqAnswers4();
    public faqAnswersArray5: any = new FaqAnswers().faqAnswers5();
    public faqAnswersArray6: any = new FaqAnswers().faqAnswers6()

    constructor(public navCtrl: NavController) {

        this.questions = [
          {expanded: false, name: "What is a budget?", text: this.faqAnswersArray1},
          {expanded: false, name: "Why make a budget?", text: this.faqAnswersArray2},
          {expanded: false, name: "Importance of Managing your Income and Expenses.", text: this.faqAnswersArray3},
          {expanded: false, name: "Things to consider before you start a Budget.", text: this.faqAnswersArray4},
          {expanded: false, name: "Tips to help you make a Budget.", text: this.faqAnswersArray5},
          {expanded: false, name: "Tips to help you stick to your Budget.", text: this.faqAnswersArray6}
];
           
    }
    expandQuestion(question): void {

        if (question.expanded) {
            question.expanded = false;
        } else {
            this.questions.map(listItem => {
                if (question == listItem) {
                    listItem.expanded = !listItem.expanded;
                } else {
                    listItem.expanded = false;
                }
                return listItem;
            });
        }
    }

    ngOnInit() {
    }

    navigateToLogin() {
        this.navCtrl.navigateForward('account');
    }


}

