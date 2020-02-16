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
    {expanded: false, name: "What is a budget?", text:"this is what is a budget"},
    {expanded: false, name: "why make a budget?"},
    {expanded: false, name: "Importance of Managing your Income and Expenses."},
    {expanded: false, name:"Things to consider before you start a Budget."},
    {expanded: false, name: "Tips to help you make a Budget."}
                  

];

}

expandQuestion(question): void {
  if (question.expanded) {
    question.expanded = false;
  }
 
     else {
        this.questions.map(listItem => {
            if (this.questions== listItem) {
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
 

  }

