import {Component, OnInit} from '@angular/core';
import {GenerateSuggestions} from '../models/GenerateSuggestions';
import {FixedExpensePage} from '../fixed-expense/fixed-expense.page';
import {VariableExpensePage} from '../variable-expense/variable-expense.page';
import {IncomePage} from '../income/income.page'
import * as CanvasJS from './canvasjs.min';

@Component({
    selector: 'app-summary',
    templateUrl: './summary.page.html',
    styleUrls: ['./summary.page.scss'],
})
export class SummaryPage implements OnInit {

    // Variables
    public items: any = [];
    public incomeArray: any = [];
    public expenseArray: any = [];

    // getting fixed Expense from fixed Expense page
    fixedExpensesArray: any = new FixedExpensePage().budget.items;
    // getting variable Expense from Expense income page
    variableExpensesArray: any = new VariableExpensePage().budget.items;
    // getting income from income page
    addIncomeArray: any = new IncomePage().budget.items;
    // gettings suggestions from makeSuggestions() function
    public suggestionsArray: any = new GenerateSuggestions(this.incomeArray, this.expenseArray).makeSuggestionsList();

    // number variables to calculate total budget
    public incomeAmount: number = 0;
    public fixedExpenseAmount: number = 0;
    public variableExpenseAmount: number = 0;
    public budgetSummaryAmount: number = 0;

    // pie chart item calcualate for different category
    public rent: number = 0;
    public transportation: number = 0;
    public food: number = 0;
    public entertainment: number = 0;


    constructor() {

        // Income and Expenses Array which will come from the database in future

        // adding fixed expenses into expenseArray and calculating total fixedExpenseAmount
        this.fixedExpensesArray.forEach((element) => {
            this.expenseArray.push('$ ' + element.value + ' - ' + element.name);
            this.fixedExpenseAmount += element.value;
            if (element.name == "Rent") {
                this.rent = this.rent + element.value;
            };
            if (element.name == "Transportation") {
                this.transportation = this.transportation + element.value;
            };
            if (element.name == "Food") {
                this.food = this.food + element.value;
            };
            if (element.name == "Entertainment") {
                this.entertainment = this.entertainment + element.value;
            };
        });

        // adding variable expenses into expenseArray and calculating total variableExpenseAmount
        this.variableExpensesArray.forEach((element) => {
            this.expenseArray.push('$ ' + element.value + ' - ' + element.name);
            this.variableExpenseAmount += element.value;
            if (element.name == "Rent") {
                this.rent = this.rent + element.value;
            };
            if (element.name == "Transportation") {
                this.transportation = this.transportation + element.value;
            };
            if (element.name == "Food") {
                this.food = this.food + element.value;
            };
            if (element.name == "Entertainment") {
                this.entertainment = this.entertainment + element.value;
            };
        });

        // adding income into incomeArray and calculating total incomeAmount
        this.addIncomeArray.forEach((element) => {
            this.incomeArray.push('$ ' + element.value + ' - ' + element.name);
            this.incomeAmount += element.value;
        });

        // calculating total budget for month
        this.budgetSummaryAmount = this.incomeAmount - this.fixedExpenseAmount - this.variableExpenseAmount;

        // Two Accordians to show Income and Expenses when expanded
        this.items = [
            {expanded: false, name: "Income", list: this.incomeArray},
            {expanded: false, name: "Expenses", list: this.expenseArray}];


    }

    // For Accordian
    expandItem(item): void {
        if (item.expanded) {
            item.expanded = false;
        } else {
            this.items.map(listItem => {
                if (item == listItem) {
                    listItem.expanded = !listItem.expanded;
                } else {
                    listItem.expanded = false;
                }
                return listItem;
            });
        }
    }


    //pie chart here
    ngOnInit() {

	let chart = new CanvasJS.Chart("chartContainer", {
		theme: "light2",
		animationEnabled: true,
        exportEnabled: true,
        width:280,
        //height: 300,
		data: [{
			type: "pie",
			showInLegend: true,
			toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
			//indexLabel: "{name} - #percent%",
			dataPoints: [
                { y: this.transportation, name: "Transportation" },
                { y: this.food, name: "Food" },
                { y: this.rent, name: "Rent" },
                { y: this.entertainment, name: "Entertainment" },
			]
		}]
	});
		
	chart.render();
    }

    connectToDataBase() {
        console.log('Connect to Data base');

        return false;
    }

    getTotalExpenses() {
        console.log('Summing up all expenses');

        return -1;
    }

    getTotalIncome() {
        console.log('Summing up all income');

        return -1;
    }
}
