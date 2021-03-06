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
    public incomeAccordian: any = [];
    public expenseAccordian: any = [];

    public incomeArray;
    public expenseArray;

    public FixedIncomeArraySummary: any = [];
    public VariableIncomeArraySummary: any = [];
    public FixedExpenseArraySummary: any = [];
    public VariableExpenseArraySummary: any = [];
    

    // gettings suggestions from makeSuggestions() function
    public suggestionsArray: any = new GenerateSuggestions(this.incomeArray, this.expenseArray).makeSuggestionsList();

    // number variables to calculate total budget
    public fixedIncomeAmount: number = 0;
    public variableIncomeAmount: number = 0;
    public fixedExpenseAmount: number = 0;
    public variableExpenseAmount: number = 0;
    public budgetSummaryAmount: number = 0;

    // pie chart item calcualate for different category
    public rent: number = 0;
    public transportation: number = 0;
    public food: number = 0;
    public entertainment: number = 0;

    //piechart variables
    public dataPointsArray: any = [];
    public fixedDataPointsArray: any = []
    public variableDataPointsArray: any = []

    public dateLogic: DateLogic = new DateLogic();

    constructor(public firestoreService: FirestoreService, public authService: AuthService) {


        //this function is created to deal with latency in response coming from firebase and will be removed later
        this.getIncomeDump();
    
        // Two Accordians to show Income and Expenses when expanded
        this.incomeAccordian = [{expanded: false, name: "Income"}]
        this.expenseAccordian = [{expanded: false, name: "Expenses"}]


    }

    // For Accordian
    expandIncomeItem(item): void {
        if (item.expanded) {
            item.expanded = false;
        } else {
            this.incomeAccordian.map(listItem => {
                if (item == listItem) {
                    listItem.expanded = !listItem.expanded;
                } else {
                    listItem.expanded = false;
                }
                return listItem;
            });
        }
    }

    expandExpenseItem(item): void {
        if (item.expanded) {
            item.expanded = false;
        } else {
            this.expenseAccordian.map(listItem => {
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
    }

    addPieChart(){
        let chart = new CanvasJS.Chart("chartContainer", {
            backgroundColor: "#ededed",
            theme: "light2",
            animationEnabled: true,
            exportEnabled: false,
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

    // This function will get data from the firestore cloud database from Fixed Income Collection
    getFixedIncome() {
        this.firestoreService.getCurrentFixedList('FixedIncome').valueChanges().subscribe((res: FixedBudgetItemModel[]) => {
            this.FixedIncomeArraySummary = []
            this.fixedIncomeAmount = 0

            res.forEach((element) => {
                var count = this.dateLogic.getCount(element.badge,element.startDate)
                for(var i=0;i<count;i++) {
                    this.fixedIncomeAmount += element.value
                }
                console.log("count=="+count)
                element.value = element.value * count
                this.FixedIncomeArraySummary.push({"badge" : count+element.badge,"name" : ' $ ' + element.value + ' - ' + element.name , "date" :  element.startDate });
            });
            this.getVariableIncome()
        });
        
       
    }

    // This function will get data from the firestore cloud database from Variable Income Collection
    getVariableIncome() {
        this.firestoreService.getCurrentVariableList('VariableIncome').valueChanges().subscribe((res: BudgetItemModel[]) => {
            this.variableIncomeAmount = 0
            this.VariableIncomeArraySummary = []

            res.forEach((element) => {
                this.VariableIncomeArraySummary.push({"name" : ' $ ' + element.value + ' - ' + element.name , "date" :  element.date });
                this.variableIncomeAmount += element.value
            });
            this.getFixedExpense()
        });
    }

    // This function will get data from the firestore cloud database from Fixed Expense Collection
    getFixedExpense() {
        this.firestoreService.getCurrentFixedList('FixedExpense').valueChanges().subscribe((res: FixedBudgetItemModel[]) => {
            this.FixedExpenseArraySummary = []
            this.fixedDataPointsArray = []
            this.fixedExpenseAmount = 0

            res.forEach((element) => {                
                var count = this.dateLogic.getCount(element.badge,element.startDate)
                for(var i=0;i<count;i++) {
                    this.fixedExpenseAmount += element.value
                }
                element.value = element.value * count
                this.fixedDataPointsArray.push({y: element.value, name: element.name})
                this.FixedExpenseArraySummary.push({"badge" : count+element.badge, "name" : ' $ ' + element.value + ' - ' + element.name , "date" :  element.startDate });
            });
            this.getVariableExpense()
        });
        
    }

    // This function will get data from the firestore cloud database from Variable Expense Collection
    getVariableExpense() {
        this.firestoreService.getCurrentVariableList('VariableExpense').valueChanges().subscribe((res: BudgetItemModel[]) => {
            this.VariableExpenseArraySummary = []
            this.variableDataPointsArray = []
            this.budgetSummaryAmount = 0
            this.variableExpenseAmount = 0

            res.forEach((element) => {
                this.VariableExpenseArraySummary.push({"name" : ' $ ' + element.value + ' - ' + element.name , "date" :  element.date });
                this.variableExpenseAmount += element.value
                this.variableDataPointsArray.push({y: element.value, name: element.name})
            });

            this.budgetSummaryAmount = this.fixedIncomeAmount + this.variableIncomeAmount - this.fixedExpenseAmount - this.variableExpenseAmount
            this.dataPointsArray = this.fixedDataPointsArray.concat(this.variableDataPointsArray)
            if(this.dataPointsArray.length != 0){
                this.addPieChart()
            }
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
        this.firestoreService.getCurrentFixedList('FixedIncome').valueChanges().subscribe((res: FixedBudgetItemModel[]) => {
            res.forEach((element) => {
            });
        });
        this.firestoreService.getCurrentVariableList('VariableIncome').valueChanges().subscribe((res: BudgetItemModel[]) => {
            res.forEach((element) => {
            });
            this.getFixedIncome();
        });
    }
}
