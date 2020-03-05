import {Component, OnInit} from '@angular/core';
import {GenerateSuggestions} from '../models/GenerateSuggestions';
import * as CanvasJS from './canvasjs.min';
import {BudgetItemModel} from '../models/BudgetItemModel';
import {FirestoreService} from '../services/data/firestore.service';
import {AuthService} from '../services/auth/auth.service';
import {FixedBudgetItemModel} from 'src/app/models/FixedBudgetItemModel';
import {DateLogic} from 'src/app/models/DateLogic';



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

    public incomeArraySummary: any = [];
    public expenseArraySummary: any = [];

    // fixed Expense
    fixedExpensesArray: any = [
        new BudgetItemModel('0', 'Rent', 550.00, 'M',""),
        new BudgetItemModel('1', 'Transportation', 122.00, 'M',""),
        new BudgetItemModel('2', 'Food', 50.00, 'W',"")
    ]

    // variable Expense
    variableExpensesArray: any = [
        new BudgetItemModel('0', 'Entertainment', 100.00, '-',"")
      ]
      
    // Income
    addIncomeArray: any = [
        new BudgetItemModel('0', 'Checking', 550.00, '-',""),
        new BudgetItemModel('1', 'Savings', 5022.00, '-',""),
        new BudgetItemModel('3', 'PayCheck', 300.00, '2W',"")
    ]
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

    //temp variables
    public dataPointsArray: any;
    public dateLogic: DateLogic = new DateLogic();

    constructor(public firestoreService: FirestoreService, public authService: AuthService) {


        //this function is created to deal with latency in response coming from firebase and will be removed later
        this.getIncomeDump();

        // adding fixed expenses into expenseArray and calculating total fixedExpenseAmount
        this.fixedExpensesArray.forEach((element) => {

            if (element.name == "Rent") {
                this.rent = this.rent + element.value;
            }

            if (element.name == "Transportation") {
                this.transportation = this.transportation + element.value;
            }

            if (element.name == "Food") {
                this.food = this.food + element.value;
            }

            if (element.name == "Entertainment") {
                this.entertainment = this.entertainment + element.value;
            }

        });

        // adding variable expenses into expenseArray and calculating total variableExpenseAmount
        this.variableExpensesArray.forEach((element) => {
            if (element.name == "Rent") {
                this.rent = this.rent + element.value;
            }

            if (element.name == "Transportation") {
                this.transportation = this.transportation + element.value;
            }

            if (element.name == "Food") {
                this.food = this.food + element.value;
            }

            if (element.name == "Entertainment") {
                this.entertainment = this.entertainment + element.value;
            }
        });


        this.dataPointsArray = [
            {y: this.transportation, name: "Transportation"},
            {y: this.food, name: "Food"},
            {y: this.rent, name: "Rent"},
            {y: this.entertainment, name: "Entertainment"},
        ];
            // get data from database to show in accordian
            //this.getIncome()

        // Two Accordians to show Income and Expenses when expanded
        this.items = [
            {expanded: false, name: "Income", list: this.incomeArraySummary},
            {expanded: false, name: "Expenses", list: this.expenseArraySummary}];


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
            backgroundColor: "#ededed",
            theme: "light2",
            animationEnabled: true,
            exportEnabled: true,
            width: 280,
            toolbar: {
                backgroundColor: "#ebebeb",
                color: "#467fd7"
            },
            height: 300,
            data: [{
                type: "pie",
                showInLegend: true,
                toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
                //indexLabel: "{name} - #percent%",
                dataPoints: this.dataPointsArray
            }]
        });

        chart.render();
    }

    // This function will get data from the firestore cloud database from Income Collection
    getIncome() {
        this.firestoreService.getFixedList('FixedIncome').valueChanges().subscribe((res: FixedBudgetItemModel[]) => {
            res.forEach((element) => {

                var count = this.dateLogic.getCount(element.badge,element.startDate)
                this.incomeArraySummary.push('$ ' + element.value + ' - ' + element.name + '   Date: '+element.startDate);

                for(var i=0;i<count;i++) {
                    this.budgetSummaryAmount += element.value
                }
            });
        });
        this.firestoreService.getVariableList('VariableIncome').valueChanges().subscribe((res: BudgetItemModel[]) => {
            res.forEach((element) => {
                this.incomeArraySummary.push('$ ' + element.value + ' - ' + element.name + '   Date: '+element.date);
                this.budgetSummaryAmount += element.value
            });
            this.getExpense()
        });
       
    }

    // This function will get data from the firestore cloud database from Fixed Expense Collection
    getExpense() {
        this.firestoreService.getFixedList('FixedExpense').valueChanges().subscribe((res: FixedBudgetItemModel[]) => {
            res.forEach((element) => {
                
                var count = this.dateLogic.getCount(element.badge,element.startDate)
                this.expenseArraySummary.push('$ ' + element.value + ' - ' + element.name + '   Date: '+element.startDate);

                for(var i=0;i<count;i++) {
                    this.budgetSummaryAmount -= element.value
                }
            });
        });
        this.firestoreService.getVariableList('VariableExpense').valueChanges().subscribe((res: BudgetItemModel[]) => {
            res.forEach((element) => {
                this.expenseArraySummary.push('$ ' + element.value + ' - ' + element.name + '   Date: '+element.date);
                this.budgetSummaryAmount -= element.value
            });
        });
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


    getIncomeDump() {
        this.firestoreService.getFixedList('FixedIncome').valueChanges().subscribe((res: FixedBudgetItemModel[]) => {
            res.forEach((element) => {
            });
        });
        this.firestoreService.getVariableList('VariableIncome').valueChanges().subscribe((res: BudgetItemModel[]) => {
            res.forEach((element) => {
            });
            this.getIncome();
        });
    }
}
