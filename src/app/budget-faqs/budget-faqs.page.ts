import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-budget-faqs',
  templateUrl: './budget-faqs.page.html',
  styleUrls: ['./budget-faqs.page.scss'],
})
export class BudgetFaqsPage implements OnInit {
  public questions: any = [];
  

  constructor() {   
    this.questions = [
    {name: "What is a budget?"},
    {name: "why make a budget?"},
    {name: "Importance of Managing your Income and Expenses."},
    {name:"Things to consider before you start a Budget."},
    {name: "Tips to help you make a Budget."}
                  

];

}

// // expandQuestion(question): void {
// //   if (question.expanded) {
// //     question.expanded = false;
// //   }
// }

  ngOnInit() {
  }
 

  }

