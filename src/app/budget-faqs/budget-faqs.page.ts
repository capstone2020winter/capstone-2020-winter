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
          {expanded: false, name: "What is a budget?", 
          text:"A Budget is a plan that helps you manage your money.It helps you deterrmine how much you get,spend and save."},
          {expanded: false, name: "Why make a budget?", 
          text: "Making a Budget can help you manage your income and expenses and guide your spending to help you reach your finanacial goals."},
          {expanded: false, name: "Importance of Managing your Income and Expenses.", 
          text: "A way to make the most of the money you have.To plan financially for a major purchase: house, car or travel.Set spending limit.Live within your means. Find ways to get rid of your debts.Reduce costs.	Have more money for things that are important.To prepare financially for your retirement.Save regularly"},
          {expanded: false, name: "Things to consider before you start a Budget.", 
          text: "Know where your money is going.Tracking your money will help you determine your income and expenses. Small changes to spending habits can have a big impact on your budget and your ability to save. Think about your financial goals.Make short-term and long-term goals.Make saving for those goal part of your budget.Evaluate your needs and wants.Need - is something that is necessary, required or essential.Roof over your head, clothing, food, or medication. Want - is something that you would like, but don’t necessarily need. Meals at a restaurant, trip, designer clothes. Needs and wants are not the same for everyone"},
          {expanded: false, name: "Tips to help you make a Budget.", 
          text: "List your income and expenses for one month. Review your list to ensure you have capture all income and expenses.This will help you understand your spending habits. If you need to reduce your spending, your 'wants' may be an area to target.Pay down debts or increase your savings with the money you save from cutting back on “wants”.Second step: Creating a balanced budget is to consider the following questions:Do the figures reflect your expenses in any given month?Could there be a more realistic figure to reflect your expenses?Are there small recurring expenses that you can cut?Do you want to add money to your saving account that reflect  your goal? If so you will need to add a saving “Expense” to your budget. "}
                  

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
 

  }

