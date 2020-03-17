import { Component, OnInit } from '@angular/core';

var year;
var month;

@Component({
  selector: 'app-budget-history',
  templateUrl: './budget-history.page.html',
  styleUrls: ['./budget-history.page.scss'],
})
export class BudgetHistoryPage implements OnInit {

  myDate = new Date().toISOString();

  
  constructor() { }

  dateChanged(date) {
    year = date.detail.value.substring(0,4);
    month = date.detail.value.substring(5,7);
  }

  ngOnInit() {
  }

}
